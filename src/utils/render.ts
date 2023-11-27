/* import { NotFound } from '../pages/404/index'
import { InternalError } from '../pages/500/index'
import { Chats } from '../pages/chats/index'
import { Profile } from '../pages/Profile/index'
import { EditPassword } from '../pages/editPassword/index'
import { LoginPage } from '../pages/login/index'
import { SignupPage } from '../pages/signup/index'
import { EditProfile } from '../pages/editProfilePage'

const ROUTES = {
  login: LoginPage,
  signup: SignupPage,
  chats: Chats,
  profile: Profile,
  editProfile: EditProfile,
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
} */
