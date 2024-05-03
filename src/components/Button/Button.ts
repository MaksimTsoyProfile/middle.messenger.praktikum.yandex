import Block from '../../shared/Block.ts';

type ButtonProps = {
  text: string;
  page?: string;
  type?: string;
  events?: unknown;
};

class Button extends Block {
  constructor(props: ButtonProps) {
    super({
      page: props.page,
      type: props.type || 'button',
      events: {
        click: (event: Event) => {
          if (props.type !== 'submit') {
            event.preventDefault();
          }
        },
      },
      ...props,
    });
  }
  override render() {
    return `
      <button class='button' type='{{ type }}'>{{ text }}</button>
    `;
  }
}

export default Button;
