import { withUser } from '../../shared/connect.ts';
import UserController from '../../controllers/UserController.ts';
import router from '../../router.ts';
import store from '../../shared/Store.ts';
import Block from '../../shared/Block.ts';
import { ChatUserList, ChatView } from '../../contents';

class ChatPage extends Block {
  constructor() {
    super({
      ChatUserList: new ChatUserList({
        value: '',
      }),
      ChatView: new ChatView({
        login: store.getState().user.login,
        src: store.getState().user.avatar,
      }),
    });
  }

  override componentDidMount() {
    const userController = new UserController();
    userController.getUser().then((response) => {
      if (response instanceof XMLHttpRequest && response.status === 401) {
        router.go('/');
      }
    });
  }

  override render() {
    return `
      <main class='chat-container'>
        <div class='chat-container__user-list'>
          {{{ ChatUserList }}}
        </div>
        <div class='chat-container__chat-view'>
          {{{ ChatView }}}
        </div>
      </main>
    `;
  }
}

export default withUser(ChatPage);
