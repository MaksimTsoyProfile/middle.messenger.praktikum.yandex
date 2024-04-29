import ChatApi, { ChatUsersData } from '../api/ChatApi.ts';
import store from '../shared/Store.ts';

const chatApi = new ChatApi();

export class ChatController {
  public async getChats() {
    try {
      const response = await chatApi.getChats();
      if (response instanceof XMLHttpRequest && response.status === 200) {
        store.set('chats', JSON.parse(response.response));
        if (store.getState().chats.length) {
          store.set('selectedChat', store.getState().chats[0].id);
        }
        return response;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  public async getChatUsers(chatId: number) {
    try {
      const response = await chatApi.getChatUsers(chatId);
      if (response instanceof XMLHttpRequest && response.status === 200) {
        store.set('chatUsers', JSON.parse(response.response));
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  public async createChat(title: string) {
    try {
      const response = await chatApi.createChat(title);
      if (response instanceof XMLHttpRequest && response.status === 200) {
        this.getChats();
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  public async deleteChat(chatId: number) {
    try {
      const response = await chatApi.deleteChat(chatId);
      if (response instanceof XMLHttpRequest && response.status === 200) {
        this.getChats();
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  public async addUserToChat(data: ChatUsersData) {
    try {
      const response = await chatApi.addUserToChat(data);
      if (response instanceof XMLHttpRequest && response.status === 200) {
        this.getChatUsers(data.chatId);
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  public async getToken(chatId: number) {
    try {
      const response = await chatApi.getToken(chatId);
      if (response instanceof XMLHttpRequest && response.status === 200) {
        const currentChat = store
          .getState()
          .chats.filter((chat) => chat.id === store.getState().selectedChat)[0];
        store.set('currentChat', currentChat);
        return JSON.parse(response.response);
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
