//language=hbs

export default `
  <main>
    {{#> Wrapper }}
      <div class='not-found-container'>
        {{> ErrorContent
              title='404'
              description='Мы уже фиксим'
              linkText='Назад к чатам'
              linkPage='login'
        }}
      </div>
    {{/ Wrapper }}
  </main>
`;
