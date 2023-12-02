import { chats } from '../../utils/chats'
import Block from '../../utils/Block'
import template from './chats.hbs'
import { Button } from '../../components/button/index'
import { Sidebar } from '../../components/chatsSidebar/index'
import Message from '../../components/message/index'
import { InputSearch } from '../../components/inputSearch/index'
import { Imagine } from '../../components/imagine'
import { Title } from '../../components/title'
import Tab from '../../components/tab'
import { connect } from '../../utils/Store'
import { type User } from '../../api/user-api'

interface chatProps {
  id?: number | string
  text?: string
  isOwner?: boolean
  time?: string
  class?: string
}

interface MessangerProps extends User {}
class Messanger extends Block<MessangerProps> {
  constructor (props: MessangerProps) {
    super({ ...props })
  }

  init (): void {
    this.children.messages = this.createMessages(chats)
    this.children.sidebar = new Sidebar()

    /* this.children.password = new Input({
      label: "Пароль",
      name: "password",
      type: "password",
      required: true
    }); */

    this.children.attachBtn = new Button({
      class: 'chats__attach-btn',
      events: {
        click: () => { this.toggleClass((this.children.tabMedia as Tab), 'tab_bottom') }
      }
    })

    this.children.input = new InputSearch({
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
          if (((this.children.input as Block).element as HTMLInputElement).value.trim().length === 0) {
            alert('Введите сообщение')
          }
        }
      }
    })

    this.children.imagineProfile = new Imagine({
      class: 'chats__img chats__img_place_header button',
      alt: 'Аватар собеседника',
      src: '../../images/avatar.png'
    })

    this.children.title = new Title({
      class: 'chats__name',
      label: this.props.first_name
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

  protected componentDidUpdate (oldProps: chatProps, newProps: chatProps): boolean {
    if (oldProps !== newProps) this.children.chats = this.createMessages(chats)

    return true
  }

  private createMessages (chats: chatProps[]): Message[] {
    return chats.map((data: chatProps | any) => {
      return new Message({ class: data.isOwner ? 'chats__message_user' : '', ...data })
    })
  }

  render (): DocumentFragment {
    return this.compile(template, this.props)
  }
}

const connectUser = connect((state) => ({ ...state.currentUser }))

export const Chats = connectUser(Messanger as typeof Block)
