import { EditProfileContent } from '../../contents/EditProfileContent';
import Block from '../../shared/Block.ts';

class EditPasswordPage extends Block {
  constructor() {
    super({
      EditProfileContent: new EditProfileContent({}),
    });
  }
  override render() {
    return `
      <main class='edit-profile'>
        {{{ EditProfileContent }}}
      </main>
    `;
  }
}

export default EditPasswordPage;
