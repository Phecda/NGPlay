import React, { useCallback, useState } from 'react';
import { BGScroll, Card, ListItem, Divider } from '../component/View';
import { useReduxDispatch, useReduxState } from '../store/hooks';
import { rootActions } from '../store';
import { Alert } from 'react-native';
import BioAuth, {
  Biometrics,
  FingerprintScannerError,
} from 'react-native-fingerprint-scanner';

const LoginScreen = () => {
  const { list, current } = useReduxState('user');
  const dispatch = useReduxDispatch();

  const [userName, setUserName] = useState(current?.name);
  const [biometricType, setBiometricType] = useState<Biometrics>();

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

  const authWithBio = useCallback(async () => {
    try {
      await BioAuth.authenticate({});
      Alert.alert('Success');
    } catch (err) {
      const { message, name }: FingerprintScannerError = err;
      Alert.alert(name, message);
    }
    BioAuth.release();
  }, []);

  React.useEffect(() => {
    BioAuth.isSensorAvailable()
      .then(setBiometricType)
      .catch(() => {});
  }, []);

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
        {!!biometricType && (
          <>
            <Divider />
            <ListItem
              title={`Auth with ${biometricType}`}
              onPress={authWithBio}
            />
          </>
        )}
      </Card>
    </BGScroll>
  );
};

export default LoginScreen;
