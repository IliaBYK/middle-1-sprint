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
import ChatsController from '../../controllers/ChatsController'
import { type InputContainer } from '../inputContainer'
import Popup from '../popup'
import { type ChatInfo } from '../../api/chats-api'
import { RESOURCES_URL } from '../../utils/constants'
import { Form, type FormWrap } from '../form'

interface ChatProps {
  chats: ChatInfo[]
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

    this.children.popup = new Popup({
      addUser: true,
      onClick: async (value: number) => { await ChatsController.addUserToChat(this.props.selectedChat as number, value) }
    })

    this.children.attachBtn = new Button({
      class: 'chats__attach-btn',
      events: {
        click: () => { this.toggleClass((this.children.tabMedia as Tab), 'tab_bottom') }
      }
    })

    this.children.form = new Form({
      inputs: ['message'],
      button: false,
      emptyValues: true,
      events: {
        submit: (e?: Event) => {
          e?.preventDefault()
        }
      }
    })

    this.children.sendBtn = new Button({
      class: 'chats__send-btn',
      type: 'button',
      events: {
        click: () => {
          const input = (this.children.form as FormWrap).children.inputs as InputContainer[]
          const message = input[0].getValue()

          if (!message) {
            input[0].setProps({ error: 'Введите сообщение' })
            return
          }

          input[0].setValue('')

          input[0].setProps({ error: '' })

          MessagesController.sendMessage(this.props.selectedChat!, message)
        }
      }
    })

    this.children.imagineProfile = new Imagine({
      class: 'chats__img chats__img_place_header button',
      alt: 'Аватар собеседника',
      src: this.props.chats.find(data => data.id === this.props.selectedChat)?.avatar
        ? `${RESOURCES_URL}${this.props.chats.find(data => data.id === this.props.selectedChat)?.avatar}`
        : avatar
    })

    this.children.title = new Title({
      class: 'chats__name',
      label: ''
    })

    this.children.buttonUsers = new Button({
      class: 'chats__menu',
      events: {
        click: () => { this.toggleClass((this.children.tabUsers as Tab), 'tab_top') }
      }
    })

    this.children.tabUsers = new Tab({
      class: 'tab_top',
      users: true,
      addUser: () => {
        (this.children.popup as Popup).setProps({
          class: 'popup_opened',
          deleteUser: false
        })
      },
      deleteUser: async () => {
        (this.children.popup as Popup).setProps({
          class: 'popup_opened',
          deleteUser: true
        })
      },
      addFile: async () => { },
      addMedia: async () => { },
      addLocation: async () => { }
    })

    this.children.tabMedia = new Tab({
      class: 'tab_bottom',
      users: false,
      addUser: () => { },
      deleteUser: async () => { },
      addFile: async () => { },
      addMedia: async () => { },
      addLocation: async () => { }
    })
  }

  toggleClass (block: Tab, className: string): void {
    if (block.element?.classList.contains('tab_visible')) {
      block.setProps({ class: `${className}` })
    } else block.setProps({ class: `${className} tab_visible` })
  }

  private createMessages (props: ChatProps): any {
    return props.messages.map(data => {
      return new Message({
        content: data.content,
        isRead: data.is_read,
        time: data.time?.slice(0, 10),
        isUser: props.userId === data.user_id
      })
    })
  }

  /* `${RESOURCES_URL}${data.avatar}` */

  protected componentDidUpdate (oldProps: ChatProps, newProps: ChatProps): boolean {
    if (!oldProps && !newProps) return false
    this.children.messages = this.createMessages(newProps);

    (this.children.imagineProfile as Imagine).setProps({
      src: newProps.chats.find(data => data.id === newProps.selectedChat)?.avatar
        ? `${RESOURCES_URL}${newProps.chats.find(data => data.id === newProps.selectedChat)?.avatar}`
        : avatar
    })

    return true
  }

  render (): DocumentFragment {
    return this.compile(template, this.props)
  }
}

const withChat = connect(state => {
  const selectedChatId = state.selectedChat

  if (!selectedChatId) {
    return {
      chats: state.chats || [{}],
      messages: [{}],
      selectedChat: undefined,
      userId: state.currentUser?.id
    }
  }

  return {
    chats: state.chats,
    messages: state.messages?.[selectedChatId] || [{}],
    selectedChat: state.selectedChat,
    userId: state.currentUser?.id
  }
})

export const ChatsMain = withChat(Chats as typeof Block)
