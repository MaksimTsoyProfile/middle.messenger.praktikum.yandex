import Block from '../../shared/Block.ts';

type ChatInputProps = {
  value: string;
};

class ChatInput extends Block {
  constructor(props: ChatInputProps) {
    super({
      value: props.value,
    });
  }
  override render() {
    return `
      <div class='chat-input'>
        <input
          class='chat-input__input'
          type='text'
          name='message'
          value='{{ value }}'
          placeholder='Сообщение'
        />
      </div>
    `;
  }
}

export default ChatInput;
