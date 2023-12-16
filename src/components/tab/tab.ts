export const template = `
  <div class="tab {{class}}">
    {{#if users}}
      {{{buttonAdd}}}
      {{{buttonDelete}}}
    {{/if}}
    {{#unless users}}
      {{{addMedia}}}
      {{{addFile}}}
      {{{addLocation}}}
    {{/unless}}
  </div>
`
