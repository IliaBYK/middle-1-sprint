import { ErrorPage } from '../../partials/errorPage';
import Block from '../../utils/Block';
import template from './500.hbs';

export class InternalError extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.page = new ErrorPage({
      code: "500",
      message: "Мы уже фиксим"
    })
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}