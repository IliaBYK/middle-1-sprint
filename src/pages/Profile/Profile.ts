export const template = `  
  <div class="edit__container">
    {{{popup}}}

    {{{buttonToChats}}}
    <main class="edit">
      {{{avatar}}}
      {{{title}}}
      <form class="edit__form" id="edit-form">

        {{#each inputs}}
          {{{this}}}
        {{/each}}
    
        <div class="edit__btns">
          {{{changeData}}}
          {{{changePassword}}}
          {{{logout}}}
        </div>
      </form>
    </main>
  </div>
`
