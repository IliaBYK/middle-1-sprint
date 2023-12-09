/* eslint-disable @typescript-eslint/naming-convention */
import UserAPI from '../api/user-api'
import store from '../utils/Store'
import Router from '../utils/Router'
import { ACTIONS } from '../utils/constants'

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
  passwordAgain: string
}

class AuthController {
  private readonly api: typeof UserAPI

  constructor () {
    this.api = UserAPI
  }

  async signUp (data: ControllerSignUpData): Promise<void> {
    if (data.passwordAgain !== data.password) {
      store.set(ACTIONS.CURRENT_USER_ERROR, 'Пароли не совпдают')

      return
    }

    const { passwordAgain, ...signUpData } = data

    store.set(ACTIONS.CURRENT_USER_IS_LOADING, true)

    try {
      const response = this.api.signup(signUpData)
      if ((response as any).reason) {
        store.set(ACTIONS.CURRENT_USER_ERROR, (response as any).reason)

        return
      }

      await this.fetchUser()

      Router.go('/messenger')
    } catch (e) {
      store.set(ACTIONS.CURRENT_USER_IS_LOADING, false)
    }
  }

  async signIn (data: SignInData): Promise<void> {
    try {
      await this.api.signin(data)

      await this.fetchUser()

      Router.go('/messenger')
    } catch (e) {
      console.log(e)
    }
  }

  async logout (): Promise<void> {
    try {
      await this.api.logout()

      const router = Router

      router.go('/')
    } catch (error) {
      console.log(error)
    }
  }

  async fetchUser (): Promise<void> {
    try {
      const user = await this.api.request()

      store.set(ACTIONS.CURRENT_USER, user)
    } catch (error) {
      console.log(error)
    }
  }
}

export default new AuthController()
