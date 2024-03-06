//language=hbs

export default `
  <div class='profile-container'>
    <div class='profile-container__avatar'>
      {{> Avatar src='' }}
    </div>
    <div class='profile-container__input'>
      {{> InputField name='email' type='email' value='pochta@yandex.ru' label='Почта' disabled=true }}
    </div>
    <div class='profile-container__input'>
        {{> InputField name='login' type='text' value='pochta@yandex.ru' label='Логин' disabled=true }}
    </div>
    <div class='profile-container__input'>
        {{> InputField name='first_name' type='text' value='pochta@yandex.ru' label='Имя' disabled=true }}
    </div>
    <div class='profile-container__input'>
        {{> InputField name='second_name' type='text' value='pochta@yandex.ru' label='Фамилия' disabled=true }}
    </div>
    <div class='profile-container__input'>
        {{> InputField name='display_name' type='text' value='pochta@yandex.ru' label='Имя в чате' disabled=true }}
    </div>
    <div class='profile-container__input'>
        {{> InputField name='phone' type='text' value='pochta@yandex.ru' label='Телефон' disabled=true }}
    </div>
  </div>
`;
