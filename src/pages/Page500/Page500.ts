//language=hbs

export default `
  <main>
    {{#> Wrapper }}
      <div class='server-error-container'>
        {{> ErrorContent
              title='500'
              description='Мы уже фиксим'
              linkText='Назад к чатам'
              linkPage='login'
        }}
      </div>
    {{/ Wrapper }}
  </main>
`;
