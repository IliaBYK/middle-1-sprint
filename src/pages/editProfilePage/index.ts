/* eslint-disable array-callback-return */
import Block from '../../utils/Block'
import template from './editProfilePage.hbs'
import { Button } from '../../components/button/index'
import { Title } from '../../components/title/index'
// import { Imagine } from '../../components/imagine/index'
import { EditAvatarContainer } from '../../components/editAvatarContainer/index'
import { submit, validation } from '../../utils/validation'
import { InputContainer } from '../../components/inputContainer/index'
import Router from '../../utils/Router'
import { type User } from '../../api/user-api'
import { type Input } from '../../components/input/index'
import store, { connect } from '../../utils/Store'
import ChangeController, { type ChangeData } from '../../controllers/ChangeController'
// import { Union } from '../../images'
// import AuthController, { type ChangeData } from '../../controllers/AuthController'

const InputNames: Record<string, string> = {
  email: 'Почта',
  login: 'Логин',
  first_name: 'Имя',
  second_name: 'Фамилия',
  display_name: 'Имя в чате',
  phone: 'Телефон'
}

const userFields = ['email', 'login', 'first_name', 'second_name', 'display_name', 'phone'] as Array<keyof EditProfileProps>

interface EditProfileProps extends User {}
class EditProfile extends Block<EditProfileProps> {
  async submitChange (): Promise<void> {
    const element = this.getContent()

    const inputs = element?.querySelectorAll('.edit__input')

    const data: Record<string, unknown> = {}

    Array.from(inputs!).forEach((input) => {
      data[(input as HTMLInputElement).name] = (input as HTMLInputElement).value
    })

    // console.log(data)

    // this.setProps(data)

    // console.log(this.props)
    await ChangeController.changeUser(data as unknown as ChangeData)
  }

  init (): void {
    this.children.avatar = new EditAvatarContainer({
      avatar: this.props.avatar,
      events: {
        click: () => {}
      }
    })

    this.children.title = new Title({
      class: 'edit__title',
      label: this.props.first_name
    })

    /* this.children.imagine = new Imagine({
      src: this.props.avatar || Union,
      class: 'edit__avatar',
      alt: 'Аватар пользователя'
    }) */

    this.children.buttonToChats = new Button({
      class: 'edit__button',
      events: {
        click: () => { Router.back() }
      }
    })

    /*
    class
    label
    name
    type
    */

    this.children.inputs = userFields.map(inputName => {
      return new InputContainer({
        name: inputName as string,
        label: InputNames[inputName],
        class: 'edit__input',
        edit: true,
        required: true,
        events: {
          blur: () => validation(this.children.inputs)
        }
      })
    });

    (this.children.inputs as InputContainer[]).map((inputWrap: InputContainer) => {
      (inputWrap.children.input as Input).setValue((this.props as unknown as Record<string, string>)[(inputWrap.children.input as Input).getName()])
    });

    (this.children.avatar as EditAvatarContainer).setProps({
      avatar: `ya-praktikum.tech/api/v2/resources${this.props.avatar}`
    })

    this.children.changeData = new Button({
      class: 'auth__button edit__submit-btn_password edit__submit-btn',
      label: 'Cохранить',
      type: 'submit',
      events: {
        click: (e?: Event) => {
          void submit(this.children.inputs, this.submitChange.bind(this), e)
        }
      }
    })

    Object.entries(this.children).filter(([key, value]) => {
      // console.log(this.props)
      this.props.display_name = this.props.first_name + ' ' + this.props.second_name;
      (this.children.title as Title).setProps({ label: store.getState().currentUser?.first_name })
      if (value instanceof InputContainer) {
        (value.children.input as Input).setValue((this.props as unknown as Record<string, string>)[key] + '')
      } else return value
      // return value instanceof InputContainer
    })
  }

  protected componentDidUpdate (oldProps: EditProfileProps, newProps: EditProfileProps): boolean {
    if (!oldProps && !newProps) return false;
    (this.children.inputs as InputContainer[]).map((inputWrap) => {
      ((inputWrap).children.input as Input).setValue((newProps as unknown as Record<string, string>)[inputWrap.getName()] + '')
    });

    (this.children.avatar as EditAvatarContainer).setProps({
      avatar: `https://ya-praktikum.tech/api/v2/resources${newProps.avatar}`
    })

    return true
  }

  getInputs (): Array<Block<any> | Array<Block<any>>> {
    return Object
      .values(this.children)
      .filter(el => el instanceof InputContainer)
  }

  render (): DocumentFragment {
    return this.compile(template, this.props)
  }
}

const connectUser = connect((state) => ({ ...state.currentUser }))

export const EditProfilePage = connectUser(EditProfile as typeof Block)
