import React from 'react';
import { BGList, BGScroll, ListItem, Divider } from '../component/View';
import { MainTabScreenProps } from '../type/Navigation';
import { useI18nStrings } from '../i18n';

const Library = ({ navigation }: MainTabScreenProps<'Library'>) => {
  const strings = useI18nStrings();
  return (
    <BGScroll>
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
        title={'RNCamera'}
        onPress={() => navigation.navigate('RNCamera')}
        chevron
      />
      <Divider />
      <ListItem
        title={'Readable Code'}
        onPress={() => navigation.navigate('RNCode')}
        chevron
      />
      <Divider />
      <ListItem
        title={'Shortcut'}
        onPress={() => navigation.navigate('ShortcutItem')}
        chevron
      />
    </BGScroll>
  );
};

export default Library;
