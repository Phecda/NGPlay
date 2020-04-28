import {
  QuickActionEmitter,
  QuickActionEventName,
  ShortcutItem,
  popInitialAction,
} from 'react-native-quick-actions';
import { useEffect } from 'react';
import { handleUrl } from './handleDeepLinking';

export default function useQuickAction() {
  useEffect(() => {
    popInitialAction()
      .then(item => {
        handleUrl(item?.userInfo.url);
      })
      .catch(() => {});
    const subscription = QuickActionEmitter.addListener(
      QuickActionEventName,
      (item?: ShortcutItem) => {
        handleUrl(item?.userInfo.url);
      }
    );
    return () => {
      subscription.remove();
    };
  }, []);
}
