//language=hbs

export default `
  <div class="inputContainer">
    {{#if value}}
      <label for="{{ name }}" class="label">{{ label }}</label>
    {{/if}}
    <input
      class="input"
      id="{{ name }}"
      type="{{ type }}"
      name="{{ name }}"
      value="{{ value }}"
    />
    {{#if error}}
      <span class="error">{{ error }}</span>
    {{/if}}  
  </div>
`;
