/* eslint-disable array-callback-return */
import { connect } from './../../utils/Store'
import Block from '../../utils/Block'
import template from './Profile.hbs'
import { type User } from '../../api/user-api'
import { Button } from '../../components/button/index'
import { Title } from '../../components/title/index'
import { Imagine } from '../../components/imagine/index'
import { EditAvatarContainer } from '../../components/editAvatarContainer/index'
import { InputContainer } from '../../components/inputContainer/index'
import Router from '../../utils/Router'
import { type Input } from '../../components/input/index'
import Popup from '../../components/popup/index'
import AuthController from '../../controllers/AuthController'
import { Union } from '../../images/index'

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
  init (): void {
    this.children.avatar = new EditAvatarContainer({
      events: {
        click: () => { (this.children.popup as Popup).setProps({ class: 'popup_opened' }) }
      }
    })

    this.children.title = new Title({
      class: 'edit__title',
      label: this.props.first_name
    })

    this.children.imagine = new Imagine({
      src: this.props.avatar || Union,
      class: 'edit__avatar',
      alt: 'Аватар пользователя'
    })

    this.children.buttonToChats = new Button({
      class: 'edit__button',
      events: {
        click: () => {
          Router.back()
        }
      }
    })

    this.children.popup = new Popup({})

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
      (inputWrap.children.input as Input).setValue(this.props[(inputWrap.children.input as Input).getName()] + '')
    })

    /* this.children.email = new InputContainer({
      label: 'Почта',
      class: 'edit__input',
      name: 'email',
      type: 'email',
      edit: true
    })

    this.children.login = new InputContainer({
      label: 'Логин',
      name: 'login',
      type: 'text',
      edit: true
    })

    this.children.first_name = new InputContainer({
      label: 'Имя',
      name: 'first_name',
      type: 'text',
      edit: true
    })

    this.children.second_name = new InputContainer({
      label: 'Фамилия',
      name: 'second_name',
      type: 'text',
      edit: true
    })

    this.children.display_name = new InputContainer({
      label: 'Имя в чате',
      name: 'display_name',
      type: 'text',
      edit: true
    })

    this.children.phone = new InputContainer({
      label: 'Телефон',
      name: 'phone',
      type: 'tel',
      edit: true
    }) */

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
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        click: async () => { await AuthController.logout() }
      }
    })

    /* Object.entries(this.children).filter(([key, value]) => {
      if (key) { key }
      if (value instanceof InputContainer) {
        value.setProps({ disabled: true });
        (value.children.input as Input).setProps({
          class: 'edit__input',
          edit: true,
          required: true,
          disabled: true
        })
      }
    }) */

    /* Object.entries(this.children).filter(([key, value]) => {
      this.props.display_name = this.props.first_name + ' ' + this.props.second_name;
      (this.children.title as Title).setProps({ label: this.props.first_name })
      if (value instanceof InputContainer) {
        (value.children.input as Input).setValue(this.props[key] + '')
      } else return value
    }) */
    /* this.getInputs().map((input) => {
      const nameInput: keyof ProfileProps = ((input as InputContainer).children.input as Input).getName();
      ((input as InputContainer).children.input as Input).setValue(this.props[nameInput])
      console.log(this.props)
    }) */
  }

  protected componentDidUpdate (oldProps: ProfileProps, newProps: ProfileProps): boolean {
    if (!oldProps && !newProps) return false;
    (this.children.inputs as InputContainer[]).map((inputWrap) => {
      ((inputWrap).children.input as Input).setValue(newProps[inputWrap.getName()] + '')
    })

    return true
  }

  /* getInputs (): Array<Block<any> | Array<Block<any>>> {
    return Object
      .values(this.children)
      .filter(el => el instanceof InputContainer)
  } */

  /* setValues (): void {
    this.getInputs().map((input) => {
      ((input as InputContainer).children.input as Input).setValue(this.props[((input as InputContainer).children.input as Input).getName()])
      console.log(((input as InputContainer).children.input as Input).getName())
    })
  } */

  /* async getUser (): Promise<User> {
    const user = await UserAPI.get()
    console.log(user)

    return user
  } */

  render (): DocumentFragment {
    return this.compile(template, this.props)
  }
}

const connectUser = connect((state) => ({ ...state.currentUser }))

export const ProfilePage = connectUser(Profile as typeof Block)
