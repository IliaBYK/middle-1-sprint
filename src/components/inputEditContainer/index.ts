import Block from '../../utils/Block'
import template from './inputEditContainer.hbs'
import { Input } from '../input'

interface InputProps {
  name: string
  label: string
  class?: string
  error?: string
  type: string
  required: boolean
  identificator?: string
  events?: {
    blur?: (e?: Event) => void
  }
}

export class InputEdit extends Block<InputProps> {
  constructor (props: InputProps) {
    super({ ...props })
  }

  init (): void {
    this.children.input = new Input({
      label: this.props.label,
      name: this.props.name,
      type: this.props.type,
      class: this.props.class,
      events: this.props.events,
      required: this.props.required
    })
  }

  validation (): boolean {
    return (this.children.input as Input).validation()
  }

  getValue (): string {
    return (this.children.input as Input).getValue()
  }

  getName (): string {
    return (this.children.input as Input).getName()
  }

  render (): DocumentFragment {
    return this.compile(template, { ...this.props })
  }
}
