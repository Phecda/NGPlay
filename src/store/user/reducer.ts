import produce from 'immer';
import Types from 'local-types';
import { UserState, UserActionTypes } from './types';
import { Reducer } from 'typesafe-actions';

const initialState: UserState = { list: [] };

const reducer: Reducer<UserState, Types.RootAction> = (
  state = initialState,
  action
) =>
  produce(state, draft => {
    switch (action.type) {
      case UserActionTypes.ADD_USER:
        draft.list.splice(0, 0, action.payload);
        break;
      case UserActionTypes.SET_CURRENT:
        draft.current = action.payload;
        break;
      case UserActionTypes.SET_TOKEN:
        draft.token = action.payload;
    }
  });

export default reducer;
