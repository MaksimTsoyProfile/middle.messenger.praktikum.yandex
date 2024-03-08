//language=hbs

export default `
  {{#> Wrapper }}
    {{#> Dialog }}
      <form class="register-container">
        <div class='register-body'>
          <h2 class='register-body__title'>Регистрация</h2>
          <div class='register-body__input-block'>
            {{> Input type='email' name='email' label='Почта' value='pochta@yandex.ru' error='' }}
          </div>
          <div class='register-body__input-block'>
            {{> Input type='text' name='login' label='Логин' value='ivanivanov' }}
          </div>
          <div class='register-body__input-block'>
              {{> Input type='text' name='first_name' label='Имя' value='Иван' }}
          </div>
          <div class='register-body__input-block'>
              {{> Input type='text' name='second_name' label='Фамилия' value='Иванов' }}
          </div>
          <div class='register-body__input-block'>
              {{> Input type='text' name='phone' label='Телефон' value='+7 (909) 967 30 30' }}
          </div>
          <div class='register-body__input-block'>
              {{> Input type='password' name='password' label='Пароль' value='Пароль' }}
          </div>
          <div class='register-body__input-block'>
              {{> Input type='password' name='password' label='Пароль (еще раз)' value='Пароль' }}
          </div>
        </div>
        <div class='register-footer'>
          <div class='register-footer__authorize'>{{> Button text='Зарегистрироваться' }}</div>
          <div class='register-footer__unauthorized'>{{> Link text='Войти' page='login' }}</div>
        </div>
      </div>
    {{/ Dialog }}
  {{/ Wrapper }}
`;
