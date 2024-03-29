import Block from '../../shared/Block.ts';
import { navigate } from '../../shared/navigate.ts';

type ButtonProps = {
  text: string;
  page: string;
  type?: string;
};

class Button extends Block {
  constructor(props: ButtonProps) {
    super({
      text: props.text,
      page: props.page,
      type: props.type || 'button',
      events: {
        click: (event: Event) => {
          if (props.type !== 'submit') {
            event.preventDefault();
            navigate(props.page);
          }
        },
      },
    });
  }
  override render() {
    return `
      <button class='button' type='{{ type }}'>{{ text }}</button>
    `;
  }
}

export default Button;
