import Block from '../../utils/Block'
import template from './input.hbs';

interface InputProps {
  label: string;
  type?: string;
  class?: string;
  name: string;
  for?: string;
  error?: string
}

export class Input extends Block {
  constructor(props: InputProps) {
    super({
      ...props
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}