import Block from '../../utils/Block'
import template from './tab.hbs'
import { Button } from '../button'
import { Imagine } from '../imagine'

interface TabProps {
  class?: string
  users?: boolean
}

class Tab extends Block<TabProps> {
  constructor (props: TabProps) {
    super({
      ...props
    })
  }

  protected init (): void {
    this.children.buttonAdd = new Button({
      label: 'Добавить пользователя',
      class: 'tab__button',
      content: new Imagine({
        class: 'tab__img',
        alt: 'Добавить пользователя',
        src: '../../images/addUser.svg'
      })
    })

    this.children.buttonDelete = new Button({
      label: 'Удалить пользователя',
      class: 'tab__button',
      content: new Imagine({
        class: 'tab__img',
        alt: 'Удалить пользователя',
        src: '../../images/deleteUser.svg'
      })
    })

    this.children.addMedia = new Button({
      label: 'Фото или видео',
      class: 'tab__button',
      content: new Imagine({
        class: 'tab__img',
        alt: 'Добавить фото или видео',
        src: '../../images/addMedia.svg'
      })
    })

    this.children.addFile = new Button({
      label: 'Файл',
      class: 'tab__button',
      content: new Imagine({
        class: 'tab__img',
        alt: 'Добавить файл',
        src: '../../images/addFile.svg'
      })
    })

    this.children.addLocation = new Button({
      label: 'Локация',
      class: 'tab__button',
      content: new Imagine({
        class: 'tab__img',
        alt: 'Добавить локацию',
        src: '../../images/addLocation.svg'
      })
    })
  }

  render (): DocumentFragment {
    return this.compile(template, this.props)
  }
}

export default Tab
