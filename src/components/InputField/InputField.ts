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
    });
  }
  override render() {
    return `
      <div class='input-field-container'>
        <label for='{{ name }}' class='input-field-container__label'>
           {{ label }}
        </label>
        <input
          class='input-field-container__input'
          id='{{ name }}'
          type='{{ type }}'
          name='{{ name }}'
          value='{{ value }}'
          {{#if disabled}}disabled{{/if}}
        />
      </div>
    `;
  }
}

export default InputField;
