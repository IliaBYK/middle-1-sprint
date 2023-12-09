/* eslint-disable array-callback-return */
import Block from '../../utils/Block'
import template from './editProfilePage.hbs'
import { Button } from '../../components/button/index'
import { Title } from '../../components/title/index'
// import { Imagine } from '../../components/imagine/index'
import { EditAvatarContainer } from '../../components/editAvatarContainer/index'
import { submit } from '../../utils/validation'
import { InputContainer } from '../../components/inputContainer/index'
import Router from '../../utils/Router'
import { type User } from '../../api/user-api'
// import { type Input } from '../../components/input/index'
import /* store, */ { connect } from '../../utils/Store'
import ChangeController, { type ChangeData } from '../../controllers/ChangeController'
import { RESOURCES_URL } from '../../utils/constants'
import { Form, type FormWrap } from '../../components/form'
// import { Union } from '../../images'
// import AuthController, { type ChangeData } from '../../controllers/AuthController'

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

    /* this.children.inputs = userFields.map(inputName => {
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
    }); */

    this.children.form = new Form({
      inputs: userFields,
      button: true,
      auth: false,
      editing: true,
      signin: false,
      disabled: false,
      events: {
        submit: async (e?: Event) => {
          e?.preventDefault()
          await submit(((this.children.form as FormWrap).children.inputs as InputContainer[]), this.getContent(), this.submitChange.bind(this), '.edit__form')
        }
      }
    });

    (this.children.avatar as EditAvatarContainer).setProps({
      avatar: `ya-praktikum.tech/api/v2/resources${this.props.avatar}`
    })

    /* Object.entries(this.children).filter(([key, value]) => {
      // console.log(this.props)
      this.props.display_name = this.props.first_name + ' ' + this.props.second_name;
      (this.children.title as Title).setProps({ label: store.getState().currentUser?.first_name })
      if (value instanceof InputContainer) {
        (value.children.input as Input).setValue((this.props as unknown as Record<string, string>)[key] + '')
      } else return value
      // return value instanceof InputContainer
    }) */
  }

  protected componentDidUpdate (oldProps: EditProfileProps, newProps: EditProfileProps): boolean {
    if (!oldProps && !newProps) return false;

    (this.children.avatar as EditAvatarContainer).setProps({
      avatar: `${RESOURCES_URL}${newProps.avatar}`
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
