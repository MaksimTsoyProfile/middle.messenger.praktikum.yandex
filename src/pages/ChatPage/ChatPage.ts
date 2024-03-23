import Block from '../../shared/Block.ts';
import { ChatUserList } from '../../contents';

class ChatPage extends Block {
  constructor() {
    super({
      ChatUserList: new ChatUserList({
        value: '',
      }),
      // ChatView: new ChatView({
      //   name: 'Иван',
      // }),
    });
  }
  override render() {
    return `
      <main class='chat-container'>
        <div class='chat-container__user-list'>
          {{{ ChatUserList }}}
        </div>
<!--        <div class='chat-container__chat-view'>-->
<!--          {{> ChatView name='Иван' }}-->
<!--        </div>-->
      </main>
    `;
  }
}

export default ChatPage;
