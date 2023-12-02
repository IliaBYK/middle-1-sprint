import HTTPTransport from '../helpers/HTTPTransport'

export default abstract class BaseAPI {
  protected http: HTTPTransport

  protected constructor (endpoint: string) {
    this.http = new HTTPTransport(endpoint)
  }

  public abstract create? (data: unknown): Promise<unknown>

  public abstract request? (identifier?: string | number): Promise<unknown>

  public abstract update? (identifier: string | number, data: unknown): Promise<unknown>

  public abstract delete? (identifier: string | number): Promise<unknown>
}
