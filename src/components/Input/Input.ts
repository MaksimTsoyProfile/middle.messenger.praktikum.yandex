import Block from '../../shared/Block.ts';

type InputProps = {
  name: string;
  type: string;
  value: string;
  label: string;
  error?: string;
};

class Input extends Block {
  constructor(props: InputProps) {
    super({
      name: props.name,
      type: props.type,
      value: props.value,
      label: props.label,
      error: props.error,
      events: {
        blur: (event) => {
          console.log('blur');
        },
        focus: (event) => {
          console.log('focus');
        },
      },
    });
  }
  override render() {
    return `
      <div class='input-container' tabindex="0">
        <label for='{{ name }}' class='input-container__label'>
          {{#if value}}
           {{ label }}
          {{/if}}
        </label>
        <input
          class='input-container__input'
          id='{{ name }}'
          type='{{ type }}'
          name='{{ name }}'
          value='{{ value }}'
        />
        <span class='input-container__error'>
          {{#if error}}
            {{ error }}
          {{/if}}
        </span>
      </div>
    `;
  }
}

export default Input;
