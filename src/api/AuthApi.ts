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

  getUser() {
    return httpClient.get(`/auth/user`, {});
  }

  logout() {
    return httpClient.post(`/auth/logout`, {});
  }
}

export default AuthApi;
