import { Input } from '../input';
import Block from '../../utils/Block';
import template from './inputContainer.hbs';

interface InputProps {
  name: string;
  label: string;
  class?: string;
  error?: string;
  type: string;
  required: boolean;
  events?: {
    click: (e?: Event) => void
    blur?: (e?: Event) => void;
  }
}

export class InputContainer extends Block<InputProps> {
  constructor(props: InputProps) {
    super({...props });
  }

  init() {
    this.children.input = new Input({
      label: this.props.label,
      name: this.props.name,
      type: this.props.type,
      class: this.props.class,
      events: this.props.events,
      error: this.props.error,
      required: this.props.required
    });
  }

  validation() {
    return (this.children.input as Input).validation()
  }

  getValue() {
    return (this.children.input as Input).getValue()
  }

  getName() {
    return (this.children.input as Input).getName()
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}