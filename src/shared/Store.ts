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

export type Chat = {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  created_by: number;
  last_message: {
    user: User;
  };
  time: Date;
  content: string;
};

type StateType = {
  user: User;
  chats: Chat[];
  selectedChat: number;
  [key: string]: unknown;
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
