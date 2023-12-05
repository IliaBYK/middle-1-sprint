import { Imagine } from '../imagine/index'
import Block from '../../utils/Block'
import template from './container.hbs'
import { Union } from '../../images'
import { connect } from '../../utils/Store'
import { type User } from '../../api/user-api'

interface Props extends User {
  class?: string
  onClick?: () => void
  events?: {
    click: () => void
  }
}

class EditAvatar extends Block<Props> {
  constructor (props: Props) {
    super({ ...props })
  }

  init (): void {
    this.children.imagine = new Imagine({
      src: this.props.avatar || Union,
      class: 'edit__avatar',
      alt: 'Аватар пользователя'
    })

    this.setProps({ avatar: `https://ya-praktikum.tech/api/v2/resources${this.props.avatar}` })
  }

  protected componentDidUpdate (oldProps: Props, newProps: Props): boolean {
    if (!oldProps && !newProps) return false;
    (this.children.imagine as Imagine).setProps({ src: newProps.avatar })

    return false
  }

  render (): DocumentFragment {
    return this.compile(template, { ...this.props })
  }
}

const connectUser = connect((state) => ({ ...state.currentUser }))

export const EditAvatarContainer = connectUser(EditAvatar as typeof Block)
