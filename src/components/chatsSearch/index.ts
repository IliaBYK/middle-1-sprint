import { InputSearch } from '../inputSearch'
import Block from '../../utils/Block'
import template from './search.hbs'

export default class Search extends Block {
  constructor () {
    super({})
  }

  init (): void {
    this.children.search = new InputSearch({
      class: 'chats__search',
      placeholder: 'Поиск',
      name: 'searchChat',
      type: 'text',
      required: false
    })
  }

  render (): DocumentFragment {
    return this.compile(template, this.props)
  }
}
