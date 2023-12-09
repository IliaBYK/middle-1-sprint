/* eslint-disable prefer-promise-reject-errors */
export enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

interface Options {
  method?: keyof typeof METHODS
  headers?: Record<string, string>
  data?: unknown
  timeout?: number
  withCridentials?: boolean
}

type HTTPMethod = /* <R=unknown> */(url: string, options?: Options) => Promise<unknown>
// если в точности как Вы написали, то возникают ошибки

export default class HTTPTransport {
  static API_URL = 'https://ya-praktikum.tech/api/v2'
  protected endpoint: string

  constructor (endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`
  }

  public get: HTTPMethod = async (url, options = {}) => (
    await this.request(`${this.endpoint}${url}`, { ...options, method: METHODS.GET }, options.timeout)
  )

  public post: HTTPMethod = async (url, options = {}) => (
    await this.request(`${this.endpoint}${url}`, { ...options, method: METHODS.POST }, options.timeout)
  )

  public put: HTTPMethod = async (url, options = {}) => (
    await this.request(`${this.endpoint}${url}`, { ...options, method: METHODS.PUT }, options.timeout)
  )

  delete: HTTPMethod = async (url, options = {}) => (
    await this.request(`${this.endpoint}${url}`, { ...options, method: METHODS.DELETE }, options.timeout)
  )

  private async request (url: string, options: Options, timeout: number = 5000): Promise<Response> {
    const { method, data, headers, withCridentials = true } = options

    return await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open(method as string, url)

      xhr.onreadystatechange = (_e) => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response)
          } else {
            reject(xhr.response)
          }
        }
      }

      xhr.onabort = () => { reject({ reason: 'abort' }) }
      xhr.onerror = () => { reject({ reason: 'network error' }) }
      xhr.ontimeout = () => { reject({ reason: 'timeout' }) }

      if (!(data instanceof FormData)) {
        xhr.setRequestHeader('Content-Type', 'application/json')
      }

      Object.entries(headers ?? {}).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value)
      })

      xhr.timeout = timeout

      xhr.withCredentials = withCridentials
      xhr.responseType = 'json'

      try {
        if (method === METHODS.GET || !data) {
          xhr.send()
        } else if (data) {
          xhr.send(data instanceof FormData ? data : JSON.stringify(data))
        }
      } catch (e) {
        console.log(e)
      }
    })
  }
}
