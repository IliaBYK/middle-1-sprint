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
    } catch (e) {
      store.set(ACTIONS.CURRENT_USER_IS_LOADING, false)

      return
    }

    await this.fetchUser().catch(e => {
      console.log(e)
    })

    Router.go('/messenger')
  }

  async signIn (data: SignInData): Promise<void> {
    await this.api.signin(data).catch(e => {
      console.log(e)
    })

    await this.fetchUser().catch(e => {
      console.log(e)
    })

    Router.go('/messenger')
  }

  async logout (): Promise<void> {
    await this.api.logout().catch(e => {
      console.log(e)
    })

    const router = Router

    router.go('/')
  }

  async fetchUser (): Promise<void> {
    const user = await this.api.request().catch(e => {
      console.log(e)
    })

    store.set(ACTIONS.CURRENT_USER, user)
  }
}

export default new AuthController()
