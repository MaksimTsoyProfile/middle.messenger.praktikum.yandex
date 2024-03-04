//language=hbs

export default `
  {{#> Dialog }}
    <div class="login-container">
      <div class='login-body'>
        <h2 class='login-body__title'>Вход</h2>
        <div class='login-body__input-block'>
          {{> Input type="text" name="login" label="Логин" value="Test" error="Неверный логин" }}
        </div>
        <div class='login-body__input-block'>
          {{> Input type="password" name="password" label="Пароль" value="Пароль" }}
        </div>
      </div>
      <div class='login-footer'>{{> Button text="Авторизоваться" }}</div>
    </div>
  {{/ Dialog }}
`;
