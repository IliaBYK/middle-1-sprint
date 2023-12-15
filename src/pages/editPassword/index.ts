import Block from '../../utils/Block'
import { template } from './editPassword'
import { Button } from '../../components/button/index'
import { EditAvatarContainer } from '../../components/editAvatarContainer/index'
import { submit } from '../../utils/validation'
import Router from '../../utils/Router'
import { type User } from '../../api/user-api'
import { connect } from '../../utils/Store'
import { RESOURCES_URL } from '../../utils/constants'
import { Form, type FormProps, type FormWrap } from '../../components/form/index'
import ChangeController, { type PasswordData } from '../../controllers/ChangeController'
import { type InputContainer } from '../../components/inputContainer/index'

/* const InputNames: Record<string, string> = {
  oldPassword: 'Старый пароль',
  newPassword: 'Новый пароль',
  newPasswordAgain: 'Повторите новый пароль'
} */

const userFields: string[] = ['oldPassword', 'newPassword', 'newPasswordAgain']

interface Props extends User {
  avatar: string
}
class EditPassword extends Block<Props> {
  constructor (props: Props) {
    super({ ...props })
  }

  async submitChange (): Promise<void> {
    const element = this.getContent()

    const inputs = element?.querySelectorAll('.edit__input')

    const data: Record<string, unknown> = {}

    Array.from(inputs!).forEach((input) => {
      data[(input as HTMLInputElement).name] = (input as HTMLInputElement).value
    })

    try {
      await ChangeController.ChangePassword(data as unknown as PasswordData)
      Router.go('/settings')
    } catch (e) {
      console.log(e)
    }
  }

  init (): void {
    this.children.avatar = new EditAvatarContainer({
      avatar: this.props.avatar,
      class: 'edit__avatar-container_place_password'
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
      inputType: 'password',
      editing: true,
      emptyValues: true,
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

    /* this.children.form = new Form({
      inputs: userFields,
      button: true,
      auth: false,
      editing: true,
      signin: true,
      emptyValues: true,
      classBtn: 'auth__button edit__submit-btn_password edit__submit-btn',
      labelBtn: 'Cохранить',
      typeBtn: 'submit',
      events: {
        submit: async (e?: Event) => {
          e?.preventDefault()
          await submit(((this.children.form as FormWrap).children.inputs as InputContainer[]), this.getContent(), this.submitChange.bind(this), '.edit__form')
        }
      }
    }); */

    (this.children.avatar as EditAvatarContainer).setProps({
      avatar: `${RESOURCES_URL}${this.props.avatar}`
    })

    /* this.children.oldPassword = new InputContainer({
      class: 'edit__input',
      label: 'Старый пароль',
      name: 'oldPassword',
      type: 'password',
      edit: true,
      required: false,
      events: {
        blur: () => validation(this.children, 'oldPassword')
      }
    })

    this.children.newPassword = new InputContainer({
      class: 'edit__input',
      label: 'Новый пароль',
      name: 'newPassword',
      type: 'password',
      edit: true,
      required: false,
      events: {
        blur: () => validation(this.children, 'newPassword')
      }
    })

    this.children.newPasswordAgain = new InputContainer({
      class: 'edit__input',
      label: 'Повторите новый пароль',
      name: 'newPasswordAgain',
      type: 'password',
      edit: true,
      required: false,
      events: {
        blur: () => validation(this.children, 'newPasswordAgain')
      }
    }) */

    /* this.children.changeData = new Button({
      class: 'auth__button edit__submit-btn_password edit__submit-btn',
      label: 'Cохранить',
      type: 'submit'
    }) */
  }

  protected componentDidUpdate (oldProps: Props, newProps: Props): boolean {
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

export const EditPasswordPage = connectUser(EditPassword as typeof Block)
