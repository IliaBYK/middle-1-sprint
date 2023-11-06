import { HelperOptions } from 'handlebars';

export default function auth(this: object, { fn }: HelperOptions): string {
  return `
    <main class="auth">
      <form class="auth__form" id="auth-form">
        ${fn(this)}
      </form>
    </main>
  `
}
