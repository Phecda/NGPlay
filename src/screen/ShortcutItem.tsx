import React from 'react';
import { BGScroll, Card, ListItem } from '../component/View';
import {
  clearShortcutItems,
  ShortcutItem,
  setShortcutItems,
} from 'react-native-quick-actions';
import { NativeModules, Alert } from 'react-native';

const items: ShortcutItem[] = [
  {
    type: 'Library',
    title: 'Shortcut',
    subtitle: 'Show shortcut page',
    userInfo: { url: 'ngplay://open.my.app/ShortcutItem?id=trigger' },
    icon: 'Compose',
  },
];

const ShortcutPage = () => {
  return (
    <BGScroll>
      <Card round>
        <ListItem title="set" onPress={() => setShortcutItems(items)} />
        <ListItem title="clear" onPress={clearShortcutItems} />
        <ListItem
          title="post"
          onPress={() => {
            NativeModules.RNQuickActionManager.postLaunchOptions();
          }}
        />
        <ListItem
          title="initial"
          onPress={() => {
            Alert.alert(
              '',
              JSON.stringify(NativeModules.RNQuickActionManager.initialAction)
            );
          }}
        />
      </Card>
    </BGScroll>
  );
};

export default ShortcutPage;
