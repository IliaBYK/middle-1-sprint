import { Messanger } from './pages/messanger/index'
/* eslint-disable @typescript-eslint/no-misused-promises */
import { SignupPage } from './pages/signup/index'
import { LoginPage } from './pages/login/index'
import Router from './utils/Router'
import { ProfilePage } from './pages/Profile/index'
import AuthController from './controllers/AuthController'
// import ChatsController from './controllers/ChatsController'
import { EditProfilePage } from './pages/editProfilePage/index'
import { EditPasswordPage } from './pages/editPassword/index'

enum Routes {
  Signin = '/',
  Signup = '/sign-up',
  Profile = '/settings',
  Messanger = '/messenger',
  EditProfile = '/settings/edit-profile',
  EditPassword = '/settings/edit-password'
}

window.addEventListener('popstate', () => {
  Router.start()
})

async function start (): Promise<void> {
  Router
    .use(Routes.Signin, LoginPage)
    .use(Routes.Signup, SignupPage)
    .use(Routes.Profile, ProfilePage)
    .use(Routes.EditProfile, EditProfilePage)
    .use(Routes.EditPassword, EditPasswordPage)
    .use(Routes.Messanger, Messanger)

  let isLoggedIn = true

  switch (window.location.pathname) {
    case Routes.Signin:
    case Routes.Signup:
      isLoggedIn = false
      break
  }

  try {
    await AuthController.fetchUser()

    Router.start()

    if (isLoggedIn) {
      Router.go(Routes.Messanger)
    } else Router.go(Routes.Signin)
  } catch (e) {
    Router.start()

    if (!isLoggedIn) {
      Router.go(Routes.Signin)
    }
  }
}

window.addEventListener('DOMContentLoaded', start)
