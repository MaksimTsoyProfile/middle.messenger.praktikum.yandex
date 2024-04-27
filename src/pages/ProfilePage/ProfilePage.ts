import UserController from '../../controllers/UserController.ts';
import router from '../../router.ts';
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

  componentDidMount() {
    const userController = new UserController();
    userController.getUser().then((response) => {
      if (response instanceof XMLHttpRequest && response.status === 401) {
        router.go('/');
      }
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
