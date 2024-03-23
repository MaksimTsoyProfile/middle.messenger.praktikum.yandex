import {
  ChatPage,
  EditPasswordPage,
  EditProfilePage,
  LoginPage,
  Page404,
  Page500,
  ProfilePage,
  RegisterPage,
} from './pages';

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

const navigate = (page: string) => {
  const container = document.getElementById('app');
  const block = pages[page];
  if (container && block) {
    container.replaceChildren(block.getContent()!);
  }
};

document.addEventListener('DOMContentLoaded', () => navigate('login'));

document.addEventListener('click', (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  const page = target.getAttribute('page');
  if (page) {
    navigate(page);
    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
