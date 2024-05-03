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

export type ProfileData = {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
};

export type PasswordsData = {
  oldPassword: string;
  newPassword: string;
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

  editUser(data: ProfileData) {
    return httpClient.put('/user/profile', {
      data: data,
    });
  }

  editPassword(data: PasswordsData) {
    return httpClient.put('/user/password', {
      data: data,
    });
  }

  editAvatar(data: FormData) {
    return httpClient.put('/user/profile/avatar', {
      data: data,
    });
  }
}

export default AuthApi;
