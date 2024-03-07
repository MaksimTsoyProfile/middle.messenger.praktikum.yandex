//language=hbs

export default `
  <div class='user-item'>
    <div class='user-item__avatar'>
      {{> Avatar }}
    </div>
    <div class='user-item__content'>
      <h3 class='user-item__content__name'>{{ name }}</h3>
      <h4 class='user-item__content__text'>{{#if self}}<span>Вы: </span>{{/if}}{{ text }}</h4>
    </div>
    <div class='user-item__info'>
      <h3 class='user-item__info__date'>{{ date }}</h3>
      {{#if counts}}
        <span class='user-item__info__counts'>{{ counts }}</span>
      {{/if}}
    </div>
  </div>
`;
