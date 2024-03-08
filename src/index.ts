import Handlebars from 'handlebars';
import * as Components from './components';
import * as Contents from './contents';
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

type Pages = Record<string, string>;

const pages: Pages = {
  login: LoginPage,
  register: RegisterPage,
  '404': Page404,
  '500': Page500,
  profile: ProfilePage,
  editProfile: EditProfilePage,
  editPassword: EditPasswordPage,
  chat: ChatPage,
};

const navigate = (page: string) => {
  const root = document.querySelector('#app');
  const pageString: string | undefined = pages[page];

  if (root && pageString) {
    const compiledTemplate = Handlebars.compile(pageString);
    root.innerHTML = compiledTemplate({});
  }
};
Object.entries(Components).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component);
});
Object.entries(Contents).forEach(([name, content]) => {
  Handlebars.registerPartial(name, content);
});

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
