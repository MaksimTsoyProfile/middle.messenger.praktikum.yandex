//language=hbs

export default `
  <div class='avatar-container'>
    {{#if src }}
      <img src='{{ src }}' alt='avatar' />
    {{else}}
      <div class='mock-image'>
        <img src='../../icons/mock-icon.png' alt='mock'>
      </div>
    {{/if}}
  </div>
`;
