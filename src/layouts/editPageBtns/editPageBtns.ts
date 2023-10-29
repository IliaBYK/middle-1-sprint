import { HelperOptions } from 'handlebars';

export default function editPageBtns(this: object, { fn }: HelperOptions): string {
    // language=hbs
    return `
        <div class="edit__btns">
            ${fn(this)}
        </div>
    `
}