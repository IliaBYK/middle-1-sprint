import Block from '../../utils/Block';
import template from './imagine.hbs';

interface ImagineProps {
  src?: string;
  alt?: string;
  class?: string;
}

export class Imagine extends Block<ImagineProps> {
  constructor(props?: ImagineProps) {
    super({...props });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}