import AuthApi, { LoginData, RegisterData } from '../api/AuthApi.ts';
import store, { User } from '../shared/Store.ts';

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
        store.set('user', { id: response.response });
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

  public async editProfile(userdata: User) {
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
