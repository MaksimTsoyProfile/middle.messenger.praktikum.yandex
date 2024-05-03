import EventBus from './EventBus.ts';

export enum StoreEvents {
  UPDATED = 'updated',
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Indexed<T = any> = {
  [key in string]: T;
};

export type User = {
  id: number;
  avatar: string;
  email: string;
  login: string;
  firstName: string;
  secondName: string;
  displayName: string;
  phone: string;
};

export type ChatUser = {
  avatar: string;
  display_name: string;
  first_name: string;
  id: number;
  login: string;
  role: string;
  second_name: string;
};

export type Chat = {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  created_by: number;
  last_message: {
    content: string;
    id: number;
    time: string;
  };
  time: Date;
  content: string;
};

export type MessageType = {
  chat_id: number;
  content: string;
  file: null;
  id: number;
  is_read: boolean;
  time: string;
  type: 'message';
  user_id: number;
};

export type MessageItemProps = {
  isMy: boolean;
  isMessage?: boolean;
  user: User;
} & MessageType;

type StateType = {
  user: User;
  chats: Chat[];
  selectedChat: number;
  messages: MessageItemProps[];
  chatUsers: User[];
  currentChat: Chat | null;
  socket: WebSocket | null;
};

const set = <K extends keyof StateType>(
  object: Indexed | unknown,
  path: K,
  value: StateType[K],
): Indexed | unknown => {
  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }
  if (typeof object !== 'object' || object === null) {
    return object;
  }
  const keys = path.split('.');
  const currentObj: Indexed = object;

  keys.reduce((acc, key, index) => {
    if (index === keys.length - 1) {
      acc[key] = value;
    } else {
      acc[key] = typeof acc[key] === 'object' ? acc[key] : {};
    }
    return acc[key];
  }, currentObj);

  return object;
};

const initialState = {
  user: {
    id: 0,
    avatar: '',
    email: '',
    login: '',
    firstName: '',
    secondName: '',
    displayName: '',
    phone: '',
  },
  chats: [],
  selectedChat: 0,
  messages: [],
  chatUsers: [],
  currentChat: null,
  socket: null,
};

class Store extends EventBus {
  private state: StateType = initialState;

  public getState() {
    return this.state;
  }

  public set<K extends keyof StateType>(path: K, value: StateType[K]) {
    set(this.state, path, value);
    this.emit(StoreEvents.UPDATED);
  }
}

export default new Store();
