import { navigate } from '../../shared/navigate.ts';
import Block from '../../shared/Block.ts';

type LinkProps = {
  href?: string;
  text: string;
  page: string;
  color?: string;
};

class Link extends Block {
  constructor(props: LinkProps) {
    super({
      href: props.href || '#',
      text: props.text,
      page: props.page,
      color: props.color || 'primary',
      events: {
        click: (event: Event) => {
          event.preventDefault();
          navigate(props.page);
        },
      },
    });
  }

  override render() {
    return `
      <a class='link {{color}}' href='{{ href }}' page='{{page}}'>{{ text }}</a>
    `;
  }
}

export default Link;
