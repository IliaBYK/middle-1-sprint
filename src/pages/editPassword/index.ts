import Block from '../../utils/Block'
import template from './editPassword.hbs'
import { Button } from '../../components/button/index'
import { EditAvatarContainer } from '../../components/editAvatarContainer/index'
import { /* submit, */ validation } from '../../utils/validation'
import { InputContainer } from '../../components/inputContainer'
import Router from '../../utils/Router'

export class EditPasswordPage extends Block {
  constructor () {
    super({})
  }

  init (): void {
    this.children.avatar = new EditAvatarContainer({
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

    this.children.oldPassword = new InputContainer({
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
    })

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

  render (): DocumentFragment {
    return this.compile(template, this.props)
  }
}
