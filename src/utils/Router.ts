import type Block from './Block'

type BlockConstructable<P extends Record<string, any> = any> = new(props: P) => Block<P>

function isEqual (lhs: string, rhs: string): boolean {
  return lhs === rhs
}

function render (query: string, block: Block): Element {
  const root = document.querySelector(query)

  if (root === null) {
    throw new Error(`root not found by selector "${query}"`)
  }

  root.textContent = ''

  root.append(block.getContent()!)

  return root
}

class Route {
  /* pathname: string
  blockClass: BlockConstructable
  block: Block | null = null
  _props: unknown */
  private block: Block | null = null

  constructor (
    private pathname: string,
    private readonly BlockClass: BlockConstructable,
    private readonly query: string) {
  }

  /* constructor (pathname: string, view: BlockConstructable, props: any) {
    this._pathname = pathname
    this._blockClass = view
    this._block = null
    this._props = props
  } */

  navigate (pathname: string): void {
    if (this.match(pathname)) {
      this.pathname = pathname
      this.render()
    }
  }

  leave (): void {
    if (this.block) {
      this.block = null
    }
  }

  match (pathname: string): boolean {
    return isEqual(pathname, this.pathname)
  }

  render (): void {
    if (!this.block) {
      this.block = new this.BlockClass({})
      render(this.query, this.block)
    }
  }
}

class Router {
  private static __instance: Router
  private readonly routes: Route[] = []
  private currentRoute: Route | null = null
  private readonly history = window.history

  constructor (private readonly rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance
    }

    this.routes = []

    Router.__instance = this
  }

  public use (pathname: string, block: BlockConstructable): this {
    const route = new Route(pathname, block, this.rootQuery)
    this.routes.push(route)

    return this
  }

  public start (): void {
    window.onpopstate = (event: PopStateEvent) => {
      const target = event.currentTarget as Window

      this._onRoute(target.location.pathname)
    }

    this._onRoute(window.location.pathname)
  }

  _onRoute (pathname: string): void {
    const route = this.getRoute(pathname)
    if (!route) {
      return
    }

    if (this.currentRoute && this.currentRoute !== route) {
      this.currentRoute.leave()
    }

    this.currentRoute = route

    route.render()
  }

  public go (pathname: string): void {
    this.history.pushState({}, '', pathname)
    this._onRoute(pathname)
  }

  public back (): void {
    this.history.back()
  }

  public forward (): void {
    this.history.forward()
  }

  private getRoute (pathname: string): Route | undefined {
    return this.routes.find(route => route.match(pathname))
  }
}

export default new Router('#app')
