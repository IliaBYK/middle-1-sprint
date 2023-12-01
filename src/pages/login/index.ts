import Block from '../../utils/Block'
import template from './login.hbs'
// import { render } from '../../utils/render'
import { Button } from '../../components/button/index'
import { InputContainer } from '../../components/inputContainer/index'
import { Title } from '../../components/title/index'
import { submit, validation } from '../../utils/validation'
import AuthController, { type ControllerSignUpData } from '../../controllers/AuthController'
// import Router from '../../utils/Router'
import { Link } from '../../components/link'

export class LoginPage extends Block {
  constructor () {
    super({})
  }

  async onSignIn (): Promise<void> {
    const element = this.getContent()

    const inputs = element?.querySelectorAll('.auth__input')

    const data: Record<string, unknown> = {}

    Array.from(inputs!).forEach((input) => {
      data[(input as HTMLInputElement).name] = (input as HTMLInputElement).value
    })

    await AuthController.signIn(data as unknown as ControllerSignUpData)
  }

  init (): void {
    this.children.title = new Title({
      class: 'auth__title',
      label: 'Вход'
    })

    this.children.login = new InputContainer({
      class: 'auth__input',
      label: 'Логин',
      name: 'login',
      type: 'text',
      required: true,
      events: {
        blur: () => validation(this.children, 'login')
      }
    })

    this.children.password = new InputContainer({
      class: 'auth__input',
      label: 'Пароль',
      name: 'password',
      type: 'password',
      required: true,
      events: {
        blur: () => validation(this.children, 'password')
      }
    })

    this.children.passwordElse = new InputContainer({
      class: 'auth__input',
      classLabel: 'auth__label_last',
      label: 'Пароль еще раз',
      name: 'passwordElse',
      type: 'password',
      required: true,
      events: {
        blur: () => validation(this.children, 'passwordElse')
      }
    })

    this.children.buttonSub = new Button({
      class: 'auth__button auth__button_margin',
      label: 'Войти',
      type: 'submit',
      events: {
        click: (e?: Event) => {
          void submit(this.children, this.onSignIn.bind(this), e)
          /* this.validation() */ }
      }
    })

    this.children.buttonLink = new Link({
      class: 'auth__button_reg button',
      label: 'Нет аккаунта?',
      to: '/sign-up'
      /* events: {
        click: () => { Router.go('./register') } /* render('signup')
      } */
    })
  }

  render (): DocumentFragment {
    return this.compile(template, this.props)
  }
}
