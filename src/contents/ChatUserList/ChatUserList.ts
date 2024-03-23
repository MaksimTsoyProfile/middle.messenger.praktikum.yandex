import { UserItem } from '../../components/UserItem';
import Block from '../../shared/Block.ts';
import { SearchInput } from '../../components/SearchInput';

type ChatUserListProps = {
  value: string;
};

class ChatUserList extends Block {
  constructor(props: ChatUserListProps) {
    super({
      ...props,
      SearchInput: new SearchInput({
        value: props.value,
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
        <a class='chat-user__profile-link' href='#' page='profile'>Профиль ></a>
        <div class='chat-user__search'>
          {{{ SearchInput }}}
        </div>
        {{{ lists }}}
<!--        {{#each lists}}-->
<!--          <div class='chat-user__item'>-->
<!--            {{{ list }}}-->
<!--          </div>-->
<!--        {{/each}}-->
      </div>
    `;
  }
}

export default ChatUserList;
