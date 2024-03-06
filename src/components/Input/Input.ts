//language=hbs

export default `
  <div class="input-container">
    <label for="{{ name }}" class="input-container__label">
      {{#if value}}
       {{ label }}
      {{/if}}
    </label>
    <input
      class="input-container__input"
      id="{{ name }}"
      type="{{ type }}"
      name="{{ name }}"
      value="{{ value }}"
    />
    <span class="input-container__error">
      {{#if error}}
        {{ error }}
      {{/if}}
    </span>
  </div>
`;
