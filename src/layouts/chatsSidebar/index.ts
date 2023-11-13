import Block from "../../utils/Block";
import template from "./sidebar.hbs";
import { Button } from "../../partials/button";
import Search from "../chatsSearch";
import { Card } from "../../partials/card";
import { cards } from "../../utils/cards";

export class Sidebar extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.cards = this.createCards();

    this.children.button = new Button({
      class: "chats__profile",
      label: "Профиль",
      content: true,
      type: "button"
    });

    this.children.search = new Search();
  }

  private createCards(): Card[] { 
    return cards.map((data: any) => {
      return new Card({...data});
    })
  }

  render() {
    return this.compile(template, this.props);
  }
}