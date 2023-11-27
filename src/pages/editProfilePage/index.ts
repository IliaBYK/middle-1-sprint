import Block from '../../utils/Block'
import template from './editProfilePage.hbs'
import { Button } from '../../components/button/index'
import { Title } from '../../components/title/index'
import { Imagine } from '../../components/imagine/index'
import { EditAvatarContainer } from '../../components/editAvatarContainer/index'
import { /* submit, */ validation } from '../../utils/validation'
import { InputContainer } from '../../components/inputContainer'
import Router from '../../utils/Router'

export class EditProfilePage extends Block {
  constructor () {
    super({})
  }

  init (): void {
    this.children.avatar = new EditAvatarContainer({
      events: {
        click: () => {}
      }
    })

    this.children.title = new Title({
      class: 'edit__title',
      label: 'Андрей'
    })

    this.children.imagine = new Imagine({
      src: '../../images/Union.png',
      class: 'edit__avatar',
      alt: 'Аватар пользователя'
    })

    this.children.buttonToChats = new Button({
      class: 'edit__button',
      events: {
        click: () => { Router.back() }
      }
    })

    /*
    class
    label
    name
    type
    */

    this.children.email = new InputContainer({
      label: 'Почта',
      class: 'edit__input',
      name: 'email',
      type: 'email',
      edit: true,
      required: false,
      events: {
        blur: () => validation(this.children, 'email')
      }
    })

    this.children.login = new InputContainer({
      label: 'Логин',
      class: 'edit__input',
      name: 'login',
      type: 'text',
      edit: true,
      required: false,
      events: {
        blur: () => validation(this.children, 'login')
      }
    })

    this.children.first_name = new InputContainer({
      label: 'Имя',
      class: 'edit__input',
      name: 'first_name',
      type: 'text',
      edit: true,
      required: false,
      events: {
        blur: () => validation(this.children, 'first_name')
      }
    })

    this.children.second_name = new InputContainer({
      label: 'Фамилия',
      class: 'edit__input',
      name: 'second_name',
      type: 'text',
      edit: true,
      required: false,
      events: {
        blur: () => validation(this.children, 'second_name')
      }
    })

    this.children.display_name = new InputContainer({
      label: 'Имя в чате',
      class: 'edit__input',
      name: 'display_name',
      type: 'text',
      edit: true,
      required: false,
      events: {
        blur: () => validation(this.children, 'display_name')
      }
    })

    this.children.phone = new InputContainer({
      class: 'edit__input',
      identificator: 'edit__input-container_last',
      label: 'Телефон',
      name: 'phone',
      type: 'tel',
      edit: true,
      required: false,
      events: {
        blur: () => validation(this.children, 'phone')
      }
    })

    this.children.changeData = new Button({
      class: 'auth__button edit__submit-btn_password edit__submit-btn',
      label: 'Cохранить',
      type: 'submit',
      events: {
        click: (e?: Event) => {
          // submit(this.children, e)
        }
      }
    })
  }

  render (): DocumentFragment {
    return this.compile(template, this.props)
  }
}
