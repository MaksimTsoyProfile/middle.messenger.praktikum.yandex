//language=hbs

export default `
  <div class='not-found-container'>
    {{> ErrorContent
          title='404'
          description='Мы уже фиксим'
          linkText='Назад к чатам'
          linkPage='login'
    }}
  </div>
`;