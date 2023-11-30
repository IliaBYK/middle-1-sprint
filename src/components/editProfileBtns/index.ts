import template from './editProfileBtns.hbs'
import AuthController from '../../controllers/AuthController'
import Block from '../../utils/Block'
import { Button } from '../button'
import Router from '../../utils/Router'

interface EditProfileBtnsProps {
  editing?: boolean
  submit?: () => Promise<void>
}

export class EditProfileBtns extends Block<EditProfileBtnsProps> {
  /* submitData (e?: Event): void {
    e?.preventDefault()
    void this.props.submit()
  } */

  init (): void {
    this.children.changeDataBtn = new Button({
      class: 'auth__button edit__submit-btn_password edit__submit-btn',
      label: 'Cохранить',
      type: 'submit',
      events: {
        click: () => { }
      }
    })

    this.children.changeData = new Button({
      class: 'edit__btn button',
      label: 'Изменить данные',
      events: {
        click: () => {
          Router.go('/edit-profile')
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
