/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable array-callback-return */
import { connect } from './../../utils/Store'
import Block from '../../utils/Block'
import template from './Profile.hbs'
import { type User } from '../../api/user-api'
import { Button } from '../../components/button/index'
import { Title } from '../../components/title/index'
import { EditAvatarContainer } from '../../components/editAvatarContainer/index'
import { InputContainer } from '../../components/inputContainer/index'
import Router from '../../utils/Router'
import { type Input } from '../../components/input/index'
import Popup from '../../components/popup/index'
import AuthController from '../../controllers/AuthController'
import ChangeController from '../../controllers/ChangeController'
import { RESOURCES_URL } from '../../utils/constants'

const InputNames: Record<string, string> = {
  email: 'Почта',
  login: 'Логин',
  first_name: 'Имя',
  second_name: 'Фамилия',
  display_name: 'Имя в чате',
  phone: 'Телефон'
}

const userFields = ['email', 'login', 'first_name', 'second_name', 'display_name', 'phone'] as Array<keyof ProfileProps>

interface ProfileProps extends User {}
class Profile extends Block<ProfileProps> {
  async submitChange (): Promise<void> {
    const element = this.getContent()

    const input = element?.querySelector('.popup__input')

    const value: File = (((input as HTMLInputElement).files![0]) as unknown as File)

    const data: File = value

    if (value) {
      await ChangeController.ChangeAvatar(data).then(() => {
        (this.children.popup as Popup).setProps({
          isLoaded: true,
          class: ''
        })
      })
    } else {
      (this.children.popup as Popup).setProps({
        isLoaded: false
      });
      ((this.children.popup as Popup).children as unknown as InputContainer).setProps({ error: 'Загрузите файл' })
    }
  }

  init (): void {
    this.children.avatar = new EditAvatarContainer({
      avatar: this.props.avatar,
      events: {
        click: () => { (this.children.popup as Popup).setProps({ class: 'popup_opened' }) }
      }
    })

    this.children.title = new Title({
      class: 'edit__title',
      label: this.props.first_name
    })

    this.children.buttonToChats = new Button({
      class: 'edit__button',
      events: {
        click: () => {
          Router.back()
        }
      }
    })

    this.children.popup = new Popup({
      addUser: false,
      onClick: this.submitChange.bind(this)
    })

    this.children.inputs = userFields.map(inputName => {
      return new InputContainer({
        name: inputName as string,
        label: InputNames[inputName],
        class: 'edit__input',
        edit: true,
        required: true,
        disabled: true
      })
    });

    (this.children.inputs as InputContainer[]).map((inputWrap: InputContainer) => {
      (inputWrap.children.input as Input).setValue((this.props as unknown as Record<string, string>)[(inputWrap.children.input as Input).getName()] + '')
    });

    (this.children.avatar as EditAvatarContainer).setProps({
      avatar: `${RESOURCES_URL}${this.props.avatar}`
    })

    this.children.changeData = new Button({
      class: 'edit__btn button',
      label: 'Изменить данные',
      events: {
        click: () => {
          Router.go('/settings/edit-profile')
        }
      }
    })

    this.children.changePassword = new Button({
      class: 'edit__btn button',
      label: 'Изменить пароль',
      events: {
        click: () => {
          Router.go('/settings/edit-password')
        }
      }
    })

    this.children.logout = new Button({
      class: 'edit__btn button',
      label: 'Выйти',
      events: {
        click: async () => { await AuthController.logout() }
      }
    })
  }

  protected componentDidUpdate (oldProps: ProfileProps, newProps: ProfileProps): boolean {
    if (!oldProps && !newProps) return false;
    (this.children.inputs as InputContainer[]).map((inputWrap) => {
      ((inputWrap).children.input as Input).setValue((newProps as unknown as Record<string, string>)[inputWrap.getName()] + '')
    });

    (this.children.avatar as EditAvatarContainer).setProps({
      avatar: `https://ya-praktikum.tech/api/v2/resources${newProps.avatar}`
    })

    return true
  }

  render (): DocumentFragment {
    return this.compile(template, this.props)
  }
}

const connectUser = connect((state) => ({ ...state.currentUser }))

export const ProfilePage = connectUser(Profile as typeof Block)
