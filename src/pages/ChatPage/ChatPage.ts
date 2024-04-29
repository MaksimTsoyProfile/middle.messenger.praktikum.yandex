import { UserListDialog } from '../../contents/UserListDialog';
import { UserDialog } from '../../components/UserDialog';
import { ChatController } from '../../controllers/ChatController.ts';
import UserController from '../../controllers/UserController.ts';
import router from '../../router.ts';
import Block from '../../shared/Block.ts';
import { ChatUserList, ChatView } from '../../contents';

class ChatPage extends Block {
  constructor() {
    super({
      isVisible: true,
      isOpenAddChat: false,
      isOpenAddUser: false,
      isOpenRemoveUser: false,
      ChatUserList: new ChatUserList({
        handleAddChat: () => {
          this.openAddChat();
        },
        handleAddUser: () => {
          this.openAddUser();
        },
      }),
      ChatView: new ChatView({
        handleAddUser: () => {
          this.openAddUser();
        },
        handleRemoveUser: () => {
          this.openRemoveUser();
        },
      }),
      AddChatDialog: new UserDialog({
        title: 'Добавить чат',
        buttonText: 'Добавить',
        inputName: 'title',
        inputLabel: 'Название чата',
        events: {
          submit: (e: Event) => {
            e.preventDefault();
            const chatController = new ChatController();
            const form = e.target as HTMLFormElement;
            const formData = new FormData(form);
            const data: Record<string, string> = {};
            formData.forEach((value, key) => {
              data[key] = value.toString();
            });
            chatController.createChat(data.title);
            this.closeAddChat();
          },
          click: (e: Event) => {
            const form = e.target as HTMLFormElement;
            if (form.tagName === 'SPAN') {
              this.closeAddChat();
            }
          },
        },
      }),
      AddUserDialog: new UserDialog({
        title: 'Добавить пользователя',
        buttonText: 'Добавить',
        inputName: 'userId',
        inputLabel: 'Id пользователя',
        events: {
          submit: (e: Event) => {
            e.preventDefault();
            const chatController = new ChatController();
            const form = e.target as HTMLFormElement;
            const formData = new FormData(form);
            const data: Record<string, string> = {};
            formData.forEach((value, key) => {
              data[key] = value.toString();
            });
            chatController.addUserToChat({
              users: [Number(data.userId)],
              chatId: Number(this.props.selectedChat),
            });
            this.closeAddUser();
          },
          click: (e: Event) => {
            const form = e.target as HTMLFormElement;
            if (form.tagName === 'SPAN') {
              this.closeAddUser();
            }
          },
        },
      }),
      RemoveUserDialog: new UserListDialog({
        title: 'Удалить пользователя',
        events: {
          click: (e: Event) => {
            const form = e.target as HTMLFormElement;
            if (form.tagName === 'SPAN') {
              this.closeRemoveUser();
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

  openAddChat() {
    this.setProps({ isOpenAddChat: true });
  }

  closeAddChat() {
    this.setProps({ isOpenAddChat: false });
  }

  openAddUser() {
    this.setProps({ isOpenAddUser: true });
  }

  closeAddUser() {
    this.setProps({ isOpenAddUser: false });
  }

  openRemoveUser() {
    this.setProps({ isOpenRemoveUser: true });
  }

  closeRemoveUser() {
    this.setProps({ isOpenRemoveUser: false });
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
        {{#if isOpenAddChat}}
        <div class='chat-container__dialog'>
          {{{ AddChatDialog }}}
        </div>
        {{/if}}
        {{#if isOpenAddUser}}
        <div class='chat-container__dialog'>
          {{{ AddUserDialog }}}
        </div>
        {{/if}}
        {{#if isOpenRemoveUser}}
        <div class='chat-container__dialog'>
          {{{ RemoveUserDialog }}}
        </div>
        {{/if}}
      </main>
    `;
  }
}

export default ChatPage;
