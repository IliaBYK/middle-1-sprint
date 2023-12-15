import { Title } from './../../components/title/index'
import Block from '../../utils/Block'
import template from './TestBlock.hbs'

export class TestBlock extends Block {
  protected init (): void {
    this.children.title = new Title({
      label: 'Test'
    })
  }

  render (): DocumentFragment {
    return this.compile(template, this.props)
  }
}
