import Block from '../../utils/Block'
import template from './editPassword.hbs'
import { Button } from '../../components/button/index'
import { EditAvatarContainer } from '../../components/editAvatarContainer/index'
import { /* submit, */ validation } from '../../utils/validation'
import { InputContainer } from '../../components/inputContainer'
import Router from '../../utils/Router'
import { type User } from '../../api/user-api'
import { connect } from '../../utils/Store'
import { RESOURCES_URL } from '../../utils/constants'

const InputNames: Record<string, string> = {
  oldPassword: 'Старый пароль',
  newPassword: 'Новый пароль',
  newPasswordAgain: 'Повторите новый пароль'
}

const userFields: string[] = ['oldPassword', 'newPassword', 'newPasswordAgain']

interface Props extends User {
  avatar: string
}
class EditPassword extends Block<Props> {
  constructor (props: Props) {
    super({ ...props })
  }

  init (): void {
    this.children.avatar = new EditAvatarContainer({
      avatar: this.props.avatar,
      class: 'edit__avatar-container_place_password',
      events: {
        click: () => {}
      }
    })

    this.children.buttonToChats = new Button({
      class: 'edit__button',
      events: {
        click: () => { Router.back() }
      }
    })

    this.children.inputs = userFields.map(input => {
      return new InputContainer({
        class: 'edit__input',
        label: InputNames[input],
        name: input,
        type: 'password',
        edit: true,
        required: false,
        events: {
          blur: () => validation(this.children)
        }
      })
    });

    (this.children.avatar as EditAvatarContainer).setProps({
      avatar: `https://ya-praktikum.tech/api/v2/resources${this.props.avatar}`
    })

    /* this.children.oldPassword = new InputContainer({
      class: 'edit__input',
      label: 'Старый пароль',
      name: 'oldPassword',
      type: 'password',
      edit: true,
      required: false,
      events: {
        blur: () => validation(this.children, 'oldPassword')
      }
    })

    this.children.newPassword = new InputContainer({
      class: 'edit__input',
      label: 'Новый пароль',
      name: 'newPassword',
      type: 'password',
      edit: true,
      required: false,
      events: {
        blur: () => validation(this.children, 'newPassword')
      }
    })

    this.children.newPasswordAgain = new InputContainer({
      class: 'edit__input',
      label: 'Повторите новый пароль',
      name: 'newPasswordAgain',
      type: 'password',
      edit: true,
      required: false,
      events: {
        blur: () => validation(this.children, 'newPasswordAgain')
      }
    }) */

    this.children.changeData = new Button({
      class: 'auth__button edit__submit-btn_password edit__submit-btn',
      label: 'Cохранить',
      type: 'submit',
      events: {
        click: () => {
          // submit(this.children, e)
          /* this.validation() */ }
      }
    })
  }

  protected componentDidUpdate (oldProps: Props, newProps: Props): boolean {
    if (!oldProps && !newProps) return false;

    (this.children.avatar as EditAvatarContainer).setProps({
      avatar: `${RESOURCES_URL}${newProps.avatar}`
    })

    return true
  }

  render (): DocumentFragment {
    return this.compile(template, this.props)
  }
}

const connectUser = connect((state) => ({ ...state.currentUser }))

export const EditPasswordPage = connectUser(EditPassword as typeof Block)
