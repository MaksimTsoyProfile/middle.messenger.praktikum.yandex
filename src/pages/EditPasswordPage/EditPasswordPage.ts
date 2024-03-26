import { navigate } from '../../shared/navigate.ts';
import { Avatar } from '../../components/Avatar';
import { InputField } from '../../components/InputField';
import { Button } from '../../components/Button';
import Block from '../../shared/Block.ts';

type EditPasswordPageProps = {
  src?: string;
};

class EditPasswordPage extends Block {
  constructor(props: EditPasswordPageProps) {
    super({
      Avatar: new Avatar({
        src: props.src || '',
      }),
      SaveButton: new Button({
        text: 'Сохранить',
        page: 'profile',
        type: 'submit',
      }),
      OldPasswordInput: new InputField({
        name: 'oldPassword',
        type: 'password',
        value: 'password',
        label: 'Старый пароль',
        disabled: false,
      }),
      NewPasswordInput: new InputField({
        name: 'newPassword',
        type: 'password',
        value: 'password',
        label: 'Новый пароль',
        disabled: false,
      }),
      ReplacePasswordInput: new InputField({
        name: 'newPassword',
        type: 'password',
        value: 'password',
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
      console.log(data);
      navigate('chat');
      form.reset();
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
