import { Avatar } from '../../components/Avatar';
import { Link } from '../../components/Link';
import { Button } from '../../components/Button';
import { InputField } from '../../components/InputField';
import Block from '../../shared/Block.ts';

type ProfileContentProps = {
  name?: string;
  src?: string;
  notEdit: boolean;
};

class ProfileContent extends Block {
  constructor(props: ProfileContentProps) {
    super({
      Avatar: new Avatar({
        src: props.src || '',
      }),
      InputFieldEmail: new InputField({
        name: 'email',
        type: 'email',
        value: 'pochta@yandex.ru',
        label: 'Почта',
        disabled: props.notEdit,
      }),
      InputFieldLogin: new InputField({
        name: 'login',
        type: 'text',
        value: 'Ivanov',
        label: 'Логин',
        disabled: props.notEdit,
      }),
      InputFieldFirstName: new InputField({
        name: 'first_name',
        type: 'text',
        value: 'Иван',
        label: 'Имя',
        disabled: props.notEdit,
      }),
      InputFieldSecondName: new InputField({
        name: 'second_name',
        type: 'text',
        value: 'Иванов',
        label: 'Фамилия',
        disabled: props.notEdit,
      }),
      InputFieldDisplayName: new InputField({
        name: 'display_name',
        type: 'text',
        value: 'Иван',
        label: 'Имя в чате',
        disabled: props.notEdit,
      }),
      InputFieldPhone: new InputField({
        name: 'phone',
        type: 'text',
        value: '+7 (909) 967 30 30',
        label: 'Телефон',
        disabled: props.notEdit,
      }),
      EditProfileLink: new Link({
        page: 'editProfile',
        text: 'Изменить данные',
      }),
      EditPasswordLink: new Link({
        page: 'editPassword',
        text: 'Изменить пароль',
      }),
      ExitLink: new Link({
        page: '',
        text: 'Выйти',
        danger: true,
      }),
      SaveButton: new Button({
        text: 'Сохранить',
        page: 'profile',
      }),
      name: props.name,
    });
  }
  override render() {
    return `
      <form class='profile-container'>
        <div class='profile-container__avatar'>
          <div class='profile-container__avatar-wrapper'>
            {{{ Avatar }}}
          </div>
        </div>
        <div class='profile-container__title'>
          <h2>{{ name }}</h2>
        </div>
        <div class='profile-container__input'>
          {{{ InputFieldEmail }}}
        </div>
        <div class='profile-container__input'>
          {{{ InputFieldLogin }}}
        </div>
        <div class='profile-container__input'>
          {{{ InputFieldFirstName }}}
        </div>
        <div class='profile-container__input'>
          {{{ InputFieldSecondName }}}
        </div>
        <div class='profile-container__input'>
          {{{ InputFieldDisplayName }}}
        </div>
        <div class='profile-container__input'>
          {{{ InputFieldPhone }}}
        </div>
        {{#if notEdit}}
          <div class='profile-container__links'>
            <div class='profile-container__links__item'>
              {{{ EditProfileLink }}}
            </div>
            <div class='profile-container__links__item'>
              {{{ EditPasswordLink }}}
            </div>
            <div class='profile-container__links__item-danger'>
              {{{ ExitLink }}}
            </div>
          </div>
        {{else}}
          <div class='profile-container__save-button'>
            {{{ SaveButton }}}
          </div>
        {{/if}}
      </form>
    `;
  }
}

export default ProfileContent;
