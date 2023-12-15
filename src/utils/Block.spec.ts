import { TestBlock } from './TestBlock/TestBlock'
import type Block from './Block'
import { expect } from 'chai'
import { type Title } from '../components/title/index'

describe('Block', () => {
  describe('Block: render', () => {
    it('Should render correctly', () => {
      expect(((TestBlock as unknown as Block).children.title as Title).getContent()?.innerHTML === 'Test')
    })
  })

  describe('Block: props', () => {
    it('Should render given props', () => {
      ((TestBlock as unknown as Block).children.title as Title).setProps({
        label: 'Some other test'
      })

      expect(((TestBlock as unknown as Block).children.title as Title).getContent()?.innerHTML === 'Some other test')
    })
  })
})
