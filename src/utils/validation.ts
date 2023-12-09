/* eslint-disable array-callback-return */
// import { InputContainer } from '../components/inputContainer'
// import errors from './errors'
import { type InputContainer } from '../components/inputContainer'
import { functions } from './validationFunctions'

function validation (name: string, value: string): boolean {
  return functions[name](value)
}

/*
  const form = this.getContent()?.querySelector('.edit__form')
  const formData = new FormData(form as HTMLFormElement)
  console.log(...formData)
*/

async function submit (inputs: InputContainer | InputContainer[], element: HTMLElement | null, onClick: () => Promise<void>, className: string): Promise<void> {
  // const result: Record<string, string> = {}
  let isValid: boolean = false

  const form = element?.querySelector(className)
  const data = [...new FormData(form as HTMLFormElement)]

  const entries = new Map(data)
  const result = Object.fromEntries(entries)

  if (Array.isArray(inputs)) inputs.map(input => { input.validation() })
  else inputs.validation()

  for (const key in result) {
    if (validation(key, result[key] as string)) isValid = true
    else isValid = false
  }

  try {
    isValid && await onClick()
  } catch (e) {
    console.log(e)
  }

  /* values.forEach(el => {
    if (functions[el[0]](el[1])) {
      option = true
      result[el[0]] = el[1]
    } else {
      option = false
      validation(array)
    }
  })

  if (result.password !== result.passwordAgain) {
    ((inputs.find((el: InputContainer) => el.getName() === 'passwordAgain')))?.setProps({ error: 'Пароли не совпадают' })
    return
  }

  if (result.newPassword === result.oldPassword) {
    ((inputs.find((el: InputContainer) => el.getName() === 'newPassword')))?.setProps({ error: 'Новый пароль должен отличаться от старого' })
    return
  }

  if (result.newPassword !== result.newPasswordAgain) {
    ((inputs.find((el: InputContainer) => el.getName() === 'newPasswordAgain')))?.setProps({ error: 'Пароли не совпадают' })
    return
  }

  if ((result.password || result.newPassword) === (result.passwordAgain || result.newPasswordAgain) && option) {
    // console.log(result)
    await onClick()
    // render('chats')
  } */
}

export { functions, validation, submit }
