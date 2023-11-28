import { InputContainer } from './../inputContainer/index'
import Block from '../../utils/Block'
import { Title } from '../title'
import template from './popup.hbs'
import { Button } from '../button'

interface PopupProps {
  class?: string
  error?: string
  isLoaded?: boolean
  addUser?: boolean
  // onClick: () => void | Promise<void>
  events?: {
    click: () => void | Promise<void>
  }
}

class Popup extends Block<PopupProps> {
  constructor (props: PopupProps) {
    super({
      ...props
    })
  }

  protected init (): void {
    this.children.title = new Title({
      class: this.props.error ? 'popup__title popup__title_error' : 'popup__title',
      label: this.props.addUser ? 'Добавить пользователя' : (this.props.error ? 'Ошибка, попробуйте ещё раз' : (this.props.isLoaded ? 'Файл загружен' : 'Загрузите файл'))
    })

    this.children.input = this.props.addUser
      ? new InputContainer({
        name: 'login',
        label: 'Логин',
        type: 'text'
      })
      : new InputContainer({
        name: 'file',
        type: 'file',
        class: 'popup__input',
        label: 'Выбрать файл на компьютере',
        classLabel: 'popup__label button'
        // label: ''
        // hidden: 'hidden'
      })

    this.children.button = new Button({
      class: 'popup__button',
      type: 'submit',
      label: this.props.addUser ? 'Добавить' : 'Поменять',
      events: {
        click: () => {}
      }
    })
  }

  render (): DocumentFragment {
    return this.compile(template, this.props)
  }
}

export default Popup
