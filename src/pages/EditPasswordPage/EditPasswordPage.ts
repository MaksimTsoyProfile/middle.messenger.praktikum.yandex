//language=hbs

export default `
  <div class='edit-password'>
    <div class='edit-password__avatar'>
      {{> Avatar src='' }}
    </div>
    <div class='edit-password__input'>
      {{> InputField name='oldPassword' type='password' value='password' label='Старый пароль' disabled=false }}
    </div>
    <div class='edit-password__input'>
      {{> InputField name='newPassword' type='password' value='password' label='Новый пароль' disabled=false }}
    </div>
    <div class='edit-password__input'>
      {{> InputField name='newPassword' type='password' value='password' label='Повторите новый пароль' disabled=false }}
    </div>
    <div class='edit-password__save-button'>
      {{> Button text='Сохранить' page='profile'}}
    </div>
  </div>
`;
