import { set } from '../helpers/helpers'
import isEqual from '../helpers/isEqual'
import { EventBus } from './EventBus'
import type Block from './Block'
import { type ChatInfo } from '../api/chats-api'
import { type Message } from '../controllers/MessageController'

export enum StoreEvents {
  Updated = 'updated',
}

interface User {
  'id': number
  'first_name': string
  'second_name': string
  'display_name': string
  'login': string
  'email': string
  'phone': string
  'avatar': string
}

interface StoreData {
  currentUser?: User
  chats?: ChatInfo[]
  messages?: Record<number, Message[]>
  selectedChat?: number
}

export class Store extends EventBus {
  private readonly state: StoreData = {}

  public getState (): StoreData {
    return this.state
  }

  public set (path: string, value: unknown): void {
    set(this.state, path, value)

    this.emit(StoreEvents.Updated, this.getState())
  };
}

const store = new Store()

export const connect = (mapStateToProps: (state: StoreData) => Record<string, unknown>) => (Component: typeof Block) => {
  let state: StoreData

  return class extends Component {
    constructor (props: any) {
      state = mapStateToProps(store.getState())

      super({ ...props, ...state })

      store.on(StoreEvents.Updated, () => {
        const newState = mapStateToProps(store.getState())
        if (!isEqual(state, newState)) {
          this.setProps({ ...newState })
        }
        state = newState
      })
    }
  }
}

export default store
