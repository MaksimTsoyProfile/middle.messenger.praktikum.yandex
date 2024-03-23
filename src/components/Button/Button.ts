import Block from '../../shared/Block.ts';

type ButtonProps = {
  text: string;
  page: string;
};

class Button extends Block {
  constructor(props: ButtonProps) {
    super({
      text: props.text,
      page: props.page,
    });
  }
  override render() {
    return `
      <button class='button' page='{{ page }}'>{{ text }}</button>
    `;
  }
}

export default Button;
