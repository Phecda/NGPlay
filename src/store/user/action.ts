import { createAction } from 'typesafe-actions';
import { UserActionTypes, User } from './types';

export const setToken = createAction(UserActionTypes.SET_TOKEN)<string>();

export const setCurrentUser = createAction(UserActionTypes.SET_CURRENT)<User>();

export const addUser = createAction(UserActionTypes.ADD_USER)<User>();
