/* eslint-disable @typescript-eslint/naming-convention */
import UserAPI from '../api/UserApi'
import store from '../utils/Store'
import Router from '../utils/Router'
/* import { response } from 'express' */

export interface SignUpData {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}

export interface SignInData {
  login: string
  password: string
}

export interface ControllerSignUpData extends SignUpData {
  confirm_password: string
}

class AuthController {
  private readonly api: typeof UserAPI

  constructor () {
    this.api = UserAPI
  }

  async signUp (data: ControllerSignUpData): Promise<void> {
    if (data.confirm_password !== data.password) {
      store.set('currentUser.error', 'Пароли не совпдают')

      return
    }

    const { confirm_password, ...signUpData } = data

    store.set('currentUser.isLoading', true)

    try {
      const response = this.api.signup(signUpData)
      if ((response as any).reason) {
        store.set('currentUser.error', (response as any).reason)

        return
      }
    } catch (e) {
      store.set('currentUser.isLoading', false)

      return
    }

    await this.fetchUser()

    const router = Router

    router.go('/messenger')
  }

  async signIn (data: SignInData): Promise<void> {
    await this.api.signin(data)

    const router = Router

    router.go('/messenger')
  }

  async logout (): Promise<void> {
    await this.api.logout()

    const router = Router

    router.go('/')
  }

  async fetchUser (): Promise<void> {
    const user = await this.api.request()

    store.set('currentUser', user)
  }
}

export default new AuthController()
