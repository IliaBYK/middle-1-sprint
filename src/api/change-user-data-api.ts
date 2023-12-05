import BaseAPI from './base-api'

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

export interface Avatar extends userProps {
  avatar: string
}

export interface Password extends userProps {
  oldPassword: 'string'
  newPassword: 'string'
}

class ChangeUserAPI extends BaseAPI {
  constructor () {
    super('/user')
  }

  async update (userId: string | number, data: ChangeData): Promise<void> {
    await this.http.put('/profile', { id: userId, ...data })
  }

  async changePassword (data: Password): Promise<void> {
    await this.http.put('/password', data)
  }

  async changeAvatar (file: File): Promise<void> {
    const data = new FormData()
    data.append('avatar', file)
    await this.http.put('/profile/avatar', data)
  }

  request = undefined
  create = undefined
  delete = undefined
}

export default new ChangeUserAPI()
