import Block from "../../utils/Block";
import template from "./editPage.hbs";
import { render } from "../../utils/render";
import { Button } from "../../partials/button";
import { InputEdit } from "../../partials/inputEdit";
import { editBtn } from "../../partials/editBtn";
import { Title } from "../../partials/title";
import { Imagine } from "../../partials/imagine";
import { EditAvatarContainer } from "../../layouts/editAvatarContainer";

export class EditPage extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.avatar = new EditAvatarContainer({
      events: {
        click: () => {}
      }
    })

    this.children.title = new Title({
      class: "edit__title",
      label: "Андрей"
    })

    this.children.imagine = new Imagine({
      src: "../../images/Union.png",
      class: "edit__avatar",
      alt: "Аватар пользователя",
    })

    this.children.buttonToChats = new Button({
      class: "edit__button",
      events: {
        click: () => render("chats")
      }
    })

    this.children.mail = new InputEdit({
      label: "Почта",
      name: "email",
      type: "email",
    });

    this.children.login = new InputEdit({
      label: "Логин",
      name: "login",
      type: "text",
    });

    this.children.firstName = new InputEdit({
      label: "Имя",
      name: "first_name",
      type: "text",
    });

    this.children.secondName = new InputEdit({
      label: "Фамилия", 
      name: "second_name",
      type: "text",
    });

    this.children.displayName = new InputEdit({
      label: "Имя в чате", 
      name: "display_name",
      type: "text",
    });

    this.children.phone = new InputEdit({
      class: "edit__input-container_last",
      label: "Телефон", 
      name: "phone",
      type: "tel",
    });

    this.children.changeData = new editBtn({
      /* class: "edit__input-container_btns", */
      label: "Изменить данные",
      events: {
        click: () => {/* this.validation() */},
      },
    });

    this.children.changePassword = new editBtn({
      /* class: "edit__input-container_btns",  */
      label: "Изменить пароль",
      events: {
        click: () => {/* this.validation() */},
      },
    });

    this.children.logout = new editBtn({
      /* class: "edit__input-container_last edit__input-container_btns", */
      label: "Выйти",
      events: {
        click: () => render("login"),
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}