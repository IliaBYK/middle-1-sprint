/* eslint-disable array-callback-return */
import { type User } from '../../api/user-api'
import Block from '../../utils/Block'
import { connect } from '../../utils/Store'
import { Button } from '../button'
import Search from '../chatsSearch'
import { type Input } from '../input'
import { InputContainer } from '../inputContainer'
import { Title } from '../title'
import template from './form.hbs'

export interface FormProps {
  class: string
  titleClass?: string
  titleLabel?: string
  user?: User
  editing?: boolean
  inputs: string[]
  inputType?: string
  disabled?: boolean
  emptyValues?: boolean
  btnClass?: string
  labelClass?: string
  btnLabel?: string
  btnType?: 'submit' | 'button'
  inputClass?: string
  placeholder?: string
  required?: boolean
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
  addChat: '',
  file: 'Выбрать файл на компьютере'
}

export class FormWrap extends Block<FormProps> {
  constructor (props: FormProps) {
    super({
      ...props
    })
  }

  protected init (): void {
    this.children.title = new Title({
      class: this.props.titleClass,
      label: this.props.titleLabel
    })

    this.children.inputs = this.props.inputs.map((inputName) => {
      const passwordExp = /^\w*password\w*$/gi
      return inputName === 'search'
        ? new Search()
        : new InputContainer({
          name: inputName,
          label: InputNames[inputName],
          placeholder: this.props.placeholder,
          class: this.props.inputClass,
          classLabel: this.props.labelClass,
          edit: this.props.editing,
          type: inputName.match(passwordExp) ? 'password' : this.props.inputType,
          required: this.props.required,
          disabled: this.props.disabled
        })
    })

    this.children.button = new Button({
      class: this.props.btnClass,
      label: this.props.btnLabel,
      type: this.props.btnType
    });

    (this.children.inputs as InputContainer[])?.map((inputWrap: InputContainer) => {
      (inputWrap.children.input as Input)?.setValue(this.props.emptyValues ? '' : (this.props as unknown as Record<string, string>)[(inputWrap.children.input as Input).getName()])
    })
  }

  protected componentDidUpdate (oldProps: FormProps, newProps: FormProps): boolean {
    if (!oldProps && !newProps) return false;
    (this.children.inputs as InputContainer[])?.map((inputWrap) => {
      inputWrap.setProps({
        placeholder: newProps.placeholder,
        type: newProps.inputType,
        required: newProps.required,
        disabled: newProps.disabled
      });

      ((inputWrap).children.input as Input)?.setValue(this.props.emptyValues ? '' : (newProps as unknown as Record<string, string>)[inputWrap.getName()] + '')
    });

    (this.children.button as Button).setProps({
      class: newProps.btnClass,
      label: newProps.btnLabel,
      type: newProps.btnType
    });

    (this.children.title as Title).setProps({
      class: newProps.titleClass,
      label: newProps.titleLabel
    })

    return true
  }

  render (): DocumentFragment {
    return this.compile(template, { ...this.props })
  }
}

const connectUser = connect((state) => ({ ...state.currentUser }))

export const Form = connectUser(FormWrap as typeof Block)
