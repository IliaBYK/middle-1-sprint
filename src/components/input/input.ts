export const template = `  
  <input 
    id={{name}} 
    name={{name}}
    class={{class}} 
    type={{type}} 
    autocomplete="off" 
    required="{{required}}" 
    placeholder="{{placeholder}}"
    {{#if disabled}}
      disabled="true"
    {{/if}}
    {{hidden}}
  />
`
