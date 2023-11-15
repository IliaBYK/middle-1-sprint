import Block from '../../utils/Block'
import template from './signup.hbs'
import { render } from '../../utils/render'
import { Button } from '../../components/button/index'
import { InputContainer } from '../../components/inputContainer/index'
import { Title } from '../../components/title/index'
import { submit, validation } from '../../utils/validation'
import errors from '../../utils/errors'

export class SignupPage extends Block {
  constructor () {
    super({})
  }

  init (): void {
    this.children.title = new Title({
      class: 'auth__title',
      label: 'Регистрация'
    })

    this.children.first_name = new InputContainer({
      label: 'Имя',
      name: 'first_name',
      type: 'text',
      required: true,
      events: {
        click: () => {

        },
        blur: () => validation(this.children, 'first_name', errors)
      }
    })
    this.children.second_name = new InputContainer({
      label: 'Фамилия',
      name: 'second_name',
      type: 'text',
      required: true,
      events: {
        click: () => {

        },
        blur: () => validation(this.children, 'second_name', errors)
      }
    })
    this.children.email = new InputContainer({
      label: 'Почта',
      name: 'email',
      type: 'email',
      required: true,
      events: {
        click: () => {

        },
        blur: () => validation(this.children, 'email', errors)
      }
    })
    this.children.login = new InputContainer({
      label: 'Логин',
      name: 'login',
      type: 'text',
      required: true,
      events: {
        click: () => {

        },
        blur: () => validation(this.children, 'login', errors)
      }
    })
    this.children.phone = new InputContainer({
      label: 'Телефон',
      name: 'phone',
      type: 'tel',
      required: true,
      events: {
        click: () => {

        },
        blur: () => validation(this.children, 'phone', errors)
      }
    })

    this.children.password = new InputContainer({
      label: 'Пароль',
      name: 'password',
      type: 'password',
      required: true,
      events: {
        click: () => {},
        blur: () => validation(this.children, 'password', errors)
      }
    })

    this.children.passwordElse = new InputContainer({
      class: 'auth__label_last',
      label: 'Пароль еще раз',
      name: 'passwordElse',
      type: 'password',
      required: true,
      events: {
        click: () => {},
        blur: () => validation(this.children, 'passwordElse', errors)
      }
    })

    this.children.buttonSub = new Button({
      class: 'auth__button auth__button_margin',
      label: 'Зарегистрироваться',
      events: {
        click: (e?: Event) => {
          submit(this.children, e)
        }
      }
    })

    this.children.buttonLink = new Button({
      class: 'auth__button_reg',
      label: 'Войти',
      events: {
        click: () => { render('login') }
      }
    })
  }

  render (): DocumentFragment {
    return this.compile(template, this.props)
  }
}
