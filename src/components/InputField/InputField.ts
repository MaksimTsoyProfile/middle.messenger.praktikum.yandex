//language=hbs

export default `
  <div class="input-field-container">
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
  </div>
`;
