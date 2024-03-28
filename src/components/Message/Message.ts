import Block from '../../shared/Block.ts';

type MessageProps = {
  isMyself?: boolean;
  isDone?: boolean;
  time: string;
  text: string;
};

class Message extends Block {
  constructor(props: MessageProps) {
    super({
      isMyself: props.isMyself,
      isDone: props.isDone,
      time: props.time,
      text: props.text,
    });
  }

  override render() {
    return `
      {{#if isMyself}}
        <div class='right-message'>
          {{text}}
          {{#if isDone}}
            <img src='../../icons/done.svg' alt='done'>
          {{/if}}
          <span>{{time}}</span>
        </div>
      {{else}}
        <div class='left-message'>
          {{text}}
          <span>{{time}}</span>
        </div>
      {{/if}}
    `;
  }
}

export default Message;
