import { withChats } from '../../shared/connect.ts';
import { Button, Link } from '../../components';
import { UserItem } from '../../components/UserItem';
import Block from '../../shared/Block.ts';
import { SearchInput } from '../../components/SearchInput';

type ChatUserListProps = {
  handleOpen: () => unknown;
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
      AddUserButton: new Button({
        type: 'button',
        text: 'Добавить пользователя',
        events: {
          click: () => {
            props.handleOpen();
          },
        },
      }),
      lists: [
        new UserItem({
          name: 'Андрей',
          text: 'Изображение',
          date: '10:49',
          counts: 2,
        }),
        new UserItem({
          name: 'Киноклуб',
          text: 'Стикер',
          date: '12:00',
          counts: 2,
        }),
        new UserItem({
          name: 'Илья',
          text: 'Друзья, у меня для вас особенный выпуск новостей! Бла бла бла',
          date: '15:12',
          counts: 4,
        }),
      ],
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
          {{{ AddUserButton }}}
        </div>
        {{{ lists }}}
      </div>
    `;
  }
}

export default withChats(ChatUserList);
