/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import Block from '../../utils/Block'
import template from './sidebar.hbs'
import Search from '../chatsSearch/index'
import { type ChatInfo } from '../../api/chats-api'
import ChatsController from '../../controllers/ChatsController'
import { Card } from '../card/index'
import { Link } from '../link'
import { connect } from '../../utils/Store'

interface SideBarProps {
  chats: ChatInfo[]
  isLoaded: boolean
}

class SidebarWrap extends Block<SideBarProps> {
  constructor (props: SideBarProps) {
    super({ ...props })
  }

  init (): void {
    this.children.cards = this.createCards(this.props)

    this.children.button = new Link({
      class: 'chats__profile button',
      label: 'Профиль',
      to: '/settings',
      content: true
    })

    this.children.search = new Search()
  }

  private createCards (props: SideBarProps): any {
    return props.chats.map(data => {
      return new Card({
        ...data,
        events: {
          click: () => {
            ChatsController.selectChat(data.id)
          }
        }
      })
    })
  }

  render (): DocumentFragment {
    return this.compile(template, { ...this.props })
  }
}

const withChats = connect((state) => ({ chats: [...state.chats || []] }))

export const Sidebar = withChats(SidebarWrap as typeof Block)
