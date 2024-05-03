import Block from '../../shared/Block.ts';

type AvatarProps = {
  src: string;
  events?: unknown;
};

class Avatar extends Block {
  constructor(props: AvatarProps) {
    super({
      events: {
        click: (event: Event) => {
          event.preventDefault();
        },
      },
      ...props,
    });
  }
  override render() {
    return `
      <div class='avatar-container'>
        {{#if src }}
          <img src='{{ src }}' alt='avatar' />
        {{else}}
          <div class='avatar-container__image'>
            <img src='../../icons/mock-icon.png' alt='mock'>
          </div>
        {{/if}}
      </div>
    `;
  }
}

export default Avatar;
