import Block from "../../utils/Block";
import template from "./app.hbs";

export default class App extends Block {
  render() {
    return this.compile(template, this.props);
  }
}