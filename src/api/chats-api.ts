import BaseAPI from './base-api'
import { type User } from './user-api'

export interface ChatInfo {
  id: number
  title: string
  avatar: string
  unread_count: number
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

  async getToken (id: number): Promise<string> {
    const response = await this.http.post<{ token: string }>(`/token/${id}`)

    return response.token
  }

  async create (title: string): Promise<void> {
    await this.http.post('/', { title })

    await this.request()
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
