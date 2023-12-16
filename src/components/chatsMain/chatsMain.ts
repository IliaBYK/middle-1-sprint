export const template = `
  <main class="chats__message-area">
    {{{popup}}}
    {{#if selectedChat}}
      <header class="chats__header">
        {{{imagineProfile}}}
        {{{title}}}
        {{{buttonUsers}}}
      </header>
      
      <div class="chats__main">
        {{{date}}}
        {{{tabUsers}}}
        {{{tabMedia}}}
        {{#each messages}}
          {{{this}}}
        {{/each}}
      </div>
      
      <footer class="chats__footer">
        {{{attachBtn}}}
        {{{input}}}
        {{{sendBtn}}}
      </footer>
    {{/if}}
    {{#unless selectedChat}}
      <p class="chats__empty-list">Выберите чат, чтобы отправить сообщение</p>
    {{/unless}}
  </main>
`
