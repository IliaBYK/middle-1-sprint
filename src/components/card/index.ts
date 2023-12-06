/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import Block from '../../utils/Block'
import template from './card.hbs'
import { type ChatInfo } from '../../api/chats-api'
import { connect } from '../../utils/Store'

interface ChatProps {
  id: number
  title: string
  unread_count: number
  selectedChat: ChatInfo
  events: {
    click: () => void
  }
}

interface cardProps extends ChatProps {
  src: string
  name: string
  text: string
  time: string
}

export class CardWrap extends Block {
  constructor (props: cardProps) {
    super({
      ...props
    })
  }

  protected render (): DocumentFragment {
    return this.compile(template, { ...this.props, isSelected: this.props.id === this.props.selectedChat?.id })
  }
}

export const withSelectedChat = connect(state => ({ selectedChat: (state.chats || []).find(({ id }) => id === state.selectedChat) }))

export const Card = withSelectedChat(CardWrap as typeof Block)
