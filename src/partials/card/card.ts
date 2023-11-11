import Block from '../../utils/Block';
import template from './card.hbs';

interface ButtonProps {
  src: string;
  name: string;
  text: string;
  time: Date;
  counter?: number;
}

export class Card extends Block {
  constructor(props: ButtonProps) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}