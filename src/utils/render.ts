import { NotFound } from '../pages/404'
import { InternalError } from '../pages/500'
import { Chats } from '../pages/chats'
import { EditPage } from '../pages/editPage'
import { EditPassword } from '../pages/editPassword'
import { LoginPage } from '../pages/login'
import { SignupPage } from '../pages/signup'

const ROUTES = {
  login: LoginPage,
  signup: SignupPage,
  chats: Chats,
  edit: EditPage,
  editPassword: EditPassword,
  404: NotFound,
  500: InternalError
}

export function render (name: keyof typeof ROUTES): void {
  const root = document.querySelector('#app')!

  root.innerHTML = ''

  const Page = ROUTES[name]

  const page = new Page()

  root.append(page.getContent()!)

  page.dispatchComponentDidMount()
}
