import router from '../../router.ts';
import Block from '../../shared/Block.ts';

type LinkProps = {
  href?: string;
  text: string;
  page: string;
  color?: string;
  events?: unknown;
};

class Link extends Block {
  constructor(props: LinkProps) {
    super({
      href: props.href || '#',
      color: props.color || 'primary',
      events: {
        click: (event: Event) => {
          event.preventDefault();
          router.go(props.page);
        },
      },
      ...props,
    });
  }

  override render() {
    return `
      <a class='link {{color}}' href='{{ href }}' page='{{page}}'>{{ text }}</a>
    `;
  }
}

export default Link;
