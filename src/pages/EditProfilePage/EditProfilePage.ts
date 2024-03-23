import { ProfileContent } from '../../contents/ProfileContent';
import Block from '../../shared/Block.ts';

class EditPasswordPage extends Block {
  constructor() {
    super({
      ProfileContent: new ProfileContent({
        notEdit: false,
      }),
    });
  }
  override render() {
    return `
      <main class='edit-profile'>
        {{{ ProfileContent }}}
      </main>
    `;
  }
}

export default EditPasswordPage;
