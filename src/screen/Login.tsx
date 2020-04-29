import React, { useCallback, useState } from 'react';
import { BGScroll, Card, ListItem, Divider } from '../component/View';
import { useReduxDispatch, useReduxState } from '../store/hooks';
import { rootActions } from '../store';
import { Alert } from 'react-native';

const LoginScreen = () => {
  const { list, current } = useReduxState('user');
  const dispatch = useReduxDispatch();

  const [userName, setUserName] = useState(current?.name);

  const onLogin = useCallback(() => {
    const newToken = userName ? 'yes!' + userName : 'no:(';
    if (userName) {
      const filtered = list.filter(u => u.name === userName)[0];
      if (filtered) {
        dispatch(rootActions.userActions.setCurrentUser(filtered));
      } else {
        const newUser = { name: userName };
        dispatch(rootActions.userActions.addUser(newUser));
        dispatch(rootActions.userActions.setCurrentUser(newUser));
      }
    }
    dispatch(rootActions.userActions.setToken(newToken));
  }, [userName, dispatch, list]);

  return (
    <BGScroll>
      <Card round>
        <ListItem
          title="User Name"
          rightTitle={userName}
          onPress={() => {
            Alert.prompt('Your name?', undefined, setUserName);
          }}
        />
        <Divider />
        <ListItem title="login" onPress={onLogin} />
      </Card>
    </BGScroll>
  );
};

export default LoginScreen;
