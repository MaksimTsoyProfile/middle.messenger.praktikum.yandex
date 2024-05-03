import Block from '../../shared/Block.ts';
import { ErrorContent } from '../../contents/ErrorContent';

class Page500 extends Block {
  constructor() {
    super({
      ErrorContent: new ErrorContent({
        title: '500',
        description: 'Мы уже фиксим',
        linkText: 'Назад к чатам',
        linkPage: '/',
      }),
    });
  }
  override render() {
    return `
      <div class='wrapper'>
        <main class='server-error-container'>
          {{{ ErrorContent }}}
        </main>
      </div>
    `;
  }
}

export default Page500;
