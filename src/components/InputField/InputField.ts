import { validate } from '../../shared/validates.ts';
import Block from '../../shared/Block.ts';

type InputFieldProps = {
  name: string;
  label: string;
  type: string;
  value: string;
  disabled: boolean;
};

class InputField extends Block {
  constructor(props: InputFieldProps) {
    super({
      name: props.name,
      label: props.label,
      type: props.type,
      value: props.value,
      disabled: props.disabled,
      events: {
        blur: (event: Event) => {
          const target = event.target as HTMLInputElement;
          this.setProps({ value: target.value });
          this.setProps({ error: validate(target.value, this.props.name) });
        },
      },
    });
  }
  override render() {
    return `
      <div class='input-field-container'>
        <label for='{{ name }}' class='input-field-container__label'>
           {{ label }}
        </label>
        <div class='input-field-container__text'>
          <input
            class='input-field-container__text__input'
            id='{{ name }}'
            type='{{ type }}'
            name='{{ name }}'
            value='{{ value }}'
            {{#if disabled}}disabled{{/if}}
          />
          <span class='input-field-container__text__error'>
            {{#if error}}
              {{ error }}
            {{/if}}
          </span>
        </div>
      </div>
    `;
  }
}

export default InputField;
