import Block from '../../utils/Block'
import template from './message.hbs'

interface messageProps {
  isUser?: boolean
  text?: string
  time?: string
}
export class Message extends Block<messageProps> {
  protected render (): DocumentFragment {
    return this.compile(template, { ...this.props })
  }
}
