import Block from '../../shared/Block.ts';
import { ErrorContent } from '../../contents/ErrorContent';

class Page404 extends Block {
  constructor() {
    super({
      ErrorContent: new ErrorContent({
        title: '404',
        description: 'Мы уже фиксим',
        linkText: 'Назад к чатам',
        linkPage: '/',
      }),
    });
  }
  override render() {
    return `
      <div class='wrapper'>
        <main class='not-found-container'>
          {{{ ErrorContent }}}
        </main>
      </div>
    `;
  }
}

export default Page404;
