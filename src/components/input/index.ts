import Block from '../../utils/Block'
import template from './input.hbs'
import { functions } from '../../utils/validation'

interface InputProps {
  label?: string
  type?: string
  class?: string
  name: string
  for?: string
  placeholder?: string
  required?: boolean
  hidden?: string
  events?: {
    blur?: (e?: Event) => void
  }
}

export class Input extends Block {
  constructor (props: InputProps) {
    super({
      ...props
    })
  }

  validation (): boolean {
    return functions[this.props.name](this.getValue())
  }

  setValue (value: string): void {
    (this.element as HTMLInputElement).value = value
  }

  getName (): string {
    return (this.element as HTMLInputElement).name
  }

  getValue (): string {
    return (this.element as HTMLInputElement).value
  }

  render (): DocumentFragment {
    return this.compile(template, this.props)
  }
}
