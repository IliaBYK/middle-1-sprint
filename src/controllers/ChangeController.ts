import ChangeUserApi from '../api/change-user-data-api'
import UserApi from '../api/user-api'
import isEqual from '../helpers/isEqual'
import Router from '../utils/Router'
import store from '../utils/Store'

export interface ChangeData {
  email: string
  login: string
  first_name: string
  second_name: string
  display_name: string
  phone: string
}

class ChangeController {
  private readonly api: typeof ChangeUserApi
  private readonly apiUser: typeof UserApi

  constructor () {
    this.api = ChangeUserApi
    this.apiUser = UserApi
  }

  /* isEqual (newProps: ChangeData, oldProps: User | undefined): boolean {
    let result: boolean = true
    for (const [key, value] of Object.entries(lhs)) {
      const rightValue = rhs[key]
      if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
        if (isEqual(value, rightValue)) {
          continue
        }
        result = false
      }

      if (value !== rightValue) {
        result = false
      }
    }
    return result
  } */

  async changeUser (data: ChangeData): Promise<void> {
    const { ...ChangeData } = data

    store.set('currentUser.isLoading', true)

    // console.log(isEqual(ChangeData, store.getState().currentUser!))

    if (!isEqual(ChangeData, store.getState().currentUser!)) {
      await this.fetchUser()
      try {
        const response = this.api.update(store.getState().currentUser?.id + '', ChangeData)
        if ((response as any).reason) {
          store.set('currentUser.error', (response as any).reason)
        }
      } catch (e) {
        store.set('currentUser.isLoading', false)
      }
      const router = Router

      router.go('/settings')
    }
  }

  async fetchUser (): Promise<void> {
    const user = await this.apiUser.request()

    store.set('currentUser', user)
  }
}

export default new ChangeController()
