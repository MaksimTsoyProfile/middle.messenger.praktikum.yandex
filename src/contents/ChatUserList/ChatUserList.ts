import connectWS from '../../shared/connectWS.ts';
import { ChatController } from '../../controllers/ChatController.ts';
import store, { Chat } from '../../shared/Store.ts';
import { Button, Link } from '../../components';
import { UserItem } from '../../components/UserItem';
import Block from '../../shared/Block.ts';
import { SearchInput } from '../../components/SearchInput';
import { connect } from '../../shared/connect.ts';

type ChatUserListProps = {
  handleAddChat: () => unknown;
  ChatsComponent: UserItem[];
};

class ChatUserList extends Block {
  constructor(props: ChatUserListProps) {
    super({
      ...props,
      SearchInput: new SearchInput({
        value: '',
      }),
      ProfileLink: new Link({
        page: '/settings',
        text: 'Профиль >',
        color: 'secondary',
      }),
      AddChatButton: new Button({
        type: 'button',
        text: 'Добавить чат',
        events: {
          click: () => {
            props.handleAddChat();
          },
        },
      }),
      ChatsComponent: props.ChatsComponent,
    });
  }

  override render() {
    return `
      <div class='chat-user'>
        <div class='chat-user__profile-link'>
        {{{ ProfileLink }}}
        </div>
        <div class='chat-user__search'>
          {{{ SearchInput }}}
        </div>
        <div class='chat-user__item'>
          {{{ AddChatButton }}}
        </div>
        <div class='chat-user__item'>
          {{{ AddUserButton }}}
        </div>
        {{{ ChatsComponent }}}
      </div>
    `;
  }
}

const chatUserListConnect = connect((state) => {
  const ChatsComponent =
    state.chats.length > 0
      ? state.chats.map(
          (chat: Chat) =>
            new UserItem({
              id: chat.id,
              name: chat.title,
              text: chat.last_message?.content,
              date: '10:49',
              counts: chat.unread_count,
              isActive: store.getState().selectedChat === chat.id,
              events: {
                click: async () => {
                  const chatController = new ChatController();
                  if (
                    store.getState().socket &&
                    store.getState().selectedChat !== chat.id
                  ) {
                    store.getState().socket?.close();
                  }
                  if (store.getState().selectedChat !== chat.id) {
                    const userId = store.getState().user.id;
                    const chatId = chat.id;
                    try {
                      const response = await connectWS(userId, chatId);
                      if (response) {
                        store.set('socket', response);
                        chatController.getChatUsers(chatId);
                      }
                    } catch (error) {
                      console.log(error);
                      return error;
                    }
                  }
                  store.set('selectedChat', chat.id);
                },
              },
            }),
        )
      : null;
  return {
    ChatsComponent,
    selectedChat: state.selectedChat,
    socket: state.socket,
  };
});

export default chatUserListConnect(ChatUserList);
