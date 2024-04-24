import { config } from '../shared/config.ts';
import HTTPTransport from '../shared/HTTPTransport.ts';

export type ChatUsersData = {
  users: number[];
  chatId: number;
};

const httpClient = new HTTPTransport();

class ChatApi {
  chatsURL: string = `${config.baseUrl}/chats`;

  getToken(chatId: number) {
    return httpClient.post(`${this.chatsURL}/token/${chatId}`, {});
  }

  getChats() {
    return httpClient.get(`${this.chatsURL}`, {});
  }

  getChatUsers(chatId: number) {
    return httpClient.get(`${this.chatsURL}/${chatId}/users`, {});
  }

  createChat(title: string) {
    return httpClient.post(`${this.chatsURL}`, {
      body: { title },
    });
  }

  addUserToChat(data: ChatUsersData) {
    return httpClient.put(`${this.chatsURL}/users`, {
      body: data,
    });
  }

  deleteChat(chatId: number) {
    return httpClient.delete(`${this.chatsURL}`, {
      body: { chatId },
    });
  }
}

export default ChatApi;
