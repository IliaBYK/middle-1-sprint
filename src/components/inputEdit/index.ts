import Block from '../../utils/Block'
import template from './inputEdit.hbs'

interface InputProps {
  class?: string
  label?: string
  name?: string
  type?: string
}

export class InputEdit extends Block<InputProps> {
  constructor (props?: InputProps) {
    super({ ...props })
  }

  render (): DocumentFragment {
    return this.compile(template, { ...this.props })
  }
}
