export interface User {
  name: string;
}

export enum UserActionTypes {
  SET_TOKEN = '@@user/SET_TOKEN',
  SET_CURRENT = '@@user/SET_CURRENT',
  ADD_USER = '@@user/ADD_USER',
}

export interface UserState {
  current?: User;
  token?: string;
  list: User[];
}
