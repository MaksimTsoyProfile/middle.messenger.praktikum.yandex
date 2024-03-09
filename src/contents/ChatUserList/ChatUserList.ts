//language=hbs

export default `
    <div class='chat-user'>
      <a class='chat-user__profile-link' href='#' page='profile'>Профиль ></a>
      <div class='chat-user__search'>
        {{> SearchInput }}
      </div>
      <div class='chat-user__item'>
        {{> UserItem name='Андрей' text='Изображение' date='10:49' counts='2' }}
      </div>
      <div class='chat-user__item'>
        {{> UserItem name='Киноклуб' text='Стикер' self=true date='12:00' }}
      </div>
      <div class='chat-user__item'>
          {{> UserItem name='Илья' text='Друзья, у меня для вас особенный выпуск новостей! Бла бла бла' date='15:12' counts='4' }}
      </div>
    </div>
`;
