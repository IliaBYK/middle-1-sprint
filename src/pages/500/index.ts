import { ErrorPage } from '../../components/errorPage'
import Block from '../../utils/Block'
import template from './500.hbs'

export class InternalError extends Block {
  constructor () {
    super({})
  }

  init (): void {
    this.children.page = new ErrorPage({
      code: '500',
      message: 'Мы уже фиксим'
    })
  }

  render (): DocumentFragment {
    return this.compile(template, { ...this.props })
  }
}
