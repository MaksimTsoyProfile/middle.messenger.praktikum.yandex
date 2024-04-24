import { config } from '../../shared/config.ts';
import { ProfileData } from '../../api/AuthApi.ts';
import { withUser } from '../../shared/connect.ts';
import UserController from '../../controllers/UserController.ts';
import router from '../../router.ts';
import { Avatar } from '../../components/Avatar';
import { Link } from '../../components/Link';
import { Button } from '../../components/Button';
import { InputField } from '../../components/InputField';
import Block from '../../shared/Block.ts';

type ProfileContentProps = {
  name?: string;
  avatar?: string;
  notEdit: boolean;
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
};

class ProfileContent extends Block {
  constructor(props: ProfileContentProps) {
    console.log('props', props);
    super({
      Avatar: new Avatar({
        src: props.avatar ? `${config.baseUrl}/resources${props.avatar}` : '',
        events: {
          click: () => {
            this.handleEditAvatar();
          },
        },
      }),
      InputFieldEmail: new InputField({
        name: 'email',
        type: 'email',
        value: props.email,
        label: 'Почта',
        disabled: props.notEdit,
      }),
      InputFieldLogin: new InputField({
        name: 'login',
        type: 'text',
        value: props.login,
        label: 'Логин',
        disabled: props.notEdit,
      }),
      InputFieldFirstName: new InputField({
        name: 'first_name',
        type: 'text',
        value: props.first_name,
        label: 'Имя',
        disabled: props.notEdit,
      }),
      InputFieldSecondName: new InputField({
        name: 'second_name',
        type: 'text',
        value: props.second_name,
        label: 'Фамилия',
        disabled: props.notEdit,
      }),
      InputFieldDisplayName: new InputField({
        name: 'display_name',
        type: 'text',
        value: props.display_name,
        label: 'Имя в чате',
        disabled: props.notEdit,
      }),
      InputFieldPhone: new InputField({
        name: 'phone',
        type: 'text',
        value: props.phone,
        label: 'Телефон',
        disabled: props.notEdit,
      }),
      EditProfileLink: new Link({
        page: '/edit-profile',
        text: 'Изменить данные',
      }),
      EditPasswordLink: new Link({
        page: '/edit-password',
        text: 'Изменить пароль',
      }),
      ExitLink: new Link({
        page: '/messenger',
        text: 'Выйти',
        color: 'danger',
        events: {
          click: () => {
            this.handleExit();
          },
        },
      }),
      SaveButton: new Button({
        text: 'Сохранить',
        page: '/settings',
        type: 'submit',
      }),
      name: props.name,
      notEdit: props.notEdit,
      events: {
        submit: (e: Event) => {
          this.handleSubmit(e);
        },
      },
    });
  }

  handleExit = () => {
    const userController = new UserController();
    userController.logout().then((response) => {
      if (response instanceof XMLHttpRequest && response.status === 200) {
        router.go('/');
      }
    });
  };

  handleSubmit = (event: Event) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    let isValid = true;

    for (const errorElement of form.getElementsByClassName('error')) {
      if (errorElement.textContent?.trim() !== '') {
        isValid = false;
        break;
      }
    }

    if (isValid) {
      const formData = new FormData(form);
      const data: Record<string, string> = {};
      formData.forEach((value, key) => {
        data[key] = value.toString();
      });
      const userController = new UserController();
      userController.editProfile(data as ProfileData).then((response) => {
        if (response instanceof XMLHttpRequest && response.status === 200) {
          router.go('/messenger');
          form.reset();
        } else {
          alert('Возникла ошибка');
        }
      });
    }
  };

  handleEditAvatar = () => {
    const userController = new UserController();
    const fileInput = document.createElement('input');
    fileInput.type = 'file';

    fileInput.onchange = async (e: Event) => {
      if (
        e.currentTarget instanceof HTMLInputElement &&
        e.currentTarget.files
      ) {
        const formData = new FormData();
        formData.append('avatar', e.currentTarget.files[0]);
        await userController.editAvatar(formData);
      }
    };

    fileInput.click();
  };

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

export default withUser(ProfileContent);
