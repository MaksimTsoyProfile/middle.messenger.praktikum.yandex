import { UserDialog } from '../../contents/UserDialog';
import { ChatController } from '../../controllers/ChatController.ts';
import UserController from '../../controllers/UserController.ts';
import router from '../../router.ts';
import Block from '../../shared/Block.ts';
import { ChatUserList, ChatView } from '../../contents';

class ChatPage extends Block {
  constructor() {
    super({
      isVisible: true,
      isOpen: false,
      ChatUserList: new ChatUserList({
        handleOpen: () => {
          this.open();
        },
      }),
      ChatView: new ChatView({}),
      UserDialog: new UserDialog({
        title: 'Добавить пользователя',
        buttonText: 'Добавить',
        events: {
          submit: (e: Event) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const formData = new FormData(form);
            const data: Record<string, string> = {};
            formData.forEach((value, key) => {
              data[key] = value.toString();
            });
            console.log('add user', data);
            this.close();
          },
          click: (e: Event) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            if (form.tagName === 'SPAN') {
              this.close();
            }
          },
        },
      }),
    });
  }

  componentDidMount() {
    const userController = new UserController();
    const chatController = new ChatController();
    userController.getUser().then((response) => {
      if (response instanceof XMLHttpRequest && response.status === 401) {
        router.go('/');
      } else {
        chatController.getChats().then((response) => {
          console.log((response as XMLHttpRequest).response);
        });
      }
    });
  }

  open() {
    this.setProps({ isOpen: true });
  }

  close() {
    this.setProps({ isOpen: false });
  }

  hide() {
    super.hide();
    this.setProps({ isVisible: false });
  }

  show() {
    super.show();
    this.setProps({ isVisible: true });
  }

  override render() {
    return `
      <main class='chat-container' {{#if isVisible}} style='display: flex;' {{else}} style='display: none;' {{/if}}>
        <div class='chat-container__user-list'>
          {{{ ChatUserList }}}
        </div>
        <div class='chat-container__chat-view'>
          {{{ ChatView }}}
        </div>
        {{#if isOpen}}
        <div class='chat-container__dialog'>
          {{{ UserDialog }}}
        </div>
        {{/if}}
      </main>
    `;
  }
}

export default ChatPage;
