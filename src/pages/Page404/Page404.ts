//language=hbs

export default `
  {{#> Wrapper }}
    <main class='not-found-container'>
      {{> ErrorContent
            title='404'
            description='Мы уже фиксим'
            linkText='Назад к чатам'
            linkPage='login'
      }}
    </main>
  {{/ Wrapper }}
`;
