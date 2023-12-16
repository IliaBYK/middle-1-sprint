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
      await this.api.signup(signUpData)

      await this.fetchUser()

      Router.go('/messenger')
    } catch (e) {
      store.set(ACTIONS.CURRENT_USER_IS_LOADING, false)
      return
    }
  }

  async signIn (data: SignInData): Promise<void> {
    try {
      await this.api.signin(data)

      await this.fetchUser()
    } catch (e) {
      console.log(e)
      return
    }

    Router.go('/messenger')
  }

  async logout (): Promise<void> {
    try {
      await this.api.logout()
    } catch (error) {
      console.log(error)
      return
    }

    const router = Router

    router.go('/')
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
