import { HelperOptions } from 'handlebars';

export default function auth(this: object, { fn }: HelperOptions): string {
  return `
    <div class="auth">
      <form class="auth__form" id="auth-form">
        ${fn(this)}
      </form>
    </div>
  `
}
