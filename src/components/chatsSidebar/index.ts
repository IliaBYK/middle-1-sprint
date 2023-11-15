import Block from '../../utils/Block'
import template from './sidebar.hbs'
import { Button } from '../button'
import Search from '../chatsSearch'
import { Card } from '../card'
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
        click: () => { render('edit') }
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