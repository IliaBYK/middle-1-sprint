import { Input } from '../input/index'
import Block from '../../utils/Block'
import template from './inputContainer.hbs'
import errors from '../../utils/errors'

interface InputProps {
  name: string
  label: string
  class?: string
  classLabel?: string
  error?: string
  type?: string
  required?: boolean
  edit?: boolean
  identificator?: string
  placeholder?: string
  disabled?: boolean
  events?: {
    blur?: (e?: Event) => void
  }
}

export class InputContainer extends Block<InputProps> {
  constructor (props: InputProps) {
    super({ ...props })
  }

  init (): void {
    this.children.input = new Input({
      label: this.props.label,
      name: this.props.name,
      type: this.props.type,
      class: this.props.class,
      required: this.props.required,
      disabled: this.props.disabled,
      placeholder: this.props.placeholder,
      events: {
        blur: () => { this.validation() }
      }
    })
  }

  validation (): void {
    if (!(this.children.input as Input).validation()) {
      this.setProps({ error: errors[this.getName()] })
    }
  }

  getValue (): string {
    return (this.children.input as Input).getValue()
  }

  setValue (data: string): void {
    (this.children.input as Input).setValue(data)
  }

  getName (): string {
    return (this.children.input as Input).getName()
  }

  render (): DocumentFragment {
    return this.compile(template, { ...this.props })
  }
}
