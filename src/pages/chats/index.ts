import { chats } from '../../utils/chats';
import Block from "../../utils/Block";
import template from "./chats.hbs";
import { Button } from "../../components/button";
import { Sidebar } from "../../components/chatsSidebar";
import Message from "../../components/message";
import { InputSearch } from "../../components/inputSearch";

interface chatProps {
  id?: number | string;
  text?: string;
  isOwner?: boolean;
  time?: string;
  class?: string;
}

export class Chats extends Block {
  constructor(props?: chatProps) {
    super({...props});
  }

  init() {
    this.children.messages = this.createMessages(chats);
    this.children.sidebar = new Sidebar();

    /* this.children.password = new Input({
      label: "Пароль",
      name: "password",
      type: "password",
      required: true
    }); */

    this.children.attachBtn = new Button({
      class: "chats__attach-btn",
      events: {
        click: () => {},
      }, 
    });

    this.children.input = new InputSearch({
      class: "chats__input", 
      placeholder: "Сообщение",
      name: "message",
      required: true,
    });

    this.children.sendBtn = new Button({
      class: "chats__send-btn",
      type: "submit",
      events: {
        click: () => {
          if(((this.children.input as Block).element as HTMLInputElement).value.trim().length === 0) {
            alert("Введите сообщение");
          }
        },
      },
    });
  }

  protected componentDidUpdate(oldProps: chatProps, newProps: chatProps): boolean {
    this.children.chats = this.createMessages(chats);

    return true;
  }

  private createMessages(chats: chatProps[]) { 
    return chats.map((data: any) => {
      return new Message({class: data.isOwner ? "chats__message_user" : "", ...data});
    })
  }

  render() {
    return this.compile(template, this.props);
  }
}