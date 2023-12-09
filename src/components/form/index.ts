/* eslint-disable array-callback-return */
import { type User } from '../../api/user-api'
import Block from '../../utils/Block'
import { connect } from '../../utils/Store'
import Search from '../chatsSearch'
import { EditProfileBtns } from '../editProfileBtns'
import { type Input } from '../input'
import { InputContainer } from '../inputContainer'
import template from './form.hbs'

interface FormProps {
  user: User
  editing?: boolean
  auth?: boolean
  signin?: boolean
  inputs: string[]
  button?: boolean
  disabled?: boolean
  emptyValues?: boolean
  classInput?: string
  events: {
    submit: (e?: Event) => void | Promise<void>
  }
}

const InputNames: Record<string, string> = {
  email: 'Почта',
  login: 'Логин',
  first_name: 'Имя',
  second_name: 'Фамилия',
  display_name: 'Имя в чате',
  phone: 'Телефон',
  password: 'Пароль',
  passwordAgain: 'Пароль еще раз',
  oldPassword: 'Старый пароль',
  newPassword: 'Новый пароль',
  newPasswordAgain: 'Повторите новый пароль',
  addChat: ''
}

export class FormWrap extends Block<FormProps> {
  constructor (props: FormProps) {
    super({
      ...props
    })
  }

  protected init (): void {
    this.children.inputs = this.props.inputs.map((inputName) => {
      return this.props.auth
        ? new InputContainer({
          class: 'auth__input',
          label: InputNames[inputName],
          name: inputName,
          type: inputName.includes('password') ? 'password' : 'text',
          required: true
        })
        : (inputName === 'message'
            ? new InputContainer({
              label: '',
              class: 'chats__input',
              classLabel: 'chats__label',
              placeholder: 'Сообщение',
              name: 'message'
            })
            : (inputName === 'search'
                ? new Search()
                : new InputContainer({
                  name: inputName,
                  label: InputNames[inputName],
                  class: this.props.classInput ?? 'edit__input',
                  edit: true,
                  type: inputName.includes('Password') ? 'password' : 'text',
                  required: true,
                  disabled: this.props.disabled
                })))
    })

    this.children.buttons = new EditProfileBtns({
      editing: this.props.editing,
      auth: this.props.auth
    });

    (this.children.inputs as InputContainer[])?.map((inputWrap: InputContainer) => {
      (inputWrap.children.input as Input)?.setValue(this.props.emptyValues ? '' : (this.props as unknown as Record<string, string>)[(inputWrap.children.input as Input).getName()])
    })
  }

  protected componentDidUpdate (oldProps: FormProps, newProps: FormProps): boolean {
    if (!oldProps && !newProps) return false;
    (this.children.inputs as InputContainer[])?.map((inputWrap) => {
      ((inputWrap).children.input as Input)?.setValue(this.props.emptyValues ? '' : (newProps as unknown as Record<string, string>)[inputWrap.getName()] + '')
    })

    return true
  }

  render (): DocumentFragment {
    return this.compile(template, { ...this.props })
  }
}

const connectUser = connect((state) => ({ ...state.currentUser }))

export const Form = connectUser(FormWrap as typeof Block)
