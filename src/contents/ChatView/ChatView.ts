//language=hbs

export default `
    <div class='chat-view'>
      <div class='chat-view__header'>
        <div class='chat-view__header__avatar'>
          {{> Avatar }}
        </div>
        <h3 class='chat-view__header__name'>
          {{ name }}
        </h3>
        <div class='chat-view__header__dots'>
          <img src='../../icons/vertical-dots.svg' alt='dots'>
        </div>
      </div>
      <div class='chat-view__body'>
        {{#each (chatMessages) }}
          <div class='chat-view__content'>
            <div class='chat-view__content__date'>
              {{ this.date }}
            </div>
            {{#each this.messages as |message| }}
              {{#if message.isMyself}}
                <div class='chat-view__content__right-message'>
                  {{message.text}}
                  {{#if message.isDone}}
                      <img src='../../icons/done.svg' alt='done'>
                  {{/if}}
                  <span>{{message.time}}</span>
                </div>
              {{else}}
                <div class='chat-view__content__left-message'>
                  {{message.text}}
                  <span>{{message.time}}</span>
                </div>
              {{/if}}
            {{/each}}
          </div>
        {{/each}}
      </div>
      <form class='chat-view__footer'>
        <img src='../../icons/clip.svg' alt='clip' class='chat-view__footer__clip'>
        {{> ChatInput }}
        <img src='../../icons/arrowRightIcon.svg' alt='arrow' class='chat-view__footer__arrow'>
      </form>
    </div>
`;
