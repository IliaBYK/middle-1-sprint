/* eslint-disable @typescript-eslint/no-misused-promises */
import { Chats } from './pages/chats'
import { SignupPage } from './pages/signup'
import { LoginPage } from './pages/login'
import Router from './utils/Router'
import { ProfilePage } from './pages/Profile'
import AuthController from './controllers/AuthController'
import { EditProfilePage } from './pages/editProfilePage'
import { EditPasswordPage } from './pages/editPassword'

enum Routes {
  Index = '/',
  Register = '/register',
  Profile = '/profile',
  Chats = '/chats',
  EditProfile = '/edit-profile',
  EditPassword = '/edit-password'
}

async function start (): Promise<void> {
  Router
    .use(Routes.Index, LoginPage)
    .use(Routes.Register, SignupPage)
    .use(Routes.Profile, ProfilePage)
    .use(Routes.EditProfile, EditProfilePage)
    .use(Routes.EditPassword, EditPasswordPage)
    .use(Routes.Chats, Chats)
    .start()

  let isProtectedRoute = true

  switch (window.location.pathname) {
    case Routes.Index:
    case Routes.Register:
      isProtectedRoute = false
      break
  }

  try {
    await AuthController.fetchUser()

    Router.start()

    if (!isProtectedRoute) {
      Router.go(Routes.Profile)
    }
  } catch (e) {
    Router.start()

    if (isProtectedRoute) {
      Router.go(Routes.Index)
    }
  }
}

window.addEventListener('DOMContentLoaded', start)
