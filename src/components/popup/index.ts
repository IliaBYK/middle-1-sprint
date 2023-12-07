/* eslint-disable @typescript-eslint/no-misused-promises */
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
  onClick: (value: number) => Promise<void>
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
        type: 'text',
        class: 'auth__input'
      })
      : new InputContainer({
        name: 'file',
        type: 'file',
        class: 'popup__input',
        label: 'Выбрать файл на компьютере',
        classLabel: 'popup__label button'
      })

    const element = this.getContent()

    const input = element?.querySelector('.popup__input')
    const label = element?.querySelector('.popup__label');
    (input as HTMLInputElement)?.addEventListener('change', (e: Event) => {
      this.setProps({ isLoaded: true });
      (label as HTMLLabelElement).textContent = ((e.target as HTMLInputElement).files![0])?.name
    })

    this.children.button = new Button({
      class: 'popup__button',
      type: 'submit',
      label: this.props.addUser ? 'Добавить' : 'Поменять',
      events: {
        click: async () => {
          if (!(this.children.input as InputContainer).getValue()) {
            (this.children.input as InputContainer).setProps({ error: this.props.addUser ? 'Введите id пользователя' : 'Загрузите файл' })
          } else {
            (this.children.input as InputContainer).setProps({ error: '' })
            await this.props.onClick(+(this.children.input as InputContainer).getValue()).catch(() => {
              (this.children.input as InputContainer).setProps({ error: 'Произошла ошибка, возможно такого пользователя нет' })
            })
          }
        }
      }
    })

    this.children.closeBtn = new Button({
      label: 'X',
      class: 'popup__close-btn',
      events: {
        click: () => { this.setProps({ class: '' }) }
      }
    })
  }

  render (): DocumentFragment {
    return this.compile(template, this.props)
  }
}

export default Popup
