import Router, { type BlockConstructable } from './Router'
import { expect } from 'chai'
import sinon from 'sinon'

describe('Router', () => {
  global.window.history.back = () => {
    if (typeof window.onpopstate === 'function') {
      window.onpopstate({ currentTarget: window } as unknown as PopStateEvent)
    }
  }
  global.window.history.forward = () => {
    if (typeof window.onpopstate === 'function') {
      window.onpopstate({ currentTarget: window } as unknown as PopStateEvent)
    }
  }

  const getFakeContent = sinon.fake.returns(document.createElement('div'))

  const BlockMock = class {
    getContent = getFakeContent
  } as unknown as BlockConstructable

  it('use() should return Router instance', () => {
    const result = Router.use('/', BlockMock)

    expect(result).to.eq(Router)
  })

  describe('actions on back() and go()', () => {
    it('should render a page on history back action', () => {
      Router
        .use('/', BlockMock)
        .start()

      Router.back()

      expect(getFakeContent.callCount).to.eq(1)
    })

    it('should redirect to / by go()', () => {
      Router
        .use('/', BlockMock)
        .start()

      Router.go('/')

      expect(global.window.location.pathname).to.eq('/')
    })
  })

  it('should render a page on start', () => {
    Router
      .use('/', BlockMock)
      .start()

    expect(getFakeContent.callCount).to.eq(1)
  })
})
