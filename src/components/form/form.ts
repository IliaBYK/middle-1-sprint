export const template = `
  <form class="{{class}}__form">
    {{{title}}}

    {{#each inputs}}
      {{{this}}}
    {{/each}}

    {{#unless search}}
      {{{button}}}
    {{/unless}}
  </form>`
