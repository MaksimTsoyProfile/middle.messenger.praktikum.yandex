//language=hbs

export default `
  <main class='chat-container'>
    <div class='chat-container__user-list'>
      {{> ChatUserList }}
    </div>
    <div class='chat-container__chat-view'>
      {{> ChatView name='Иван' }}
    </div>
  </main>
`;
