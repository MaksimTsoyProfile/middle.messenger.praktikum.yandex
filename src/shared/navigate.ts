import {
  ChatPage,
  EditPasswordPage,
  EditProfilePage,
  LoginPage,
  Page404,
  Page500,
  ProfilePage,
  RegisterPage,
} from '../pages';

type Page =
  | LoginPage
  | RegisterPage
  | Page404
  | Page500
  | ProfilePage
  | EditProfilePage
  | EditPasswordPage
  | ChatPage;

type Pages = Record<string, Page>;

export const navigate = (page: string) => {
  const pages: Pages = {
    login: new LoginPage(),
    register: new RegisterPage(),
    '404': new Page404(),
    '500': new Page500(),
    profile: new ProfilePage(),
    editProfile: new EditProfilePage(),
    editPassword: new EditPasswordPage({ src: '' }),
    chat: new ChatPage(),
  };

  const container = document.getElementById('app');
  if (!page) return;
  const block = pages?.[page];
  if (container && block) {
    container.replaceChildren(block.getContent()!);
  }
};
