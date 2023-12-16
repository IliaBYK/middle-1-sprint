import Block from '../../utils/Block'
import template from './tab.hbs'
import { Button } from '../button'
import { Title } from '../title'
import ChatsController from '../../controllers/ChatsController'
import { InputContainer } from '../inputContainer'
import { type Input } from '../input'

interface TabProps {
  class?: string
}

class TabAdd extends Block<TabProps> {
  constructor (props: TabProps) {
    super({
      ...props
    })
  }

  protected init (): void {
    this.children.title = new Title({
      class: 'tab-add__title',
      label: 'Введите название чата'
    })

    this.children.input = new InputContainer({
      label: 'Название',
      name: 'addChat',
      class: 'tab-add__input',
      classLabel: 'tab-add__label',
      events: {
        blur: () => {
          (this.children.input as InputContainer).setProps({
            error: (((this.children.input as InputContainer).children.input as Input).getContent() as HTMLInputElement).validationMessage
          })
        }
      }
    })

    this.children.button = new Button({
      class: 'tab-add__button',
      label: 'Создать',
      events: {
        click: async () => {
          if (!(((this.children.input as InputContainer).children.input as Input).getContent() as HTMLInputElement).validationMessage) {
            this.setProps({ class: '' })
            await ChatsController.create((this.children.input as InputContainer).getValue())
          } else (this.children.input as InputContainer).validation()
        }
      }
    })
  }

  render (): DocumentFragment {
    return this.compile(template, this.props)
  }
}

export default TabAdd
