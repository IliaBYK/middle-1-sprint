export const template = `
  <li class="chats__card">
    <img class="chats__img" alt="Аватар собеседника" src={{src}} />
    <div class="chats__card-text">
      <h2 class="chats__name">{{name}}</h2>
      <span class="chats__span chats__span_invisible">Вы:</span>
      <p class="chats__text">{{text}}</p>
    </div>
    <div class="chats__card-info">
      <time class="chats__time">{{time}}</time>
      {{#if unread_count}}
        <p class="chats__counter">{{unread_count}}</p>
      {{/if}}
    </div>
  </li>
`
