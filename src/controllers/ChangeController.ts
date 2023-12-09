/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { type Password } from './../api/change-user-data-api'
import ChangeUserApi from '../api/change-user-data-api'
import UserApi from '../api/user-api'
import isEqual from '../helpers/isEqual'
import Router from '../utils/Router'
import store from '../utils/Store'
import { ACTIONS } from '../utils/constants'

export interface ChangeData {
  email: string
  login: string
  first_name: string
  second_name: string
  display_name: string
  phone: string
}

export interface PasswordData extends Password {
  newPasswordAgain: string
}

class ChangeController {
  private readonly api: typeof ChangeUserApi
  private readonly apiUser: typeof UserApi

  constructor () {
    this.api = ChangeUserApi
    this.apiUser = UserApi
  }

  async ChangePassword (data: PasswordData): Promise<void> {
    if (data.oldPassword !== data.newPassword && data.newPassword === data.newPasswordAgain) {
      try {
        await this.api.changePassword(data)
      } catch (e) {
        console.log(e)
      }
    }
  }

  async ChangeAvatar (file: File): Promise<void> {
    try {
      const response = await this.api.changeAvatar(file)
      if ((response as any).reason) {
        store.set(ACTIONS.CURRENT_USER_ERROR, (response as any).reason)
      }
    } catch (e) {
      store.set(ACTIONS.CURRENT_USER_IS_LOADING, false)
    }

    await this.fetchUser().catch(e => {
      console.log(e)
    })
  }

  async changeUser (data: ChangeData): Promise<void> {
    data.display_name = data.first_name + ' ' + data.second_name
    const { ...ChangeData } = data

    store.set(ACTIONS.CURRENT_USER_IS_LOADING, true)

    // console.log(isEqual(ChangeData, store.getState().currentUser!))

    if (!isEqual(ChangeData, store.getState().currentUser)) {
      try {
        const response = this.api.update(store.getState().currentUser?.id + '', ChangeData)
        if ((response as any).reason) {
          store.set(ACTIONS.CURRENT_USER_ERROR, (response as any).reason)
        }
      } catch (e) {
        store.set(ACTIONS.CURRENT_USER_IS_LOADING, false)
      }

      // await this.fetchUser()

      store.set(ACTIONS.CURRENT_USER, data)

      const router = Router

      router.go('/settings')
    }
  }

  async fetchUser (): Promise<void> {
    const user = await this.apiUser.request().catch(e => {
      console.log(e)
    })

    store.set(ACTIONS.CURRENT_USER, user)
  }
}

export default new ChangeController()
