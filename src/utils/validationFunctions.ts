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

function isValidId (id: string | number): boolean {
  if (id === '') return false
  // Проверка пароля регулярным выражением
  const pattern = /^\[0-9]$/g
  return pattern.test(id + '')
}

function isValidMessage (message: string): boolean {
  return message.length > 0
}

export const functions: Record<string, (S: string) => boolean> = {
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
  addChat: isValidName,
  loginPopup: isValidId
}
