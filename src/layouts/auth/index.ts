import { LoginPage } from "../../pages/login";
import Block from "../../utils/Block";
import template from "./auth.hbs";

export default class Auth extends Block {
  constructor() {
    super({})
  }

  init() {
    this.children.login = new LoginPage();
  }

  render() {
    return this.compile(template, this.props);
  }
}