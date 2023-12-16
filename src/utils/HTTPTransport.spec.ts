import sinonChai from 'sinon-chai'
import { use, expect } from 'chai'
import { createSandbox, type SinonStub } from 'sinon'
import HTTPTransport from './HTTPTransport'

describe('HTTPTransport', () => {
  use(sinonChai)
  const sandbox = createSandbox()
  let http: HTTPTransport
  let request: SinonStub

  beforeEach(() => {
    http = new HTTPTransport('')
    request = sandbox.stub(http, 'request' as keyof typeof http).callsFake(async () => { await Promise.resolve() })
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('requests from HTTPTransport', () => {
    it('GET', () => {
      void http.get('/test')

      expect(request).to.have.been.calledWith(`${http.API_URL}/test`, { method: 'GET' })
    })

    it('POST', () => {
      void http.post('/test')

      expect(request).to.have.been.calledWith(`${http.API_URL}/test`, { method: 'POST' })
    })

    it('PUT', () => {
      void http.put('/test')

      expect(request).to.have.been.calledWith(`${http.API_URL}/test`, { method: 'PUT' })
    })

    it('DELETE', () => {
      void http.delete('/test')

      expect(request).to.have.been.calledWith(`${http.API_URL}/test`, { method: 'DELETE' })
    })
  })

  describe('objectToQuery', () => {
    it('should stringify query objects  GET requests where all parameters are strings', () => {
      void http.get('', { data: { a: '1', b: '2' } })

      expect(request).calledWithMatch('?a=1&b=2', { method: 'GET' })
    })

    it('should stringify query objects  GET requests where all parameters are strings and numbers', () => {
      void http.get('', { data: { a: 1, b: 'string' } })

      expect(request).calledWithMatch('?a=1&b=string', { method: 'GET' })
    })

    it('should encode characters to query', () => {
      void http.get('', { data: { a: '1+2', b: '2 2' } })

      expect(request).calledWithMatch('?a=1%2B2&b=2%202', { method: 'GET' })
    })

    it('should encode special characters to query', () => {
      void http.get('', { data: { a: '1=2&1' } })

      expect(request).calledWithMatch('?a=1%3D2%261', { method: 'GET' })
    })

    it('should encode special characters as key and value to query', () => {
      void http.get('', { data: { 'a=x&4': 'q=w&e' } })

      expect(request).calledWithMatch('?a%3Dx%264=q%3Dw%26e', { method: 'GET' })
    })
  })
})
