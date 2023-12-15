import { Imagine } from '../imagine/index'
import Block from '../../utils/Block'
import template from './container.hbs'
import { Union } from '../../images/index'

interface Props {
  avatar: string
  class?: string
  onClick?: () => void
  events?: {
    click: () => void
  }
}

export class EditAvatarContainer extends Block<Props> {
  init (): void {
    this.children.imagine = new Imagine({
      src: this.props.avatar || Union,
      class: 'edit__avatar',
      alt: 'Аватар пользователя'
    })
  }

  protected componentDidUpdate (oldProps: Props, newProps: Props): boolean {
    if (!oldProps && !newProps) return false;

    (this.children.imagine as Imagine).setProps({
      src: newProps.avatar
    })

    return true
  }

  render (): DocumentFragment {
    return this.compile(template, { ...this.props })
  }
}
