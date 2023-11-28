import template from './editProfileBtns.hbs'
import AuthController from '../../controllers/AuthController'
import Block from '../../utils/Block'
import { Button } from '../button'

interface EditProfileBtnsProps {
  editing?: boolean
}

export class EditProfileBtns extends Block<EditProfileBtnsProps> {
  init (): void {
    this.children.changeDataBtn = new Button({
      class: 'auth__button edit__submit-btn_password edit__submit-btn',
      label: 'Cохранить',
      type: 'submit',
      events: {
        click: (e?: Event) => {
          // submit(this.children, e)
        }
      }
    })

    this.children.changeData = new Button({
      class: 'edit__btn button',
      label: 'Изменить данные',
      events: {
        click: () => {
          this.props.editing = true
        }
      }
    })

    this.children.changePassword = new Button({
      class: 'edit__btn button',
      label: 'Изменить пароль',
      events: {
        click: () => {
          this.props.editing = true
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
  }

  render (): DocumentFragment {
    return this.compile(template, this.props)
  }
}
