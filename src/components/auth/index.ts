import { LoginPage } from '../../pages/login/index'
import Block from '../../utils/Block'
import template from './auth.hbs'

export default class Auth extends Block {
  constructor () {
    super({})
  }

  init (): void {
    this.children.login = new LoginPage({})
  }

  render (): DocumentFragment {
    return this.compile(template, this.props)
  }
}
