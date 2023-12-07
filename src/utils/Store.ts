import { set } from '../helpers/helpers'
import isEqual from '../helpers/isEqual'
import { EventBus } from './EventBus'
import type Block from './Block'
import { type ChatInfo } from '../api/chats-api'
import { type Message } from '../controllers/MessageController'
import { type User } from '../api/user-api'

export enum StoreEvents {
  Updated = 'updated',
}

/* interface User {
  'id': number
  'first_name': string
  'second_name': string
  'display_name': string
  'login': string
  'email': string
  'phone': string
  'avatar': string
} */

interface StoreData {
  currentUser: User
  chats: ChatInfo[]
  messages: Record<number, Message[]>
  selectedChat?: number
}

export class Store extends EventBus {
  private readonly state: StoreData | any = {}

  public getState (): StoreData {
    return this.state
  }

  public set (path: string, value: unknown): void {
    set(this.state, path, value)

    this.emit(StoreEvents.Updated, this.getState())
  };
}

const store = new Store()

export function connect (mapStateToProps: (state: StoreData) => any) {
  return function (Component: typeof Block): typeof Block {
    return class extends Component {
      constructor (props: any) {
        // сохраняем начальное состояние
        let state = mapStateToProps(store.getState())

        super({ ...props, ...state })

        // подписываемся на событие
        store.on(StoreEvents.Updated, () => {
          // при обновлении получаем новое состояние
          const newState = mapStateToProps(store.getState())

          // если что-то из используемых данных поменялось, обновляем компонент
          if (!isEqual(state, newState)) {
            this.setProps({ ...newState })
          }

          // не забываем сохранить новое состояние
          state = newState
        })
      }
    }
  }
}

export default store
