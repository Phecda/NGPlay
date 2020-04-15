import React, { useCallback } from 'react';
import { SafeAreaView, TouchableOpacity, StyleSheet, View } from 'react-native';
import RNCWebview from 'react-native-webview';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { WebviewState, WebviewActions } from './reducer';
import {
  DynamicStyleSheet,
  useDynamicStyleSheet,
  useDynamicValue,
} from 'react-native-dark-mode';
import { colorPreset } from '../../design';

interface Props {
  state: WebviewState;
  dispatch: React.Dispatch<WebviewActions>;
  webview: React.RefObject<RNCWebview>;
}

const dynamicStyles = new DynamicStyleSheet({
  background: {
    backgroundColor: colorPreset.backgroundColor.primary,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colorPreset.separator.opaque,
  },
  container: {
    height: 44,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Toolbar = ({ state, webview }: Props) => {
  const { canGoBack, canGoForward, loading } = state;
  const styles = useDynamicStyleSheet(dynamicStyles);
  const primaryLabelColor = useDynamicValue(colorPreset.labelColor.primary);
  const secondaryLabelColor = useDynamicValue(colorPreset.labelColor.tertiary);

  const onPressLoading = useCallback(() => {
    if (loading) {
      webview.current?.stopLoading();
    } else {
      webview.current?.reload();
    }
  }, [loading, webview]);

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          disabled={!canGoBack}
          onPress={() => webview.current?.goBack()}
        >
          <EvilIcons
            name="chevron-left"
            size={40}
            color={canGoBack ? primaryLabelColor : secondaryLabelColor}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          disabled={!canGoForward}
          onPress={() => webview.current?.goForward()}
        >
          <EvilIcons
            name="chevron-right"
            size={40}
            color={canGoForward ? primaryLabelColor : secondaryLabelColor}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onPressLoading}>
          <EvilIcons
            name={loading ? 'close' : 'refresh'}
            size={40}
            color={primaryLabelColor}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Toolbar;
