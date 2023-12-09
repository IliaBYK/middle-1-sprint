/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import Block from '../../utils/Block'
import template from './sidebar.hbs'
import { type ChatInfo } from '../../api/chats-api'
import ChatsController from '../../controllers/ChatsController'
import { Card } from '../card/index'
import { Link } from '../link'
import { connect } from '../../utils/Store'
import { Union } from '../../images'
import { Button } from '../button'
import TabAdd from '../tabForAddChat'
import { RESOURCES_URL } from '../../utils/constants'
import { Form } from '../form'

interface SideBarProps {
  chats: ChatInfo[]
  isLoaded: boolean
}

class SidebarWrap extends Block<SideBarProps> {
  protected async componentDidMount (): Promise<void> {
    super.componentDidMount()

    await ChatsController.fetchChats()
  }

  init (): void {
    this.children.cards = this.createCards(this.props)

    this.children.button = new Link({
      class: 'chats__profile button',
      label: 'Профиль',
      to: '/settings',
      content: true
    })

    this.children.buttonAddChat = new Button({
      class: 'chats__add-chat-btn auth__button',
      label: 'Создать чат',
      events: {
        click: () => { this.toggleClass((this.children.tabForAddChat as TabAdd), 'tab-add') }
      }
    })

    this.children.tabForAddChat = new TabAdd({})

    this.children.search = new Form({
      inputs: ['search'],
      button: false,
      emptyValues: true,
      classInput: 'chats__search',
      events: {
        submit: (e?: Event) => {
          e?.preventDefault()
        }
      }
    })
  }

  toggleClass (block: TabAdd, className: string): void {
    if (block.element?.classList.contains('tab_visible')) {
      block.setProps({ class: `${className}` })
    } else block.setProps({ class: `${className} tab_visible` })
  }

  private createCards (props: SideBarProps): any {
    return props.chats.map(data => {
      return new Card({
        src: data.avatar ? `${RESOURCES_URL}${data.avatar}` : Union,
        name: data.title,
        text: data.last_message?.content || '',
        time: data.last_message?.time.slice(0, 10) || '', // позже отфарматирую дату в нормальный вид
        unread_count: data.unread_count,
        events: {
          click: () => {
            ChatsController.selectChat(data.id)
            console.log(data.avatar)
          }
        }
      })
    })
  }

  protected componentDidUpdate (oldProps: SideBarProps, newProps: SideBarProps): boolean {
    if (!oldProps && !newProps) return false
    this.children.cards = this.createCards(newProps)

    return true
  }

  render (): DocumentFragment {
    return this.compile(template, { ...this.props })
  }
}

const withChats = connect((state) => ({ chats: [...state.chats || [{}]] }))

export const Sidebar = withChats(SidebarWrap as typeof Block)
