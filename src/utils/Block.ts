import Handlebars from 'handlebars'
import { EventBus } from './EventBus'
import { v4 as makeUUID } from 'uuid'

// Нельзя создавать экземпляр данного класса
class Block<P extends Record<string, any> = any> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render'
  } as const

  public id = makeUUID()
  protected props: P
  public children: Record<string, Block | Block[]>
  private readonly eventBus: () => EventBus
  private _element: HTMLElement | null = null

  /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   *
   * @returns {void}
   */
  constructor (propsWithChildren: P) {
    const eventBus = new EventBus()

    const { props, children } = this._getChildrenAndProps(propsWithChildren)

    this.children = children
    this.eventBus = () => eventBus
    this.props = this._makePropsProxy(this.eventBus, props)

    this._registerEvents(eventBus)

    eventBus.emit(Block.EVENTS.INIT)
  }

  _getChildrenAndProps (childrenAndProps: P): { props: P, children: Record<string, Block | Block[]> } {
    const props: Record<string, unknown> = {}
    const children: Record<string, Block | Block[]> = {}

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (Array.isArray(value) && value.every(v => v instanceof Block)) {
        children[key] = value
      } else if (value instanceof Block) {
        children[key] = value
      } else {
        props[key] = value
      }
    })

    return { props: props as P, children }
  }

  _addEvents (): void {
    const { events = {} } = this.props as P & { events: Record<string, () => void> }

    Object.keys(events).forEach(eventName => {
      this._element?.addEventListener(eventName, events[eventName])
    })
  }

  _removeEvents (): void {
    const { events = {} } = this.props as P & { events: Record<string, () => void> }

    Object.keys(events).forEach(eventName => {
      this._element?.removeEventListener(eventName, events[eventName])
    })
  }

  _registerEvents (eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this))
  }

  private _init (): void {
    this.init()

    this.eventBus().emit(Block.EVENTS.FLOW_CDM)
  }

  protected init (): void {
  }

  private _componentDidMount (): void {
    this.componentDidMount()
  }

  protected componentDidMount (): void {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
  }

  public dispatchComponentDidMount (): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM)

    Object.values(this.children).forEach(child => {
      if (Array.isArray(child)) {
        child.forEach(ch => { ch.dispatchComponentDidMount() })
      } else {
        child.dispatchComponentDidMount()
      }
    })
  }

  private _componentDidUpdate (oldProps: P, newProps: P): void {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
    }
  }

  protected componentDidUpdate (oldProps: P, newProps: P): boolean {
    if (oldProps !== newProps) return true // линтер ругался
    return true
  }

  setProps (nextProps: Partial<P>): void {
    if (!nextProps) {
      return
    }

    const oldValue = { ...this.props }

    Object.assign(this.props, nextProps)
    this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldValue, this.props)
  }

  get element (): HTMLElement | null {
    return this._element
  }

  private _render (): void {
    const fragment = this.render()

    const newElement = fragment.firstElementChild as HTMLElement

    if (this._element && newElement) {
      this._element.replaceWith(newElement)
    }

    this._element = newElement

    this._addEvents()
  }

  protected compile (template: string, props?: any): DocumentFragment {
    const contextAndStubs = { ...props }

    Object.entries(this.children).forEach(([name, component]) => {
      if (Array.isArray(component)) {
        contextAndStubs[name] = component.map(child => `<div data-id="${child.id}"></div>`)
      } else {
        contextAndStubs[name] = `<div data-id="${component.id}"></div>`
      }
    })

    // const html = template(contextAndStubs)

    const temp = document.createElement('template')

    temp.innerHTML = Handlebars.compile(template)(contextAndStubs)

    // temp.innerHTML = html

    const replaceStub = (component: Block): void => {
      const stub = temp.content.querySelector(`[data-id="${component.id}"]`)

      if (!stub) {
        return
      }

      component.getContent()?.append(...Array.from(stub.childNodes))

      stub.replaceWith(component.getContent()!)
    }

    Object.entries(this.children).forEach(([_, component]) => {
      if (Array.isArray(component)) {
        component.forEach(replaceStub)
      } else {
        replaceStub(component)
      }
    })

    return temp.content
  }

  protected render (): DocumentFragment {
    return new DocumentFragment()
  }

  getContent (): HTMLElement | null {
    return this.element
  }

  _makePropsProxy (eventBus: () => EventBus = this.eventBus, props: P): P {
    // Ещё один способ передачи this, но он больше не применяется с приходом ES6+
    // const self = this

    return new Proxy(props, {
      get (target, prop: string) {
        const value = target[prop]
        return typeof value === 'function' ? value.bind(target) : value
      },
      set (target, prop: string, value) {
        const oldTarget = { ...target }

        target[prop as keyof P] = value

        // Запускаем обновление компоненты
        // Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
        eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target)
        return true
      },
      deleteProperty () {
        throw new Error('Нет доступа')
      }
    })
  }
}

export default Block
