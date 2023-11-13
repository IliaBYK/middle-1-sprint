import Block from "../../utils/Block";
import template from "./message.hbs";


interface messageProps {
  class?: string;
  text: string;
  time?: Date;
}
export default class Message extends Block {
  constructor(props: messageProps) {
    super({...props})
  }

  render() {
    return this.compile(template, this.props);
  }
}