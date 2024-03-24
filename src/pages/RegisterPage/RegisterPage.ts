import Block from '../../shared/Block.ts';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Link } from '../../components/Link';
// import { Dialog } from '../../components/Dialog';

class RegisterPage extends Block {
  constructor() {
    super({
      // Dialog: new Dialog({
      // }),
      EmailInput: new Input({
        type: 'email',
        name: 'email',
        label: 'Почта',
        value: 'pochta@yandex.ru',
        error: '',
      }),
      LoginInput: new Input({
        type: 'text',
        name: 'login',
        label: 'Логин',
        value: 'ivanivanov',
      }),
      FirstNameInput: new Input({
        type: 'text',
        name: 'first_name',
        label: 'Имя',
        value: 'Иван',
      }),
      SecondNameInput: new Input({
        type: 'text',
        name: 'second_name',
        label: 'Фамилия',
        value: 'Иванов',
      }),
      PhoneInput: new Input({
        type: 'text',
        name: 'phone',
        label: 'Телефон',
        value: '+7 (909) 967 30 30',
      }),
      PasswordInput: new Input({
        type: 'password',
        name: 'password',
        label: 'Пароль',
        value: 'Пароль',
      }),
      ReplacePasswordInput: new Input({
        type: 'password',
        name: 'password',
        label: 'Пароль (еще раз)',
        value: 'Пароль',
      }),
      Button: new Button({
        text: 'Зарегистрироваться',
        page: 'chat',
      }),
      Link: new Link({
        text: 'Войти',
        page: 'login',
      }),
    });
  }
  override render() {
    return `
      <div class='wrapper'>
        <div class='dialog'>
          <main>
            <form class="register-container">
              <div class='register-body'>
                <h2 class='register-body__title'>Регистрация</h2>
                <div class='register-body__input-block'>
                  {{{ EmailInput }}}
                </div>
                <div class='register-body__input-block'>
                  {{{ LoginInput }}}
                </div>
                <div class='register-body__input-block'>
                  {{{ FirstNameInput }}}
                </div>
                <div class='register-body__input-block'>
                   {{{ SecondNameInput }}}
                </div>
                <div class='register-body__input-block'>
                   {{{ PhoneInput }}}
                </div>
                <div class='register-body__input-block'>
                  {{{ PasswordInput }}}
                </div>
                <div class='register-body__input-block'>
                  {{{ ReplacePasswordInput }}}
                </div>
              </div>
              <div class='register-footer'>
                <div class='register-footer__authorize'>{{{ Button }}}</div>
                <div class='register-footer__unauthorized'>{{{ Link }}}</div>
              </div>
            </form>
          </main>
        </div>
      </div>
    `;
  }
}

export default RegisterPage;
