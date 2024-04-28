import UserController from '../../controllers/UserController.ts';
import router from '../../router.ts';
import { ProfileContent } from '../../contents/ProfileContent';
import Block from '../../shared/Block.ts';

class ProfilePage extends Block {
  constructor() {
    super({
      isVisible: true,
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

  hide() {
    super.hide();
    this.setProps({ isVisible: false });
  }

  show() {
    super.show();
    this.setProps({ isVisible: true });
  }

  override render() {
    return `
      <main class='profile-page-container' {{#if isVisible}} style='display: flex;' {{else}} style='display: none;' {{/if}}>
        {{{ ProfileContent }}}
      </main>
    `;
  }
}

export default ProfilePage;
