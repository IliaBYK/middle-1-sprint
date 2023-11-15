import Block from '../../utils/Block'
import template from './editPassword.hbs'
import { render } from '../../utils/render'
import { Button } from '../../components/button'
import { InputEdit } from '../../components/inputEdit'
import { EditAvatarContainer } from '../../components/editAvatarContainer'

export class EditPassword extends Block {
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
        click: () => { render('chats') }
      }
    })

    this.children.oldPassword = new InputEdit({
      label: 'Старый пароль',
      name: 'oldPassword',
      type: 'password'
    })

    this.children.newPassword = new InputEdit({
      label: 'Новый пароль',
      name: 'newPassword',
      type: 'password'
    })

    this.children.newPasswordAgain = new InputEdit({
      label: 'Повторите новый пароль',
      name: 'newPasswordAgain',
      type: 'password'
    })

    this.children.changeData = new Button({
      class: 'auth__button edit__submit-btn_password edit__submit-btn',
      label: 'Cохранить'
    })
  }

  render (): DocumentFragment {
    return this.compile(template, this.props)
  }
}
