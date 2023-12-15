import { ErrorPage } from '../../components/errorPage/index'
import Block from '../../utils/Block'
import { template } from './404'

export class NotFound extends Block {
  constructor () {
    super({})
  }

  init (): void {
    this.children.page = new ErrorPage({
      code: '404',
      message: 'Не туда попали'
    })
  }

  render (): DocumentFragment {
    return this.compile(template, { ...this.props })
  }
}
