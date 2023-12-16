/* eslint-disable @typescript-eslint/no-misused-promises */
import Block from '../../utils/Block'
import template from './login.hbs'
import AuthController, { type ControllerSignUpData } from '../../controllers/AuthController'
import { connect } from '../../utils/Store'
import { Form, type FormProps, type FormWrap } from '../../components/form'
import { submit } from '../../utils/validation'
import { type InputContainer } from '../../components/inputContainer'
import { Link } from '../../components/link'

const userFields: string[] = ['login', 'password', 'passwordAgain']

class Login extends Block {
  async onSignIn (): Promise<void> {
    const form = this.getContent()?.querySelector('.auth__form')

    const data = [...new FormData(form as HTMLFormElement)]

    const entries = new Map(data)
    const result = Object.fromEntries(entries)

    await AuthController.signIn(result as unknown as ControllerSignUpData)
  }

  init (): void {
    this.children.form = new Form<FormProps>({
      class: 'auth',
      inputs: userFields,
      titleClass: 'auth__title',
      titleLabel: 'Вход',
      inputClass: 'auth__input',
      editing: false,
      emptyValues: true,
      btnClass: 'auth__button auth__button_margin',
      btnLabel: 'Войти',
      btnType: 'submit',
      events: {
        submit: async (e?: Event) => {
          e?.preventDefault()
          await submit(((this.children.form as FormWrap).children.inputs as InputContainer[]), this.getContent(), this.onSignIn.bind(this), '.auth__form')
        }
      }
    })

    /*
    userFields.map(input => {
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
    }) */

    /* this.children.buttonSub = new Button({
      class: 'auth__button auth__button_margin',
      label: 'Войти',
      type: 'submit',
      events: {
        click: (e?: Event) => {
          void submit(this.children.inputs, this.onSignIn.bind(this), e)
        }
      }
    }) */

    this.children.buttonLink = new Link({
      class: 'auth__button_reg button',
      label: 'Нет аккаунта?',
      to: '/sign-up'
    })
  }

  render (): DocumentFragment {
    return this.compile(template, this.props)
  }
}

const connectUser = connect((state) => ({ ...state.currentUser }))

export const LoginPage = connectUser(Login as typeof Block)
