import { withUser } from './shared/connect.ts';
import router from './router.ts';
import {
  LoginPage,
  RegisterPage,
  Page404,
  Page500,
  ChatPage,
  EditPasswordPage,
  EditProfilePage,
  ProfilePage,
} from './pages';

router
  .use('/', withUser(LoginPage))
  .use('/sign-up', RegisterPage)
  .use('/settings', ProfilePage)
  .use('/messenger', ChatPage)
  .use('/edit-password', EditPasswordPage)
  .use('/error-404', Page404)
  .use('/error-500', Page500)
  .use('/edit-profile', EditProfilePage)
  .start();
