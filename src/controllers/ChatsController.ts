/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import API, { type ChatsAPI } from '../api/chats-api'
import store from '../utils/Store'
import { ACTIONS } from '../utils/constants'
import MessagesController from './MessageController'

class ChatsController {
  private readonly api: ChatsAPI

  constructor () {
    this.api = API
  }

  async create (title: string): Promise<void> {
    try {
      await this.api.create(title)

      await this.fetchChats()
    } catch (e) {
      console.log(e)
    }
  }

  async fetchChats (): Promise<void> {
    try {
      const chats = await this.api.request()

      if (chats?.length) {
        chats.map(async (chat) => {
          const token = await this.getToken(chat.id)

          await MessagesController.connect(chat.id, token)
        })
      }

      store.set(ACTIONS.CHATS, chats)
    } catch (e) {
      console.log(e)
      store.set(ACTIONS.CHATS_ERROR, e)
    }
  }

  async addUserToChat (id: number, userId: number): Promise<void> {
    try {
      await this.api.addUsers(id, [userId])
    } catch (e) {
      console.log(e)
    }
  }

  async deleteUserFromChat (id: number, userId: number): Promise<void> {
    try {
      await this.api.deleteUsers(id, [userId])
    } catch (e) {
      console.log(e)
    }
  }

  async delete (id: number): Promise<void> {
    try {
      await this.api.delete(id)

      await this.fetchChats()
    } catch (e) {
      console.log(e)
    }
  }

  async ChangeAvatar (file: File): Promise<void> {
    try {
      const response = await this.api.changeChatAvatar(file)
      if ((response as any).reason) {
        store.set(ACTIONS.CURRENT_USER_ERROR, (response as any).reason)
      }
    } catch (e) {
      store.set(ACTIONS.CURRENT_USER_IS_LOADING, false)
    }
  }

  getToken (id: number): any {
    try {
      return this.api.getToken(id)
    } catch (error) {
      console.log(error)
    }
  }

  selectChat (id: number): void {
    store.set(ACTIONS.SELECTED_CHAT, id)
  }
}

const controller = new ChatsController()

// @ts-expect-error
window.chatsController = controller

export default controller
