import { Imagine } from '../imagine/index'
import Block from '../../utils/Block'
import template from './container.hbs'
import { Union } from '../../images'

interface Props {
  class?: string
  onClick?: () => void
  events?: {
    click: () => void
  }
}

export class EditAvatarContainer extends Block<Props> {
  constructor (props: Props) {
    super({ ...props })
  }

  init (): void {
    this.children.imagine = new Imagine({
      src: Union,
      class: 'edit__avatar',
      alt: 'Аватар пользователя'
    })
  }

  render (): DocumentFragment {
    return this.compile(template, { ...this.props })
  }
}
