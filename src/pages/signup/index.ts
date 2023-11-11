import Block from "../../utils/Block";
import template from "./signup.hbs";
import { render } from "../../utils/render";
import { Button } from "../../partials/button";
import { Input } from "../../partials/input";

export class SignupPage extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.firstName = new Input({
      label: "Имя",
      name: "first_name",
      type: "text",
    });
    this.children.secondName = new Input({
      label: "Фамилия",
      name: "second_name",
      type: "text",
    });
    this.children.email = new Input({
      label: "Почта",
      name: "email",
      type: "email",
    });
    this.children.login = new Input({
      label: "Логин",
      name: "login",
      type: "text",
    });
    this.children.phone = new Input({
      label: "Телефон",
      name: "phone",
      type: "tel",
    });

    this.children.password = new Input({
      label: "Пароль",
      name: "password",
      type: "password",
    });

    this.children.passwordElse = new Input({
      class: "auth__label_last", 
      label: "Пароль еще раз", 
      name: "password",
      type: "password",
    });

    this.children.buttonSub = new Button({
      class: "auth__button auth__button_margin", 
      label: "Зарегистрироваться",
      onClick: () => {}
    });

    this.children.buttonLink = new Button({
      class: "auth__button_reg",
      label: "Войти",
      events: {
        click: () => render("login"),
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}


/**
 * 
 *       buttons: [
        {
          class: "auth__button auth__button_margin", 
          label: "Зарегистрироваться",
        },
        {
          class: "auth__button_reg",
          label: "Войти",
          onClick: () => {
            render("login");
          },
        },
      ],
      inputs: [
        {
          label: "Почта",
          name: "email",
          type: "email",
        },
        {
          label: "Логин",
          name: "login",
          type: "text",
        },
        {
          label: "Имя",
          name: "first_name",
          type: "text",
        },
        {
          label: "Фамилия",
          name: "second_name",
          type: "text",
        },
        {
          label: "Телефон",
          name: "phone",
          type: "tel",
        },
        {
          label: "Пароль",
          name: "password",
          type: "password",
        },
        {
          class: "auth__label_last", 
          label: "Пароль еще раз", 
          name: "password",
          type: "password",
        },
 */