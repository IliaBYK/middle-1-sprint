import Block from "../../utils/Block";
import template from "./login.hbs";
import { render } from "../../utils/render";
import { Button } from "../../partials/button";
import { Input } from "../../partials/input";

export class LoginPage extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.login = new Input({
      label: "Логин",
      name: "login",
      type: "text",
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
      label: "Войти",
      onClick: () => {}
    });

    this.children.buttonLink = new Button({
      class: "auth__button_reg",
      label: "Нет аккаунта?",
      events: {
        click: () => render("signup"),
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

/*
buttons: [
        new Button({
          class: "auth__button auth__button_margin", 
          label: "Войти",
        }),
        {
          class: "auth__button_reg",
          label: "Нет аккаунта?",
          onClick: () => {
            render("signup");
          },
        }
      ],
      inputs: [
        {
          label: "Логин",
          name: "login",
          type: "text",
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
      ]
 */
