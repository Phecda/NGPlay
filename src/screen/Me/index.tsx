import React, { useCallback } from 'react';
import { BGScroll, Card, ListItem } from '../../component/View';
import { useReduxState, useReduxDispatch } from '../../store/hooks';
import { rootActions } from '../../store';

const MeScreen = () => {
  const { current } = useReduxState('user');
  const dispatch = useReduxDispatch();

  const onLogout = useCallback(() => {
    dispatch(rootActions.userActions.setToken(null));
  }, [dispatch]);

  return (
    <BGScroll white>
      <Card shadow>
        <ListItem title={current?.name ?? '请登录'} />
      </Card>
      <Card shadow>
        <ListItem title={'Log out'} onPress={onLogout} />
      </Card>
    </BGScroll>
  );
};

export default MeScreen;
