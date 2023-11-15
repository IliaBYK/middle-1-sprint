import { InputContainer } from './../layouts/inputContainer/index';
import errors from './errors';
import { render } from './render';
function isValidName(name: string): boolean {
  // Проверка имени регулярным выражением
  const pattern = /^\b[A-ZА-Я][а-яa-z]+$/;
  return pattern.test(name);
}

function isValidLogin(login: string): boolean {
  if(!login) return false;
  // Проверка имени регулярным выражением
  const pattern = /^(?=.*[A-Za-z0-9]$)[A-Za-z][A-Za-z\d.-]{2,20}$/;
  return pattern.test(login);
}

function isValidPassword(password: string): boolean {
  if(!password) return false;
  // Проверка пароля регулярным выражением
  const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{7,40}$/;
  return pattern.test(password);
}

function isValidEmail(email: string): boolean {
  if(!email) return false;
  // Проверка пароля регулярным выражением
  const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return pattern.test(email);
}

function isValidPhone(phone: string): boolean {
  if(phone!) return false;
  // Проверка пароля регулярным выражением
  const pattern = /^\+?[0-9]{9,15}$/g;
  return pattern.test(phone);
}

function isValidMessage(message: string): boolean {
  return message.length === 0;
}

const functions: Record<string, Function> = {
  "email": isValidEmail,
  "login": isValidLogin,
  "message": isValidMessage,
  "first_name": isValidName,
  "second_name": isValidName,
  "password": isValidPassword,
  "passwordElse": isValidPassword,
  "phone": isValidPhone
}

function validation(object: any, name: string, message: any) {
    let isValid: boolean = false
    const input = (object[name] as InputContainer)
    if(!input.validation()) {
      input.setProps({error: message[name]})
    } else {
      input.setProps({error: ""});
      isValid = true;
    } 
    return isValid;
  }

function submit(object: any,e?: Event) {
  e?.preventDefault()
  let result: Record<any, any> = {};
  let option: boolean = false;

  const values = Object
    .values(object)
    .filter(el => el instanceof InputContainer)
    .map(el => [(el as InputContainer).getName(), (el as InputContainer).getValue()]);

  values.map(el => {
    if(functions[el[0]]([el[1]])) {
      result[el[0]] = el[1];
      option = true;
    } else {
      option = false;
      validation(object, el[0], errors)
    }
  })

  if(result["password"] !== result["passwordElse"]) {
    (object.passwordElse as InputContainer).setProps({error: "Пароли не совпадают"});
  }

  if (result["password"] === result["passwordElse"] && option) {
    console.log(result);
    render("chats");
  }
}

export {functions, validation, submit};
