import { Chat } from '../../shared/Store.ts';
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
  const data = { ...state };
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
            }),
        )
      : [];
  return {
    ...data,
    ChatsComponent,
  };
});

export default chatUserListConnect(ChatUserList);
