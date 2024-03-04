//language=hbs

export default `
  <div class="inputContainer">
    <label for="{{ name }}" class="label">
      {{#if value}}
       {{ label }}
      {{/if}}
    </label>
    <input
      class="input"
      id="{{ name }}"
      type="{{ type }}"
      name="{{ name }}"
      value="{{ value }}"
    />
    <span class="error">
      {{#if error}}
        {{ error }}
      {{/if}}
    </span>
  </div>
`;
