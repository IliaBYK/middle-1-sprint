import { ErrorPage } from '../../partials/errorPage';
import Block from '../../utils/Block';
import template from './404.hbs';

export class NotFound extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.page = new ErrorPage({
      code: "404",
      message: "Не туда попали"
    })
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}