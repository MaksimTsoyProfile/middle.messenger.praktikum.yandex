import { RegisterData } from '../../api/AuthApi.ts';
import UserController from '../../controllers/UserController.ts';
import router from '../../router.ts';
import Block from '../../shared/Block.ts';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Link } from '../../components/Link';

class RegisterPage extends Block {
  constructor() {
    super({
      EmailInput: new Input({
        type: 'email',
        name: 'email',
        label: 'Почта',
        value: '',
        error: '',
      }),
      LoginInput: new Input({
        type: 'text',
        name: 'login',
        label: 'Логин',
        value: '',
      }),
      FirstNameInput: new Input({
        type: 'text',
        name: 'first_name',
        label: 'Имя',
        value: '',
      }),
      SecondNameInput: new Input({
        type: 'text',
        name: 'second_name',
        label: 'Фамилия',
        value: '',
      }),
      PhoneInput: new Input({
        type: 'text',
        name: 'phone',
        label: 'Телефон',
        value: '',
      }),
      PasswordInput: new Input({
        type: 'password',
        name: 'password',
        label: 'Пароль',
        value: '',
      }),
      ReplacePasswordInput: new Input({
        type: 'password',
        name: 'password',
        label: 'Пароль (еще раз)',
        value: '',
      }),
      Button: new Button({
        type: 'submit',
        text: 'Зарегистрироваться',
        page: '/chat',
      }),
      Link: new Link({
        text: 'Войти',
        page: '/',
      }),
      events: {
        submit: (e: Event) => {
          this.handleSubmit(e);
        },
      },
    });
  }

  handleSubmit = (event: Event) => {
    const userController = new UserController();
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
      userController.signUp(data as RegisterData).then((response) => {
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
