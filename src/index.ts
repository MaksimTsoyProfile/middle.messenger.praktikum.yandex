import { LoginPage } from './pages';

const container = document.getElementById('app');
const loginBlock = new LoginPage();
container?.replaceChildren(loginBlock.getContent()!);
