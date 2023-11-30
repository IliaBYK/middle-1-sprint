/* eslint-disable array-callback-return */
import UserAPI from './../../api/UserApi'
import { connect } from './../../utils/Store'
import Block from '../../utils/Block'
import template from './Profile.hbs'
import { type User } from '../../api/UserApi'
import { Button } from '../../components/button/index'
import { Title } from '../../components/title/index'
import { Imagine } from '../../components/imagine/index'
import { EditAvatarContainer } from '../../components/editAvatarContainer/index'
import { submit, validation } from '../../utils/validation'
import { InputContainer } from '../../components/inputContainer'
// import AuthController from '../../controllers/AuthController'
import Router from '../../utils/Router'
// import { Link } from '../../components/link'
import { type Input } from '../../components/input'
// import { EditProfileBtns } from '../../components/editProfileBtns'
import Popup from '../../components/popup'
import ChangeController, { type ChangeData } from '../../controllers/ChangeController'
import AuthController from '../../controllers/AuthController'

interface ProfileProps extends User {
  editing: string
}
class Profile extends Block<ProfileProps> {
  async submitChange (e?: Event): Promise<void> {
    e?.preventDefault()
    const element = this.getContent()

    const inputs = element?.querySelectorAll('.edit__input')

    const data: Record<string, unknown> = {}

    Array.from(inputs!).forEach((input) => {
      data[(input as HTMLInputElement).name] = (input as HTMLInputElement).value
    })

    await ChangeController.changeUser(data as unknown as ChangeData)
  }

  init (): void {
    this.children.avatar = new EditAvatarContainer({
      events: {
        click: () => { (this.children.popup as Popup).setProps({ class: 'popup_opened' }) }
      }
    })

    this.children.title = new Title({
      class: 'edit__title',
      label: 'Андрей'
    })

    this.children.imagine = new Imagine({
      src: '../../images/Union.png',
      class: 'edit__avatar',
      alt: 'Аватар пользователя'
    })

    this.children.buttonToChats = new Button({
      class: 'edit__button',
      events: {
        click: () => {
          Router.back()
          // void this.getUser()
          // this.setValues()
        }
      }
    })

    this.children.popup = new Popup({})

    this.children.email = new InputContainer({
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
    })

    /* this.children.editBtns = new EditProfileBtns({
      submit: this.submitChange
    }) */

    this.children.changeDataBtn = new Button({
      class: 'auth__button edit__submit-btn_password edit__submit-btn',
      label: 'Cохранить',
      type: 'submit',
      events: {
        click: (e?: Event) => { void submit(this.children, this.submitChange.bind(this), e) }
      }
    })

    this.children.changeData = new Button({
      class: 'edit__btn button',
      label: 'Изменить данные',
      events: {
        click: () => {
          this.setProps({ editing: 'true' })
        }
      }
    })

    this.children.changePassword = new Button({
      class: 'edit__btn button',
      label: 'Изменить пароль',
      events: {
        click: () => {
          this.setProps({ editing: 'true' })
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

    Object.entries(this.children).filter(([key, value]) => {
      if (value instanceof InputContainer) {
        (value.children.input as Input).setProps({
          class: 'edit__input',
          edit: true,
          required: true,
          events: {
            blur: () => validation(this.children, (value.children.input as Input).getName())
          }
        })
      }
    })

    Object.entries(this.children).filter(([key, value]) => {
      this.props.display_name = this.props.first_name + ' ' + this.props.second_name;
      (this.children.title as Title).setProps({ label: this.props.first_name })
      if (value instanceof InputContainer) {
        (value.children.input as Input).setValue(this.props[key] + '')
      } else return value
      // return value instanceof InputContainer
    })
    /* this.getInputs().map((input) => {
      const nameInput: keyof ProfileProps = ((input as InputContainer).children.input as Input).getName();
      ((input as InputContainer).children.input as Input).setValue(this.props[nameInput])
      console.log(this.props)
    }) */
  }

  protected componentDidUpdate (oldProps: ProfileProps, newProps: ProfileProps): boolean {
    Object.entries(this.children).filter(([key, value]) => {
      if (newProps.display_name === null) newProps.display_name = newProps.first_name + ' ' + newProps.second_name;
      (this.children.title as Title).setProps({ label: newProps.first_name })
      if (value instanceof InputContainer) {
        (value.children.input as Input).setValue(newProps[key] + '')
      } else return value
      // return value instanceof InputContainer
    })

    return true
  }

  getInputs (): Array<Block<any> | Array<Block<any>>> {
    return Object
      .values(this.children)
      .filter(el => el instanceof InputContainer)
  }

  /* setValues (): void {
    this.getInputs().map((input) => {
      ((input as InputContainer).children.input as Input).setValue(this.props[((input as InputContainer).children.input as Input).getName()])
      console.log(((input as InputContainer).children.input as Input).getName())
    })
  } */

  async getUser (): Promise<User> {
    const user = await UserAPI.get()
    console.log(user)

    return user
  }

  render (): DocumentFragment {
    return this.compile(template, this.props)
  }
}

const connectUser = connect((state) => ({ ...state.currentUser }))

export const ProfilePage = connectUser(Profile as typeof Block)
