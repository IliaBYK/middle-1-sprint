import Block from '../../utils/Block'
import { template } from './imagine'

interface ImagineProps {
  src?: unknown
  alt?: string
  class?: string
}

export class Imagine extends Block<ImagineProps> {
  constructor (props?: ImagineProps) {
    super({ ...props })
  }

  render (): DocumentFragment {
    return this.compile(template, { ...this.props })
  }
}
