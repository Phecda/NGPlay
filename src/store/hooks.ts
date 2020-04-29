import { useSelector, useDispatch } from 'react-redux';
import Types from 'local-types';
import { Dispatch } from 'redux';

type ReduxStateKey = keyof Types.RootState;
export function useReduxState<K extends ReduxStateKey>(
  key: K
): Types.RootState[K] {
  return useSelector((state: Types.RootState) => state[key]);
}

/**
 * 获取 dispatch 对象
 *
 * @example
 * const dispatch = useReduxDispatch();
 * dispatch(rootActions.userActions.onUpdateUserInfo({ nickname: 'test' }));
 */
export function useReduxDispatch() {
  return useDispatch<Dispatch<Types.RootAction>>();
}
