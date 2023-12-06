import Block from '../../utils/Block'
import template from './button.hbs'

interface ButtonProps {
  content?: unknown
  label?: string
  type?: 'submit' | 'button'
  href?: string
  class?: string
  onClick?: (e?: Event) => void
  events?: {
    click: (e?: Event) => void | Promise<void>
  }
}

export class Button extends Block<ButtonProps> {
  constructor (props: ButtonProps) {
    super({ type: 'button', ...props })
  }

  render (): DocumentFragment {
    return this.compile(template, { ...this.props })
  }
}
