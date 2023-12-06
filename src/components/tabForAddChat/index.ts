import Block from '../../utils/Block'
import template from './tab.hbs'
import { Button } from '../button'
import { Input } from '../input'
import { Title } from '../title'

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

    this.children.input = new Input({
      name: 'addChat',
      class: 'tab-add__input'
    })

    this.children.button = new Button({
      class: 'tab-add__button',
      label: 'Создать'
    })
  }

  render (): DocumentFragment {
    return this.compile(template, this.props)
  }
}

export default TabAdd
