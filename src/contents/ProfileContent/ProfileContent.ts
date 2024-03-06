//language=hbs

export default `
  <div class='profile-container'>
    <div class='profile-container__avatar'>
      {{> Avatar src='' }}
    </div>
    <div class='profile-container__title'>
      <h2>Иван</h2>
    </div>
    <div class='profile-container__input'>
      {{> InputField name='email' type='email' value='pochta@yandex.ru' label='Почта' disabled=notEdit }}
    </div>
    <div class='profile-container__input'>
      {{> InputField name='login' type='text' value='ivanov' label='Логин' disabled=notEdit }}
    </div>
    <div class='profile-container__input'>
      {{> InputField name='first_name' type='text' value='Иван' label='Имя' disabled=notEdit }}
    </div>
    <div class='profile-container__input'>
      {{> InputField name='second_name' type='text' value='Иванов' label='Фамилия' disabled=notEdit }}
    </div>
    <div class='profile-container__input'>
      {{> InputField name='display_name' type='text' value='Иван' label='Имя в чате' disabled=notEdit }}
    </div>
    <div class='profile-container__input'>
      {{> InputField name='phone' type='text' value='+7 (909) 967 30 30' label='Телефон' disabled=notEdit }}
    </div>
    {{#if notEdit}}
      <div class='profile-container__links'>
        <div class='profile-container__links__item'>
          {{> Link page='editProfile' text='Изменить данные' }}
        </div>
        <div class='profile-container__links__item'>
          {{> Link page='' text='Изменить пароль' }}
        </div>
        <div class='profile-container__links__item-danger'>
          {{> Link page='' text='Выйти' danger=true }}
        </div>
      </div>
    {{else}}
      <div class='profile-container__save-button'>
        {{> Button text='Сохранить' page='profile'}}
      </div>
    {{/if}}
  </div>
`;
