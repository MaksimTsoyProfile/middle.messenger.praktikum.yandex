import Block from '../../shared/Block.ts';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Link } from '../../components/Link';
// import { Dialog } from '../../components/Dialog';

class LoginPage extends Block {
  constructor() {
    super({
      // Dialog: new Dialog({
      // }),
      LoginInput: new Input({
        type: 'text',
        name: 'login',
        label: 'Логин',
        value: 'Test',
        error: 'Неверный логин',
      }),
      PasswordInput: new Input({
        type: 'password',
        name: 'password',
        label: 'Пароль',
        value: 'Пароль',
        error: 'Неверный логин',
      }),
      Button: new Button({
        text: 'Авторизоваться',
        page: 'chat',
      }),
      Link: new Link({
        text: 'Нет аккаунта?',
        page: 'register',
      }),
    });
  }
  override render() {
    return `
      <div class='wrapper'>
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
    `;
  }
}

export default LoginPage;
