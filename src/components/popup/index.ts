/* eslint-disable @typescript-eslint/no-misused-promises */
import Block from '../../utils/Block'
import template from './popup.hbs'
import { Button } from '../button'
import { Form, type FormWrap, type FormProps } from '../form'
import ChangeController from '../../controllers/ChangeController'
import { type InputContainer } from '../inputContainer'

interface PopupProps {
  class?: string
  error?: string
  isLoaded?: boolean
  addUser?: boolean
  deleteUser?: boolean
  editing?: boolean
  onClickAddUser: (value?: number) => Promise<void>
  onClickDeletedUser: (value?: number) => Promise<void>
  events?: {
    click: () => void | Promise<void>
  }
}

class Popup extends Block<PopupProps> {
  async submitChange (): Promise<void> {
    const element = this.getContent()

    const input = element?.querySelector('.popup__input')

    const value: File = (((input as HTMLInputElement).files![0]))

    const data: File = value

    if (value) {
      try {
        await ChangeController.ChangeAvatar(data)
        this.setProps({
          isLoaded: true,
          class: ''
        })
      } catch (error) {
        console.log(error)
      }
    } else {
      this.setProps({
        isLoaded: false
      });
      (this.children as unknown as InputContainer).setProps({ error: 'Загрузите файл' })
    }
  }

  protected init (): void {
    this.children.form = new Form <FormProps>({
      class: 'popup',
      titleClass: this.props.error ? 'popup__title popup__title_error' : 'popup__title',
      titleLabel: this.props.addUser ? (this.props.deleteUser ? 'Удалить пользователя' : 'Добавить пользователя') : (this.props.error ? 'Ошибка, попробуйте ещё раз' : (this.props.isLoaded ? 'Файл загружен' : 'Загрузите файл')),
      inputs: [this.props.addUser ? 'loginPopup' : 'file'],
      emptyValues: true,
      inputClass: this.props.addUser ? 'auth__input' : 'popup__input button',
      inputType: this.props.addUser ? 'text' : 'file',
      btnClass: 'popup__button',
      labelClass: this.props.addUser ? 'auth__label' : 'popup__label button',
      btnType: 'submit',
      editing: this.props.editing,
      btnLabel: this.props.addUser ? (this.props.deleteUser ? 'Удалить' : 'Добавить') : 'Поменять',
      events: {
        submit: this.props.addUser
          ? (this.props.deleteUser
              ? async (e?: Event) => {
                e?.preventDefault()
                await this.props.onClickDeletedUser()
              }
              : async (e?: Event) => {
                e?.preventDefault()
                await this.props.onClickAddUser()
              })
          : async (e?: Event) => {
            e?.preventDefault()
            await this.submitChange()
          }
      }
    })

    const element = this.getContent()

    const input = element?.querySelector('.popup__input');

    (input as HTMLInputElement)?.addEventListener('change', (e: Event) => {
      ((this.children.form as FormWrap).children.inputs as InputContainer[])[0].setProps({
        label: ((e.target as HTMLInputElement).files![0])?.name
      })
    })

    this.children.closeBtn = new Button({
      label: 'X',
      class: 'popup__close-btn',
      events: {
        click: () => { this.setProps({ class: '' }) }
      }
    })

    this.setProps({
      deleteUser: false
    })
  }

  protected componentDidUpdate (oldProps: PopupProps, newProps: PopupProps): boolean {
    if (!oldProps && !newProps) return false

    const element = this.getContent()

    const input = element?.querySelector('.popup__input');

    (input as HTMLInputElement)?.addEventListener('change', (e: Event) => {
      ((this.children.form as FormWrap).children.inputs as InputContainer[])[0].setProps({
        label: ((e.target as HTMLInputElement).files![0])?.name
      })
    });

    (this.children.form as FormWrap).setProps({
      labelClass: newProps.addUser ? 'popup__label' : 'popup__label',
      btnLabel: newProps.addUser ? (newProps.deleteUser ? 'Удалить' : 'Добавить') : 'Поменять',
      titleLabel: newProps.addUser ? (newProps.deleteUser ? 'Удалить пользователя' : 'Добавить пользователя') : (newProps.error ? 'Ошибка, попробуйте ещё раз' : (newProps.isLoaded ? 'Файл загружен' : 'Загрузите файл')),
      inputType: newProps.addUser ? 'text' : 'file'
    })

    return true
  }

  render (): DocumentFragment {
    return this.compile(template, this.props)
  }
}

export default Popup
