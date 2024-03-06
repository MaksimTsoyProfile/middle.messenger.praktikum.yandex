//language=hbs

export default `
  <div class='profile-container'>
    <div class='profile-container__avatar'>
      {{> Avatar src='' }}
    </div>
    <div class='profile-container__title'>
      <h2>{{name}}</h2>
    </div>
    <div class='profile-container__input'>
      {{> InputField name='email' type='email' value='pochta@yandex.ru' label='Почта' disabled=false }}
    </div>
    <div class='profile-container__input'>
        {{> InputField name='login' type='text' value='ivanov' label='Логин' disabled=true }}
    </div>
    <div class='profile-container__input'>
        {{> InputField name='first_name' type='text' value='Иван' label='Имя' disabled=true }}
    </div>
    <div class='profile-container__input'>
        {{> InputField name='second_name' type='text' value='Иванов' label='Фамилия' disabled=true }}
    </div>
    <div class='profile-container__input'>
        {{> InputField name='display_name' type='text' value='Иван' label='Имя в чате' disabled=true }}
    </div>
    <div class='profile-container__input'>
        {{> InputField name='phone' type='text' value='+7 (909) 967 30 30' label='Телефон' disabled=true }}
    </div>
    <div class='profile-container__links'>
      <div class='profile-container__links__item'>
        {{> Link page='' text='Изменить данные' }}
      </div>
      <div class='profile-container__links__item'>
        {{> Link page='' text='Изменить пароль' }}
      </div>
      <div class='profile-container__links__item-danger'>
        {{> Link page='' text='Выйти' danger=true }}
      </div>
    </div>
  </div>
`;
