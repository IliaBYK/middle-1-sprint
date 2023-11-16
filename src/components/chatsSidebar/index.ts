import Block from '../../utils/Block'
import template from './sidebar.hbs'
import { Button } from '../button/index'
import Search from '../chatsSearch/index'
import { Card } from '../card/index'
import { cards } from '../../utils/cards'
import { render } from '../../utils/render'

export class Sidebar extends Block {
  constructor () {
    super({})
  }

  init (): void {
    this.children.cards = this.createCards()

    this.children.button = new Button({
      class: 'chats__profile',
      label: 'Профиль',
      content: true,
      type: 'button',
      events: {
        click: () => { render('profile') }
      }
    })

    this.children.search = new Search()
  }

  private createCards (): Card[] {
    return cards.map((data: any) => {
      return new Card({ ...data })
    })
  }

  render (): DocumentFragment {
    return this.compile(template, this.props)
  }
}
