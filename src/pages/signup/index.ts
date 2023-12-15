import Block from '../../utils/Block'
import { template } from './signup'
import AuthController, { type ControllerSignUpData } from '../../controllers/AuthController'
import { connect } from '../../utils/Store'
import { Form, type FormProps, type FormWrap } from '../../components/form/index'
import { submit } from '../../utils/validation'
import { type InputContainer } from '../../components/inputContainer/index'
import { Link } from '../../components/link/index'

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
    this.children.form = new Form<FormProps>({
      class: 'auth',
      titleClass: 'auth__title',
      titleLabel: 'Регистрация',
      inputs: userFields,
      inputClass: 'auth__input',
      editing: false,
      emptyValues: true,
      btnClass: 'auth__button auth__button_margin',
      btnLabel: 'Зарегистрироваться',
      btnType: 'submit',
      events: {
        submit: async (e?: Event) => {
          e?.preventDefault()
          await submit(((this.children.form as FormWrap).children.inputs as InputContainer[]), this.getContent(), this.onSignUp.bind(this), '.auth__form')
        }
      }
    })

    /* this.children.form = new Form({
      inputs: userFields,
      button: true,
      auth: true,
      editing: false,
      signin: true,
      classBtn: 'auth__button auth__button_margin',
      labelBtn: 'Зарегистрироваться',
      typeBtn: 'submit',
      events: {
        submit: async (e?: Event) => {
          e?.preventDefault()
          await submit(((this.children.form as FormWrap).children.inputs as InputContainer[]), this.getContent(), this.onSignUp.bind(this), '.auth__form')
        }
      }
    }) */

    /* this.children.inputs = userFields.map(input => {
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

    this.children.buttonSub = new Button({
      class: 'auth__button auth__button_margin',
      label: 'Зарегистрироваться',
      events: {
        click: (e?: Event) => {
          void submit(this.children.inputs, this.onSignUp.bind(this), e)
        }
      }
    }) */

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
