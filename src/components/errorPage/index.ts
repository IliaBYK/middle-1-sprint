import Block from '../../utils/Block'
import { render } from '../../utils/render'
import { Button } from '../button'
import template from './errorPage.hbs'

interface ErrorProps {
  code: string
  message: string
}

export class ErrorPage extends Block<ErrorProps> {
  constructor (props: ErrorProps) {
    super({ ...props })
  }

  init (): void {
    this.children.buttonBack = new Button({
      class: 'errorPage__link',
      label: 'Назад к чатам',
      events: {
        click: () => { render('chats') }
      }
    })
  }

  render (): DocumentFragment {
    return this.compile(template, { ...this.props })
  }
}
