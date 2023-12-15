import { Title } from '../../components/title/index'
import Block from '../Block'
import { template } from './TestBlock'

export class TestBlock extends Block {
  protected init (): void {
    this.children.title = new Title({
      label: 'Test'
    })
  }

  render (): DocumentFragment {
    return this.compile(template)
  }
}
