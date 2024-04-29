import AuthApi, {
  LoginData,
  PasswordsData,
  ProfileData,
  RegisterData,
} from '../api/AuthApi.ts';
import store from '../shared/Store.ts';

const authApi = new AuthApi();

class UserController {
  public async signIn(data: LoginData) {
    try {
      return await authApi.signIn(data);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  public async signUp(data: RegisterData) {
    try {
      const response = await authApi.signUp(data);
      if (response instanceof XMLHttpRequest && response.status === 200) {
        const data = JSON.parse(response.response);
        store.set('user', data);
      }
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  public async getUser() {
    try {
      const response = await authApi.getUser();
      if (response instanceof XMLHttpRequest && response.status === 200) {
        const data = JSON.parse(response.response);
        store.set('user', data);
      }
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  public async editProfile(userdata: ProfileData) {
    try {
      const response = await authApi.editUser(userdata);
      if (response instanceof XMLHttpRequest && response.status === 200) {
        const data = JSON.parse(response.response);
        store.set('user', data);
      }
      this.getUser();
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  public async editAvatar(formData: FormData) {
    try {
      await authApi.editAvatar(formData);
      this.getUser();
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  public async editPassword(passwordsData: PasswordsData) {
    try {
      const response = await authApi.editPassword(passwordsData);
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  public async logout() {
    try {
      return await authApi.logout();
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

export default UserController;
