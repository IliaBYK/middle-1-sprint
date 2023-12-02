import BaseAPI from './base-api'

export interface SigninData {
  login: string
  password: string
}

export interface SignupData {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}

type userProps = Record<string, string | number>

export interface User extends userProps {
  id: number
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  password: string
  phone: string
  avatar: string
}

class UserAPI extends BaseAPI {
  constructor () {
    super('/auth')
  }

  async signin (data: SigninData): Promise<void> {
    await this.http.post('/signin', data)
  }

  async signup (data: SignupData): Promise<void> {
    await this.http.post('/signup', data)
  }

  async request (): Promise<User> {
    return await this.http.get('/user')
  }

  async logout (): Promise<void> {
    await this.http.post('/logout')
  }

  update = undefined
  create = undefined
  delete = undefined
}

export default new UserAPI()
