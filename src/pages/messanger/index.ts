/* eslint-disable @typescript-eslint/no-floating-promises */
import Block from '../../utils/Block'
import template from './messanger.hbs'
import { Sidebar } from '../../components/chatsSidebar/index'
import { ChatsMain } from '../../components/chatsMain'
import ChatsController from '../../controllers/ChatsController'

export class Messanger extends Block {
  init (): void {
    this.children.sidebar = new Sidebar({ isLoaded: false })
    this.children.chatsMain = new ChatsMain({})

    ChatsController.fetchChats().finally(() => {
      (this.children.sidebar as Block).setProps({ isLoaded: true })
    })
  }

  render (): DocumentFragment {
    return this.compile(template, this.props)
  }
}
