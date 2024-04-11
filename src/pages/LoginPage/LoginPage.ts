import router from '../../router.ts';
import Block from '../../shared/Block.ts';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Link } from '../../components/Link';

class LoginPage extends Block {
  constructor() {
    super({
      LoginInput: new Input({
        type: 'text',
        name: 'login',
        label: 'Логин',
        value: '',
        error: '',
      }),
      PasswordInput: new Input({
        type: 'password',
        name: 'password',
        label: 'Пароль',
        value: '',
        error: '',
      }),
      Button: new Button({
        type: 'submit',
        page: 'chat',
        text: 'Авторизоваться',
      }),
      Link: new Link({
        text: 'Нет аккаунта?',
        page: 'sign-up',
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
      router.go('messenger');
      form.reset();
    }
  };
  override render() {
    return `
      <div class='wrapper'>
        <div class='dialog'>
          <main>
            <form class='login-container'>
              <div class='login-body'>
                <h2 class='login-body__title'>Вход</h2>
                <div class='login-body__input-block'>
                  {{{ LoginInput }}}
                </div>
                <div class='login-body__input-block'>
                  {{{ PasswordInput }}}
                </div>
              </div>
              <div class='login-footer'>
                <div class='login-footer__authorize'>{{{ Button }}}</div>
                <div class='login-footer__unauthorized'>{{{ Link }}}</div>
              </div>
            </form>
          </main>
        </div>
      </div>
    `;
  }
}

export default LoginPage;
