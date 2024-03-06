//language=hbs

export default `
  <div class='profile-container'>
    <div class='profile-container__avatar'>
      {{> Avatar src='' }}
    </div>
    <div class='profile-container__input'>
      {{> InputField name='email' type='email' value='pochta@yandex.ru' label='Почта' disabled=true }}
    </div>
  </div>
`;
