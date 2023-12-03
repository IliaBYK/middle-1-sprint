import Block from '../../utils/Block'
import template from './login.hbs'
// import { render } from '../../utils/render'
import { Button } from '../../components/button/index'
import { InputContainer } from '../../components/inputContainer/index'
import { Title } from '../../components/title/index'
import { submit, validation } from '../../utils/validation'
import AuthController, { type ControllerSignUpData } from '../../controllers/AuthController'
// import Router from '../../utils/Router'
import { Link } from '../../components/link/index'
import { connect } from '../../utils/Store'

const InputNames: Record<string, string> = {
  login: 'Логин',
  password: 'Пароль',
  passwordAgain: 'Пароль еще раз'
}

const userFields: string[] = ['login', 'password', 'passwordAgain']

class Login extends Block {
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

    this.children.inputs = userFields.map(input => {
      return new InputContainer({
        class: 'auth__input',
        label: InputNames[input],
        name: input,
        type: input === 'password' || input === 'passwordAgain' ? 'password' : 'text',
        required: true,
        events: {
          blur: () => validation(this.children.inputs)
        }
      })
    })

    /* this.children.login = new InputContainer({
      class: 'auth__input',
      label: 'Логин',
      name: 'login',
      type: 'text',
      required: true,
      events: {
        blur: () => validation(this.children)
      }
    })

    this.children.password = new InputContainer({
      class: 'auth__input',
      label: 'Пароль',
      name: 'password',
      type: 'password',
      required: true,
      events: {
        blur: () => validation(this.children)
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
        blur: () => validation(this.children)
      }
    }) */

    this.children.buttonSub = new Button({
      class: 'auth__button auth__button_margin',
      label: 'Войти',
      type: 'submit',
      events: {
        click: (e?: Event) => {
          void submit(this.children.inputs, this.onSignIn.bind(this), e)
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

const connectUser = connect((state) => ({ ...state.currentUser }))

export const LoginPage = connectUser(Login as typeof Block)
