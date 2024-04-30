import { Avatar } from '../../components/Avatar';
import Block from '../../shared/Block.ts';

type UserItemProps = {
  id: number;
  self?: boolean;
  name: string;
  text: string;
  date: string;
  counts: number;
  src?: string;
  events: unknown;
  isActive: boolean;
};

class UserItem extends Block {
  constructor(props: UserItemProps) {
    super({
      Avatar: new Avatar({
        src: props.src || '',
      }),
      ...props,
    });
  }
  override render() {
    return `
      <div class='user-item' key={{id}} {{#if isActive}} style='background: #e4edfd' {{/if}}>
        <div class='user-item__avatar'>
          {{{ Avatar }}}
        </div>
        <div class='user-item__content'>
          <h3 class='user-item__content__name'>{{ name }}</h3>
          <h4 class='user-item__content__text'>{{#if self}}<span>Вы: </span>{{/if}}{{ text }}</h4>
        </div>
        <div class='user-item__info'>
          <h3 class='user-item__info__date'>{{ date }}</h3>
          {{#if counts}}
            <span class='user-item__info__counts'>{{ counts }}</span>
          {{/if}}
        </div>
      </div>
    `;
  }
}

export default UserItem;
