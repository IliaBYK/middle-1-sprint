import BaseAPI from './BaseApi'

export interface ChangeData {
  email: string
  login: string
  first_name: string
  second_name: string
  display_name: string
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

class ChangeUserAPI extends BaseAPI {
  constructor () {
    super('/user')
  }

  async changeUser (data: ChangeData): Promise<void> {
    await this.http.put('/profile', data)
  }

  get = undefined
  update = undefined
  create = undefined
  delete = undefined
}

export default new ChangeUserAPI()
