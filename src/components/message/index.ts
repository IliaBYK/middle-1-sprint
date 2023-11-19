import Block from '../../utils/Block'
import template from './message.hbs'

interface messageProps {
  class?: string
  text: string
  time?: string
}
export default class Message extends Block {
  constructor (props: messageProps) {
    super({ ...props })
  }

  render (): DocumentFragment {
    return this.compile(template, this.props)
  }
}
