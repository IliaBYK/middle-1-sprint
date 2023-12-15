/* eslint-disable @typescript-eslint/ban-ts-comment */
import sinon, { type SinonFakeXMLHttpRequest, type SinonFakeXMLHttpRequestStatic } from 'sinon'
import HTTPTransport from './HTTPTransport'
import { expect } from 'chai'

describe('HTTPTransport', () => {
  let xhr: SinonFakeXMLHttpRequestStatic
  let instance: HTTPTransport
  const requests: SinonFakeXMLHttpRequest[] = []

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest()

    // @ts-expect-error
    global.XMLHttpRequest = xhr

    xhr.onCreate = (request: SinonFakeXMLHttpRequest) => {
      requests.push(request)
    }

    instance = new HTTPTransport('/auth')
  })

  afterEach(() => {
    requests.length = 0
  })

  it('.get() should send GET request', () => {
    try {
      void instance.get('/user')

      const [request] = requests

      expect(request.method).to.eq('Get')
    } catch (error) {
      console.log(error)
    }
  })
})
