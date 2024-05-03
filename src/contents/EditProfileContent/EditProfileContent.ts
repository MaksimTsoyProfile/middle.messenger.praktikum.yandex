import { config } from '../../shared/config.ts';
import { ProfileData } from '../../api/AuthApi.ts';
import UserController from '../../controllers/UserController.ts';
import router from '../../router.ts';
import { Avatar } from '../../components/Avatar';
import { Button } from '../../components/Button';
import { InputField } from '../../components/InputField';
import Block from '../../shared/Block.ts';
import { connect } from '../../shared/connect.ts';

type EditProfileContentProps = {
  avatar?: string;
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  phone: string;
  AvatarComponent: Avatar;
  InputFieldEmail: InputField;
  InputFieldLogin: InputField;
  InputFieldFirstName: InputField;
  InputFieldSecondName: InputField;
  InputFieldDisplayName: InputField;
  InputFieldPhone: InputField;
};

class EditProfileContent extends Block {
  constructor(props: EditProfileContentProps) {
    super({
      AvatarComponent: props.AvatarComponent,
      InputFieldEmail: props.InputFieldEmail,
      InputFieldLogin: props.InputFieldLogin,
      InputFieldFirstName: props.InputFieldFirstName,
      InputFieldSecondName: props.InputFieldSecondName,
      InputFieldDisplayName: props.InputFieldDisplayName,
      InputFieldPhone: props.InputFieldPhone,
      SaveButton: new Button({
        text: 'Сохранить',
        page: '/settings',
        type: 'submit',
      }),
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
        <div class='profile-container__save-button'>
          {{{ SaveButton }}}
        </div>
      </form>
    `;
  }
}

const editProfileContentConnect = connect((state) => {
  const userData = { ...state.user };
  const AvatarComponent = new Avatar({
    src: userData.avatar ? `${config.baseUrl}/resources${userData.avatar}` : '',
    events: {
      click: () => {
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
      },
    },
  });
  const InputFieldEmail = new InputField({
    name: 'email',
    type: 'email',
    value: userData.email,
    label: 'Почта',
    disabled: false,
  });
  const InputFieldLogin = new InputField({
    name: 'login',
    type: 'text',
    value: userData.login,
    label: 'Логин',
    disabled: false,
  });
  const InputFieldFirstName = new InputField({
    name: 'first_name',
    type: 'text',
    value: userData.first_name,
    label: 'Имя',
    disabled: false,
  });
  const InputFieldSecondName = new InputField({
    name: 'second_name',
    type: 'text',
    value: userData.second_name,
    label: 'Фамилия',
    disabled: false,
  });
  const InputFieldDisplayName = new InputField({
    name: 'display_name',
    type: 'text',
    value: userData.display_name,
    label: 'Имя в чате',
    disabled: false,
  });
  const InputFieldPhone = new InputField({
    name: 'phone',
    type: 'text',
    value: userData.phone,
    label: 'Телефон',
    disabled: false,
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

export default editProfileContentConnect(EditProfileContent);
