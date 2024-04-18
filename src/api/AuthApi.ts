import { User } from '../shared/Store.ts';
import HTTPTransport from '../shared/HTTPTransport.ts';

const httpClient = new HTTPTransport();

export type RegisterData = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type LoginData = {
  login: string;
  password: string;
};

class AuthApi {
  signIn(data: LoginData) {
    return httpClient.post(`/auth/signin`, {
      data: data,
    });
  }

  signUp(data: RegisterData) {
    return httpClient.post(`/auth/signup`, {
      data: data,
    });
  }

  logout() {
    return httpClient.post(`/auth/logout`, {});
  }

  getUser() {
    return httpClient.get(`/auth/user`, {});
  }

  editUser(data: User) {
    return httpClient.put('/user/profile', {
      data: data,
    });
  }
}

export default AuthApi;
