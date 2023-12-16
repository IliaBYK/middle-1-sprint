import { TestBlock } from './TestBlock'
import type Block from './Block'
import { expect } from 'chai'
import { type Title } from '../components/title/index'

const testBlock = new TestBlock({})

describe('Block', () => {
  describe('Block: render', () => {
    it('Should render correctly', () => {
      expect((testBlock as unknown as Block).getContent()?.innerHTML === 'Test')
    })
  })

  describe('Block: props', () => {
    it('Should render given props', () => {
      ((testBlock as unknown as Block).children.title as Title).setProps({
        label: 'Some other test'
      })

      expect((testBlock as unknown as Block).getContent()?.innerHTML === 'Some other test')
    })
  })
})
