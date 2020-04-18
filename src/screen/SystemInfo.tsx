import React from 'react';
import { useWindowDimensions } from 'react-native';
import { screensEnabled } from 'react-native-screens';
import { useNetInfo } from '@react-native-community/netinfo';
import { ListItem, BGScroll, Card, Divider } from '../component/View';
import { MainTabScreenProps } from '../type/Navigation';

declare var global: { HermesInternal: null | {} };

const SystemInfo = ({
  navigation,
  route,
}: MainTabScreenProps<'SystemInfo'>) => {
  const netInfo = useNetInfo();
  const { width, height, fontScale, scale } = useWindowDimensions();
  return (
    <BGScroll white>
      <Card shadow>
        <ListItem
          title={'Hermes'}
          rightTitle={global.HermesInternal ? 'enabled' : 'disabled'}
        />
        <Divider />
        <ListItem
          title={'width'}
          rightTitle={`${Number.isInteger(width) ? width : width.toFixed(2)}pt`}
          rightSubtitle={`${width * scale}px`}
        />
        <Divider />
        <ListItem
          title={'height'}
          rightTitle={`${
            Number.isInteger(height) ? height : height.toFixed(2)
          }pt`}
          rightSubtitle={`${height * scale}px`}
        />
        <Divider />
        <ListItem title={'fontScale'} rightTitle={fontScale.toString()} />
        <Divider />
        <ListItem title={'scale'} rightTitle={scale.toString()} />
        <Divider />
        <ListItem
          title={'screen enabled'}
          rightTitle={screensEnabled().toString()}
        />
      </Card>
      <Card shadow>
        <ListItem title="type" rightTitle={netInfo.type} />
        <Divider />
        <ListItem
          title="isInternetReachable"
          rightTitle={`${netInfo.isInternetReachable}`}
        />
        <Divider />
        <ListItem title="isConnected" rightTitle={`${netInfo.isConnected}`} />
        <Divider />
        <ListItem
          title="details"
          rightTitle={JSON.stringify(netInfo.details)}
        />
      </Card>
    </BGScroll>
  );
};

export default SystemInfo;
