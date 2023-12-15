import Block from '../../utils/Block'
import { template } from './message'

interface messageProps {
  isUser?: boolean
  content?: string
  time?: string
  isRead: boolean
}
export class Message extends Block<messageProps> {
  protected render (): DocumentFragment {
    return this.compile(template, { ...this.props })
  }
}

/*
chat_id: 38122

content: "asd"

fil: null

id: 1

is_read : true

time: "2023-12-05T21:10:27+00:00"

type: "message"

user_id:1349268
 */
