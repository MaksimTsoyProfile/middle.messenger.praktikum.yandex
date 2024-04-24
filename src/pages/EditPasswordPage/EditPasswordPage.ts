import { PasswordsData } from '../../api/AuthApi.ts';
import UserController from '../../controllers/UserController.ts';
import router from '../../router.ts';
import { Avatar } from '../../components/Avatar';
import { InputField } from '../../components/InputField';
import { Button } from '../../components/Button';
import Block from '../../shared/Block.ts';

class EditPasswordPage extends Block {
  constructor() {
    super({
      Avatar: new Avatar({
        src: '',
      }),
      SaveButton: new Button({
        text: 'Сохранить',
        page: '/settings',
        type: 'submit',
      }),
      OldPasswordInput: new InputField({
        name: 'oldPassword',
        type: 'password',
        value: '',
        label: 'Старый пароль',
        disabled: false,
      }),
      NewPasswordInput: new InputField({
        name: 'newPassword',
        type: 'password',
        value: '',
        label: 'Новый пароль',
        disabled: false,
      }),
      ReplacePasswordInput: new InputField({
        name: 'newPassword',
        type: 'password',
        value: '',
        label: 'Повторите новый пароль',
        disabled: false,
      }),
      events: {
        submit: (e: Event) => {
          this.handleSubmit(e);
        },
      },
    });
  }

  handleSubmit = (event: Event) => {
    event.preventDefault();
    const userController = new UserController();
    const form = event.target as HTMLFormElement;
    let isValid = true;

    for (const inputElement of form.getElementsByTagName('input')) {
      inputElement.focus();
      inputElement.blur();
    }

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
      userController.editPassword(data as PasswordsData).then((response) => {
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
      <main>
        <form class='edit-password'>
          <div class='edit-password__avatar'>
            <div class='edit-password__avatar-wrapper'>
              {{{ Avatar }}}
            </div>
          </div>
          <div class='edit-password__input'>
            {{{ OldPasswordInput }}}
          </div>
          <div class='edit-password__input'>
            {{{ NewPasswordInput }}}
          </div>
          <div class='edit-password__input'>
            {{{ ReplacePasswordInput }}}
          </div>
          <div class='edit-password__save-button'>
            {{{ SaveButton }}}
          </div>
        </form>
      </main>
    `;
  }
}

export default EditPasswordPage;
