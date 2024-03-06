//language=hbs

export default `
  {{#> Wrapper }}
    {{#> Dialog }}
      <div class='login-container'>
        <div class='login-body'>
          <h2 class='login-body__title'>Вход</h2>
          <div class='login-body__input-block'>
            {{> Input type='text' name='login' label='Логин' value='Test' error='Неверный логин' }}
          </div>
          <div class='login-body__input-block'>
            {{> Input type='password' name='password' label='Пароль' value='Пароль' }}
          </div>
        </div>
        <div class='login-footer'>
          <div class='login-footer__authorize'>{{> Button text='Авторизоваться' page='404' }}</div>
          <div class='login-footer__unauthorized'>{{> Link text='Нет аккаунта?' page='register' }}</div>
        </div>
      </div>
    {{/ Dialog }}
  {{/ Wrapper }}
`;
