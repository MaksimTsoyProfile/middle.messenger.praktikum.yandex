import Block from '../../shared/Block.ts';

type AvatarProps = {
  src: string;
};

class Avatar extends Block {
  constructor(props: AvatarProps) {
    super({
      src: props.src,
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
