/* eslint-disable @typescript-eslint/no-explicit-any */
type Handler<A extends any[] = unknown[]> = (...args: A) => void
type MapInterface<P> = P[keyof P]

export class EventBus<
  E extends Record<string, string> = Record<string, string>,
  Args extends Record<MapInterface<E>, any[]> = Record<string, any[]>
> {
  private readonly listeners: {
    [K in MapInterface<E>]?: Array<Handler<Args[K]>>
  } = {}

  on<Event extends MapInterface<E>>(event: Event, callback: Handler<Args[Event]>): void {
    if (this.listeners[event] == null) {
      this.listeners[event] = []
    }

    this.listeners[event]?.push(callback)
  }

  off<Event extends MapInterface<E>>(event: Event, callback: Handler<Args[Event]>): void {
    if (this.listeners[event] == null) {
      throw new Error(`Нет события: ${event}`)
    }

    this.listeners[event] = this.listeners[event]!.filter(
      listener => listener !== callback
    )
  }

  emit<Event extends MapInterface<E>>(event: Event, ...args: Args[Event]): void {
    if (this.listeners[event] == null) {
      return
    }

    this.listeners[event]!.forEach(listener => {
      listener(...args)
    })
  }
}
