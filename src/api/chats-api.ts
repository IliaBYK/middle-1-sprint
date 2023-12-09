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
    return await (this.http.get('/') as Promise<ChatInfo[]>)
  }

  async getToken (id: number): Promise<string> {
    const response = await this.http.post(`/token/${id}`) as Promise<{ token: string }>

    return (await response).token
  }

  async create (title: string): Promise<void> {
    try {
      await this.http.post('/', { data: { title } })

      await this.request()
    } catch (e) {
      console.log(e)
      console.log({ title })
    }
  }

  async delete (id: number): Promise<unknown> {
    return await this.http.delete('/', { data: { chatId: id } })
  }

  async getUsers (id: number): Promise<Array<User & { role: string }>> {
    return await (this.http.get(`/${id}/users`) as Promise<Array<User & { role: string }>>)
  }

  async addUsers (id: number, users: number[]): Promise<void> {
    await this.http.put('/users', { data: { users, chatId: id } })
  }

  async changeChatAvatar (file: File): Promise<void> {
    const data = new FormData()
    data.append('avatar', file)
    await this.http.put('/avatar', { data })
  }

  update = undefined
}

export default new ChatsAPI()
