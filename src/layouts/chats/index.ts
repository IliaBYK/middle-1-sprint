import { chats } from './../../utils/chats';
import Block from "../../utils/Block";
import template from "./chats.hbs";
import { Button } from "../../partials/button";
import { Input } from "../../partials/input";
import { Sidebar } from "./__sidebar";
import Message from "../message";
import { InputSearch } from "../../partials/inputSearch";

interface chatProps {
  id?: number | string;
  text?: string;
  isOwner?: boolean;
  time?: string;
  class?: string;
}

export class Chats extends Block {
  constructor(props: chatProps) {
    super({...props});
  }

  init() {
    this.children.messages = this.createMessages(chats);
    this.children.sidebar = new Sidebar();

    this.children.password = new Input({
      label: "Пароль",
      name: "password",
      type: "password",
    });

    this.children.attachBtn = new Button({
      class: "chats__attach-btn",
      events: {
        click: () => {},
      }, 
    });

    this.children.input = new InputSearch({
      class: "chats__input", 
      placeholder: "Сообщение",
      name: "message"
    });

    this.children.sendBtn = new Button({
      class: "chats__send-btn",
      events: {
        click: () => {},
      },
    });
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