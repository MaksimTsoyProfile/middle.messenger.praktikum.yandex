import Block from '../../shared/Block.ts';

type ChatMessagesProps = {
  date: string;
  messages: object[];
};

class ChatMessages extends Block {
  constructor(props: ChatMessagesProps) {
    super({
      date: props.date,
      messages: props.messages,
    });
  }
  override render() {
    return `
      <div class='chat-messages'>
        <div class='chat-messages__date'>
          {{ date }}
        </div>
        {{{ messages }}}
      </div>
    `;
  }
}

export default ChatMessages;
