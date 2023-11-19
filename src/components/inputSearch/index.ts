import Block from '../../utils/Block'
import template from './inputSearch.hbs'

interface InputProps {
  class?: string
  placeholder?: string
  name?: string
  type?: string
  required: boolean
}

export class InputSearch extends Block<InputProps> {
  constructor (props: InputProps) {
    super({ ...props })
  }

  render (): DocumentFragment {
    return this.compile(template, { ...this.props })
  }
}
