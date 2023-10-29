import { HelperOptions } from 'handlebars';

export default function app(this: object, { fn }: HelperOptions): string {
    // language=hbs
    return `
        <div id="app">
            ${fn(this)}
        </div>
    `
}
