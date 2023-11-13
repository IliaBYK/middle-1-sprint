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
      events: {
        click: () => {
          console.log("q12323sw");
        }
      }
    });

    this.children.password = new Input({
      label: "Пароль",
      name: "password",
      type: "password",
      events: {
        click: (e) => {
          if((e?.target as HTMLInputElement).value != "123")
          console.log(123123);
        }
      }
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
      events: {
        click: () => {/* this.validation() */},
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

  /* validation() {
    /* console.log(this.children.login.element?.children.forEach(el => el.tagName === "input"));
    for(let i = 0; i < this.children.login.element?.children.length; i++) {
      if(this.children.login.element?.children[i].tagName === "INPUT") {
        console.log((this.children.login.element?.children[i] as Input).getName())
      }
    }
    
  } */

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
