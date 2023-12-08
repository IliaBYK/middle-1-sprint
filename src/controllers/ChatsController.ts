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
    await this.api.create(title).catch(e => {
      console.log(e)
    })

    await this.fetchChats().catch(e => {
      console.log(e)
    })
  }

  async fetchChats (): Promise<void> {
    try {
      const chats = await this.api.request()

      chats.map(async (chat) => {
        const token = await this.getToken(chat.id)

        await MessagesController.connect(chat.id, token)
      })

      store.set('chats', chats)
    } catch (e) {
      console.log(e)
    }
  }

  async addUserToChat (id: number, userId: number): Promise<void> {
    await this.api.addUsers(id, [userId]).catch(e => {
      console.log(e)
    })
  }

  async delete (id: number): Promise<void> {
    try {
      await this.api.delete(id)

      await this.fetchChats()
    } catch (e) {
      console.log(e)
    }
  }

  getToken (id: number): any {
    return this.api.getToken(id).catch(e => {
      console.log(e)
    })
  }

  selectChat (id: number): void {
    store.set('selectedChat', id)
  }
}

const controller = new ChatsController()

// @ts-expect-error
window.chatsController = controller

export default controller
