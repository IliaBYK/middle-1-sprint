/* eslint-disable array-callback-return */
import Block from '../../utils/Block'
import template from './editProfilePage.hbs'
import { Button } from '../../components/button/index'
import { Title } from '../../components/title/index'
import { EditAvatarContainer } from '../../components/editAvatarContainer/index'
import { submit } from '../../utils/validation'
import { type InputContainer } from '../../components/inputContainer/index'
import Router from '../../utils/Router'
import { type User } from '../../api/user-api'
import { connect } from '../../utils/Store'
import ChangeController, { type ChangeData } from '../../controllers/ChangeController'
import { RESOURCES_URL } from '../../utils/constants'
import { Form, type FormProps, type FormWrap } from '../../components/form/index'

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

    this.children.form = new Form<FormProps>({
      class: 'edit',
      inputs: userFields,
      disabled: false,
      inputClass: 'edit__input',
      editing: true,
      emptyValues: false,
      btnClass: 'auth__button edit__submit-btn_password edit__submit-btn',
      btnLabel: 'Cохранить',
      btnType: 'submit',
      events: {
        submit: async (e?: Event) => {
          e?.preventDefault()
          await submit(((this.children.form as FormWrap).children.inputs as InputContainer[]), this.getContent(), this.submitChange.bind(this), '.edit__form')
        }
      }
    });

    (this.children.avatar as EditAvatarContainer).setProps({
      avatar: `${RESOURCES_URL}${this.props.avatar}`
    })
  }

  protected componentDidUpdate (oldProps: EditProfileProps, newProps: EditProfileProps): boolean {
    if (!oldProps && !newProps) return false;

    (this.children.avatar as EditAvatarContainer).setProps({
      avatar: `${RESOURCES_URL}${newProps.avatar}`
    })

    return true
  }

  render (): DocumentFragment {
    return this.compile(template, this.props)
  }
}

const connectUser = connect((state) => ({ ...state.currentUser }))

export const EditProfilePage = connectUser(EditProfile as typeof Block)
