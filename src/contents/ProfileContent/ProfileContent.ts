import { config } from '../../shared/config.ts';
import { ProfileData } from '../../api/AuthApi.ts';
import UserController from '../../controllers/UserController.ts';
import router from '../../router.ts';
import { Avatar } from '../../components/Avatar';
import { Link } from '../../components/Link';
import { InputField } from '../../components/InputField';
import Block from '../../shared/Block.ts';
import { connect } from '../../shared/connect.ts';

type ProfileContentProps = {
  avatar?: string;
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  AvatarComponent: Avatar;
  InputFieldEmail: InputField;
  InputFieldLogin: InputField;
  InputFieldFirstName: InputField;
  InputFieldSecondName: InputField;
  InputFieldDisplayName: InputField;
  InputFieldPhone: InputField;
};

class ProfileContent extends Block {
  constructor(props: ProfileContentProps) {
    super({
      AvatarComponent: props.AvatarComponent,
      InputFieldEmail: props.InputFieldEmail,
      InputFieldLogin: props.InputFieldLogin,
      InputFieldFirstName: props.InputFieldFirstName,
      InputFieldSecondName: props.InputFieldSecondName,
      InputFieldDisplayName: props.InputFieldDisplayName,
      InputFieldPhone: props.InputFieldPhone,
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
      display_name: props.display_name,
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

  override render() {
    return `
      <form class='profile-container'>
        <div class='profile-container__avatar'>
          <div class='profile-container__avatar-wrapper'>
            {{{ AvatarComponent }}}
          </div>
        </div>
        <div class='profile-container__title'>
          <h2>{{ display_name }}</h2>
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
      </form>
    `;
  }
}

const profileContentConnect = connect((state) => {
  const userData = { ...state.user };
  const AvatarComponent = new Avatar({
    src: userData.avatar ? `${config.baseUrl}/resources${userData.avatar}` : '',
  });
  const InputFieldEmail = new InputField({
    name: 'email',
    type: 'email',
    value: userData.email,
    label: 'Почта',
    disabled: true,
  });
  const InputFieldLogin = new InputField({
    name: 'login',
    type: 'text',
    value: userData.login,
    label: 'Логин',
    disabled: true,
  });
  const InputFieldFirstName = new InputField({
    name: 'first_name',
    type: 'text',
    value: userData.first_name,
    label: 'Имя',
    disabled: true,
  });
  const InputFieldSecondName = new InputField({
    name: 'second_name',
    type: 'text',
    value: userData.second_name,
    label: 'Фамилия',
    disabled: true,
  });
  const InputFieldDisplayName = new InputField({
    name: 'display_name',
    type: 'text',
    value: userData.display_name,
    label: 'Имя в чате',
    disabled: true,
  });
  const InputFieldPhone = new InputField({
    name: 'phone',
    type: 'text',
    value: userData.phone,
    label: 'Телефон',
    disabled: true,
  });
  return {
    ...userData,
    AvatarComponent,
    InputFieldEmail,
    InputFieldLogin,
    InputFieldFirstName,
    InputFieldSecondName,
    InputFieldDisplayName,
    InputFieldPhone,
  };
});

export default profileContentConnect(ProfileContent);
