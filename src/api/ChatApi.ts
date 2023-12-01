import BaseAPI from './BaseApi'
import { type User } from './UserApi'

export interface ChatInfo {
  id: number
  title: string
  avatar: string
  counter: number
  last_message: {
    user: User
    time: string
    content: string
  }
}

export class ChatsAPI extends BaseAPI {
  constructor () {
    super('/chats')
  }

  async request (): Promise<ChatInfo[]> {
    return await this.http.get('/')
  }

  async create (title: string): Promise<void> {
    await this.http.post('/', { title })
  }

  async delete (id: number): Promise<unknown> {
    return await this.http.delete('/', { chatId: id })
  }

  async getUsers (id: number): Promise<Array<User & { role: string }>> {
    return await this.http.get(`/${id}/users`)
  }

  async addUsers (id: number, users: number[]): Promise<void> {
    await this.http.put('/users', { users, chatId: id })
  }

  update = undefined
}

export default new ChatsAPI()
