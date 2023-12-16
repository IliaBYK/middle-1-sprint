import Block from '../../utils/Block'
import { type PropsWithRouter, withRouter } from '../../helpers/withRouter'
import template from './link.hbs'

interface LinkProps extends PropsWithRouter {
  class: string
  to: string
  label: string
  content?: boolean
  events?: {
    click: () => void
  }
}

class BaseLink extends Block<LinkProps> {
  constructor (props: LinkProps) {
    super({
      ...props,
      events: {
        click: () => { this.navigate() }
      }
    })
  }

  navigate (): void {
    this.props.router.go(this.props.to)
  }

  render (): DocumentFragment {
    return this.compile(template, { ...this.props })
  }
}

export const Link = withRouter(BaseLink)
