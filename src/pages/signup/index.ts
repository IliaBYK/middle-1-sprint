import Block from '../../utils/Block'
import template from './signup.hbs'
import AuthController, { type ControllerSignUpData } from '../../controllers/AuthController'
/* import { render } from '../../utils/render' */
import { Button } from '../../components/button/index'
import { InputContainer } from '../../components/inputContainer/index'
import { Title } from '../../components/title/index'
import { submit, validation } from '../../utils/validation'
import { Link } from '../../components/link/index'
import { connect } from '../../utils/Store'

const InputNames: Record<string, string> = {
  first_name: 'Имя',
  second_name: 'Фамилия',
  email: 'Почта',
  login: 'Логин',
  phone: 'Телефон',
  password: 'Пароль',
  passwordAgain: 'Пароль еще раз'
}

const userFields: string[] = ['first_name', 'second_name', 'email', 'login', 'phone', 'password', 'passwordAgain']

class Signup extends Block {
  constructor () {
    super({})
  }

  async onSignUp (): Promise<void> {
    const element = this.getContent()

    const inputs = element?.querySelectorAll('.auth__input')

    const data: Record<string, unknown> = {}

    Array.from(inputs!).forEach((input) => {
      data[(input as HTMLInputElement).name] = (input as HTMLInputElement).value
    })

    await AuthController.signUp(data as unknown as ControllerSignUpData)
  }

  init (): void {
    this.children.title = new Title({
      class: 'auth__title',
      label: 'Регистрация'
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

    /* this.children.first_name = new InputContainer({
      class: 'auth__input',
      label: 'Имя',
      name: 'first_name',
      type: 'text',
      required: true,
      events: {
        blur: () => validation(this.children)
      }
    })
    this.children.second_name = new InputContainer({
      class: 'auth__input',
      label: 'Фамилия',
      name: 'second_name',
      type: 'text',
      required: true,
      events: {
        blur: () => validation(this.children)
      }
    })
    this.children.email = new InputContainer({
      class: 'auth__input',
      label: 'Почта',
      name: 'email',
      type: 'email',
      required: true,
      events: {
        blur: () => validation(this.children)
      }
    })
    this.children.login = new InputContainer({
      class: 'auth__input',
      label: 'Логин',
      name: 'login',
      type: 'text',
      required: true,
      events: {
        blur: () => validation(this.children)
      }
    })
    this.children.phone = new InputContainer({
      class: 'auth__input',
      label: 'Телефон',
      name: 'phone',
      type: 'tel',
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
      label: 'Зарегистрироваться',
      events: {
        click: (e?: Event) => {
          void submit(this.children.inputs, this.onSignUp.bind(this), e)
        }
      }
    })

    this.children.buttonLink = new Link({
      class: 'auth__button_reg button',
      label: 'Войти',
      to: '/'
    })
  }

  render (): DocumentFragment {
    return this.compile(template, this.props)
  }
}

const connectUser = connect((state) => ({ ...state.currentUser }))

export const SignupPage = connectUser(Signup as typeof Block)
