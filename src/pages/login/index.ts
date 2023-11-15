import Block from "../../utils/Block";
import template from "./login.hbs";
import { render } from "../../utils/render";
import { Button } from "../../partials/button";
import { InputContainer } from "../../layouts/inputContainer";
import { Title } from "../../partials/title";
import { submit, validation } from "../../utils/validation";
import errors from "../../utils/errors";

export class LoginPage extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.title = new Title({
      class: "auth__title",
      label: "Вход"
    })

    this.children.login = new InputContainer({
      label: "Логин",
      name: "login",
      type: "text",
      required: true,
      events: {
        click: () => {console.log(this.element?.children);
        },
        blur: () => validation(this.children, "login", errors)
      }
    });

    this.children.password = new InputContainer({
      label: "Пароль",
      name: "password",
      type: "password",
      required: true,
      events: {
        click: () => {},
        blur: () => validation(this.children, "password", errors)
      }
    });

    this.children.passwordElse = new InputContainer({
      class: "auth__label_last", 
      label: "Пароль еще раз", 
      name: "passwordElse",
      type: "password",
      required: true,
      events: {
        click: () => {},
        blur: () => validation(this.children, "passwordElse", errors)
      }
    });

    this.children.buttonSub = new Button({
      class: "auth__button auth__button_margin", 
      label: "Войти",
      type: "submit",
      events: {
        click: (e?: Event) => {
          submit(this.children, e)
          /* this.validation() */},
      },
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
