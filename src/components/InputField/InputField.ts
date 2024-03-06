//language=hbs

export default `
  <div class='input-field-container'>
    <label for='{{ name }}' class='input-field-container__label'>
       {{ label }}
    </label>
    <input
      class='input-field-container__input'
      id='{{ name }}'
      type='{{ type }}'
      name='{{ name }}'
      value='{{ value }}'
      disabled='{{ disabled }}'
    />
  </div>
`;
