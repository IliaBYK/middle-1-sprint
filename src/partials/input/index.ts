import Block from '../../utils/Block'
import template from './input.hbs';

interface InputProps {
  label?: string;
  type?: string;
  class?: string;
  name: string;
  for?: string;
  error?: string
  placeholder?: string;
  events?: {
    click: (e?: Event) => void;
    blur?: (e?: Event) => void;
  };
}

export class Input extends Block {
  constructor(props: InputProps) {
    super({
      ...props
    });
  }

  getName() {
    return (this.element as HTMLInputElement).name
  }

  getValue() {
    return (this.element as HTMLInputElement).value
  }

  isValidName(name: string) {
    // Проверка имени регулярным выражением
    const pattern = /^[а-яА-Яa-zA-Z]+$/;
    return pattern.test(name);
  }

  isValidLogin(login: string) {
    // Проверка имени регулярным выражением
    const pattern = /^(?=.*[A-Za-z0-9]$)[A-Za-z][A-Za-z\d.-]{3,20}$/;
    return pattern.test(login);
  }

  isValidPassword(password: string) {
    // Проверка пароля регулярным выражением
    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,40}$/;
    return pattern.test(password);
  }

  isValidEmail(email: string) {
    // Проверка пароля регулярным выражением
    const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return pattern.test(email);
  }

  isValidPhone(phone: string) {
    // Проверка пароля регулярным выражением
    const pattern = /^\+?[0-9]{10,15}$/g;
    return pattern.test(phone);
  }

  isValidMessage(message: string) {
    if(message.length === 0) return false
  }

  render() {
    return this.compile(template, this.props);
  }
}