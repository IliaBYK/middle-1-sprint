import { HelperOptions } from 'handlebars';

export default function editPage(this: object, { fn }: HelperOptions): string {
  return `
    <a class="edit__button button" href="../../pages/mainMessanger/mainMessanger.html"></a>
    <div class="edit">
      <div class="edit__avatar-container">
        <div class="edit__over">
          <p class="edit__text">Поменять аватар</p>
        </div>
        <img class="edit__avatar" src="../../images/Union.svg"/>
      </div>
      <h1 class="edit__title">Иван</h1>
      <form class="edit__form" id="edit-form">
        ${fn(this)}
      </form>
    </div>
  `
}