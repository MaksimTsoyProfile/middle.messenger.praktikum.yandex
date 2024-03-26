import { ProfileContent } from '../../contents/ProfileContent';
import Block from '../../shared/Block.ts';

class ProfilePage extends Block {
  constructor() {
    super({
      ProfileContent: new ProfileContent({
        notEdit: true,
      }),
    });
  }
  override render() {
    return `
      <main class='profile-page-container'>
        {{{ ProfileContent }}}
      </main>
    `;
  }
}

export default ProfilePage;
