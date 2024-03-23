import Block from '../../shared/Block.ts';

type LinkProps = {
  href?: string;
  text: string;
  page: string;
  danger?: boolean;
};

class Link extends Block {
  constructor(props: LinkProps) {
    super({
      href: props.href || '#',
      text: props.text,
      page: props.page,
      danger: props.danger,
    });
  }

  override render() {
    return `
      <a class='link {{#if danger}}danger{{/if}}' href='{{ href }}' page='{{page}}'>{{ text }}</a>
    `;
  }
}

export default Link;
