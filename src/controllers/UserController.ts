import AuthApi, { LoginData, RegisterData } from '../api/AuthApi.ts';

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
      return await authApi.signUp(data);
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

export default UserController;
