/* eslint-disable array-callback-return */
import { InputContainer } from '../components/inputContainer/index'
import type Block from './Block'
import errors from './errors'
// import { render } from './render'

function isValidName (name: string): boolean {
  // Проверка имени регулярным выражением
  const pattern = /[A-ZА-Я][a-zа-я-]*/
  return pattern.test(name)
}

function isValidLogin (login: string): boolean {
  if (login === '') return false
  // Проверка имени регулярным выражением
  const pattern = /^(?=.*[A-Za-z0-9]$)[A-Za-z][A-Za-z\d.-]{2,20}$/
  return pattern.test(login)
}

function isValidPassword (password: string): boolean {
  if (password === '') return false
  // Проверка пароля регулярным выражением
  const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{7,40}$/
  return pattern.test(password)
}

function isValidEmail (email: string): boolean {
  if (email === '') return false
  // Проверка пароля регулярным выражением
  const pattern = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/g
  return pattern.test(email)
}

function isValidPhone (phone: string): boolean {
  if (phone === '') return false
  // Проверка пароля регулярным выражением
  const pattern = /^\+?[0-9]{9,15}$/g
  return pattern.test(phone)
}

function isValidMessage (message: string): boolean {
  return message.length > 0
}

const functions: Record<string, (S: string) => boolean> = {
  email: isValidEmail,
  login: isValidLogin,
  message: isValidMessage,
  first_name: isValidName,
  second_name: isValidName,
  display_name: isValidName,
  password: isValidPassword,
  oldPassword: isValidPassword,
  newPassword: isValidPassword,
  newPasswordAgain: isValidPassword,
  passwordAgain: isValidPassword,
  phone: isValidPhone,
  addChat: isValidName
}

/* interface Names {
  login: 'login'
  email: 'email'
  password: 'password'
  passwordElse: 'passwordElse'
  first_name: 'first_name'
  second_name: 'second_name'
  display_name: 'display_name'
  phone: 'phone'
} */

function validation (object: any): boolean {
  let isValid: boolean = false
  if (object instanceof InputContainer) {
    if (!object.validation()) {
      object.setProps({ error: errors[object.getName()] })
    } else {
      object.setProps({ error: '' })
      isValid = true
    }
  } else {
    const inputs = (object as InputContainer[])
    inputs.map((el) => {
      if (!el.validation()) {
        el.setProps({ error: errors[el.getName()] })
      } else {
        el.setProps({ error: '' })
        isValid = true
      }
    })
  }
  return isValid
}

async function submit (array: Block<any> | Array<Block<any>>, onClick: () => Promise<void>, e?: Event): Promise<void> {
  e?.preventDefault()
  const result: Record<string, string> = {}
  let option: boolean = false

  const inputs = Object.values(array)
  const values = inputs.map(el => [el.getName(), el.getValue()])

  values.forEach(el => {
    if (functions[el[0]](el[1])) {
      option = true
      result[el[0]] = el[1]
    } else {
      option = false
      validation(array)
    }
  })

  if (result.password !== result.passwordAgain) {
    ((inputs.find((el: InputContainer) => el.getName() === 'passwordAgain'))).setProps({ error: 'Пароли не совпадают' })
    return
  }

  if (result.newPassword !== result.newPasswordAgain) {
    ((inputs.find((el: InputContainer) => el.getName() === 'newPasswordAgain'))).setProps({ error: 'Пароли не совпадают' })
    return
  }

  if (result.password === (result.passwordAgain || result.newPasswordAgain) && option) {
    // console.log(result)
    await onClick()
    // render('chats')
  }
}

export { functions, validation, submit }
