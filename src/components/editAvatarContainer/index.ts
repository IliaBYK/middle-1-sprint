import { Imagine } from '../imagine';
import Block from '../../utils/Block';
import template from './container.hbs';

interface Props {
  class?: string;
  onClick?: () => void;
  events?: {
    click: () => void;
  };
}

export class EditAvatarContainer extends Block<Props> {
  constructor(props: Props) {
    super({...props });
  }

  init() {
    this.children.imagine = new Imagine({
      src: "../../images/Union.png",
      class: "edit__avatar",
      alt: "Аватар пользователя",
    })
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}