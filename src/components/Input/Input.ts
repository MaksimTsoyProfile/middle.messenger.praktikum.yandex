import { validate } from '../../shared/validates.ts';
import Block from '../../shared/Block.ts';

type InputProps = {
  name: string;
  type: string;
  value: string;
  label: string;
  error?: string;
  onBlur?: () => void;
  onFocus?: () => void;
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
        blur: (e: Event) => {
          this.handleBlur(e);
        },
      },
    });
  }
  handleBlur = (event: Event) => {
    const target = event.target as HTMLInputElement;
    this.setProps({ value: target.value });
    this.setProps({ error: validate(target.value, this.props.name) });
  };
  override render() {
    return `
      <div class='input-container'>
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
          placeholder='{{ label }}'
          value='{{ value }}'
          required
        />
        <span class='input-container__error error'>
          {{#if error}}
            {{ error }}
          {{/if}}
        </span>
      </div>
    `;
  }
}

export default Input;
