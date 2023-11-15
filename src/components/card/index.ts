import Block from '../../utils/Block'
import template from './card.hbs'

interface cardProps {
  src: string
  name: string
  text: string
  time: string
  counter?: number
}

export class Card extends Block {
  constructor (props: cardProps) {
    super({
      ...props
    })
  }

  render (): DocumentFragment {
    return this.compile(template, this.props)
  }
}
