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
  [key: string]: unknown;
};

const set = (
  object: Indexed | unknown,
  path: string,
  value: unknown,
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
};

class Store extends EventBus {
  private state: StateType = initialState;

  public getState() {
    return this.state;
  }

  public set(path: string, value: Partial<StateType>) {
    set(this.state, path, value);
    this.emit(StoreEvents.UPDATED);
  }
}

export default new Store();
