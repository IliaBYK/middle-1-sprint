/* eslint-disable @typescript-eslint/ban-ts-comment */
import API, { type ChatsAPI } from '../api/chats-api'
import store from '../utils/Store'
import MessagesController from './MessageController'

class ChatsController {
  private readonly api: ChatsAPI

  constructor () {
    this.api = API
  }

  async create (title: string): Promise<void> {
    await this.api.create(title)

    await this.fetchChats()
  }

  async fetchChats (): Promise<void> {
    const chats = await this.api.request()

    chats.map(async (chat) => {
      const token = await this.getToken(chat.id)

      await MessagesController.connect(chat.id, token)
    })

    store.set('chats', chats)
  }

  async addUserToChat (id: number, userId: number): Promise<void> {
    await this.api.addUsers(id, [userId])
  }

  async delete (id: number): Promise<void> {
    await this.api.delete(id)

    await this.fetchChats()
  }

  getToken (id: number): any {
    return this.api.getToken(id)
  }

  selectChat (id: number): void {
    store.set('selectedChat', id)
  }
}

const controller = new ChatsController()

// @ts-expect-error
window.chatsController = controller

export default controller
