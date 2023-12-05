import MessagesController, { type Message as MessageInfo } from '../../controllers/MessageController'
import Block from '../../utils/Block'
import template from './chatsMain.hbs'
import { Button } from '../../components/button/index'
import { Imagine } from '../../components/imagine'
import { Title } from '../../components/title'
import Tab from '../../components/tab'
import { avatar } from '../../images'
import { connect } from '../../utils/Store'
import { Message } from '../message'
import { Input } from '../input'

interface ChatProps {
  messages: MessageInfo[]
  selectedChat: number | undefined
  userId: number
}

export class Chats extends Block<ChatProps> {
  constructor (props: ChatProps) {
    super({ ...props })
  }

  init (): void {
    this.children.messages = this.createMessages(this.props)

    this.children.attachBtn = new Button({
      class: 'chats__attach-btn',
      events: {
        click: () => { this.toggleClass((this.children.tabMedia as Tab), 'tab_bottom') }
      }
    })

    this.children.input = new Input({
      class: 'chats__input',
      placeholder: 'Сообщение',
      name: 'message',
      required: true
    })

    this.children.sendBtn = new Button({
      class: 'chats__send-btn',
      type: 'submit',
      events: {
        click: () => {
          const input = this.children.input as Input
          const message = input.getValue()

          input.setValue('')

          MessagesController.sendMessage(this.props.selectedChat!, message)
        }
      }
    })

    this.children.imagineProfile = new Imagine({
      class: 'chats__img chats__img_place_header button',
      alt: 'Аватар собеседника',
      src: avatar
    })

    this.children.title = new Title({
      class: 'chats__name',
      label: '123'
    })

    this.children.buttonUsers = new Button({
      class: 'chats__menu',
      events: {
        click: () => { this.toggleClass((this.children.tabUsers as Tab), 'tab_top') }
      }
    })

    this.children.tabUsers = new Tab({
      class: 'tab_top',
      users: true
    })

    this.children.tabMedia = new Tab({
      class: 'tab_bottom',
      users: false
    })
  }

  toggleClass (block: Tab, className: string): void {
    if (block.element?.classList.contains('tab_visible')) {
      block.setProps({ class: `${className}` })
    } else block.setProps({ class: `${className} tab_visible` })
  }

  private createMessages (props: ChatProps): any {
    return props.messages.map(data => {
      return new Message({ ...data, isUser: props.userId === data.user_id })
    })
  }

  render (): DocumentFragment {
    return this.compile(template, this.props)
  }
}

const withChat = connect(state => {
  const selectedChatId = state.selectedChat

  if (!selectedChatId) {
    return {
      messages: [],
      selectedChat: undefined,
      userId: state.currentUser?.id
    }
  }

  return {
    messages: state.messages?.[selectedChatId] || [],
    selectedChat: state.selectedChat,
    userId: state.currentUser?.id
  }
})

export const ChatsMain = withChat(Chats as typeof Block)
