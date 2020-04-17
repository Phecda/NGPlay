import React from 'react';
import { useWindowDimensions } from 'react-native';
import { screensEnabled } from 'react-native-screens';
import { useNetInfo } from '@react-native-community/netinfo';
import { ListItem, BGScroll, Card, Divider } from '../component/View';
import { MainTabScreenProps } from '../type/Navigation';
import { useI18nStrings } from '../i18n';

declare var global: { HermesInternal: null | {} };

const SystemInfo = ({
  navigation,
  route,
}: MainTabScreenProps<'SystemInfo'>) => {
  const strings = useI18nStrings();
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
      <Card shadow>
        <ListItem
          title="RNDeviceInfo"
          onPress={() => navigation.navigate('RNDeviceInfoList')}
          chevron
        />
        <Divider />
        <ListItem
          title={'RNCWebview'}
          onPress={() =>
            navigation.navigate('WebviewScreen', {
              uri: 'https://www.baidu.com',
            })
          }
          chevron
        />
        <Divider />
        <ListItem
          title={'RNLocalize'}
          onPress={() => navigation.navigate('RNLocalize')}
          rightTitle={strings.name}
          chevron
        />
        <Divider />
        <ListItem
          title={'Camera'}
          onPress={() => navigation.navigate('RNCamera')}
          chevron
        />
      </Card>
    </BGScroll>
  );
};

export default SystemInfo;
