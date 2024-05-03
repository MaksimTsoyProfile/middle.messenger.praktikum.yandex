import HTTPTransport from '../shared/HTTPTransport.ts';

export type ChatUsersData = {
  users: number[];
  chatId: number;
};

const httpClient = new HTTPTransport();

class ChatApi {
  getToken(chatId: number) {
    return httpClient.post(`/chats/token/${chatId}`, {});
  }

  getChats() {
    return httpClient.get('/chats', {});
  }

  getChatUsers(chatId: number) {
    return httpClient.get(`/chats/${chatId}/users`, {});
  }

  createChat(title: string) {
    return httpClient.post('/chats', {
      data: { title },
    });
  }

  addUserToChat(data: ChatUsersData) {
    return httpClient.put('/chats/users', {
      data: data,
    });
  }

  deleteChat(chatId: number) {
    return httpClient.delete('/chats', {
      data: { chatId },
    });
  }

  deleteUserFromChat(data: ChatUsersData) {
    return httpClient.delete(`/chats/users`, {
      data: data,
    });
  }
}

export default ChatApi;
