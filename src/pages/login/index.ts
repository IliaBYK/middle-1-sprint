import Block from "../../utils/Block";
import template from "./login.hbs";
import { render } from "../../utils/render";
import { Button } from "../../partials/button";
import { InputContainer } from "../../layouts/inputContainer";

export class LoginPage extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.login = new InputContainer({
      label: "Логин",
      name: "login",
      type: "text",
      events: {
        click: () => {
          
        },
        blur: () => {
          const container = this.children.login;
          const input = (container).children.input;
          if(!input.isValidLogin(input.getValue())) {
            container.setProps(container.props.error = "asdasdasd");
          } else {
            container.setProps(container.props.error = "");
          }
          console.log(this.children.login.children.input.isValidLogin(this.children.login.children.input.getValue()))
        }
      }
    });

    this.children.password = new InputContainer({
      label: "Пароль",
      name: "password",
      type: "password",
      events: {
        click: () => {
          
        }
      }
    });

    this.children.passwordElse = new InputContainer({
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
