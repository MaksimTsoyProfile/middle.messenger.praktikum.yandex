//language=hbs

export default `
    <div class='error-container'>
      <h2>{{ title }}</h2>
      <h3>{{ description }}</h3>
      <span>{{> Link text=linkText page=linkPage }}</span>
    </div>
`;
