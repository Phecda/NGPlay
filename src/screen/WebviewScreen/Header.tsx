import React, {
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
} from 'react';
import URL from 'url-parse';
import { useToggle } from '@huse/boolean';
import RNCWebview from 'react-native-webview';
import {
  DynamicStyleSheet,
  useDynamicStyleSheet,
  useDynamicValue,
} from 'react-native-dark-mode';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Progress from 'react-native-progress';
import {
  Platform,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  TextInput,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
  LayoutAnimation,
} from 'react-native';
import { colorPreset } from '../../design';
import { WebviewState, WebviewActions, webActions } from './reducer';

const dynamicStyles = new DynamicStyleSheet({
  headerContainer: {
    backgroundColor: colorPreset.backgroundColor.primary,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colorPreset.separator.opaque,
  },
  containerStyle: {
    backgroundColor: colorPreset.backgroundColor.secondary,
    borderRadius: 10,
    margin: 10,
    ...Platform.select({
      ios: {
        height: 36,
        marginTop: 4,
      },
      android: {
        height: 36,
      },
    }),
    overflow: 'hidden',
  },
  labelContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  hostLabel: {
    color: colorPreset.labelColor.primary,
    flex: 1,
    textAlign: 'center',
    fontSize: 17,
  },
  refreshButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainerStyle: {
    backgroundColor: colorPreset.backgroundColor.secondary,
  },
  inputStyle: {
    flex: 1,
    paddingHorizontal: 16,
  },
  progressBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 2,
  },
});

interface Props {
  state: WebviewState;
  dispatch: React.Dispatch<WebviewActions>;
  webview: React.RefObject<RNCWebview>;
}

// EXPERIMENT
function WebviewHeader({ state, dispatch, webview }: Props) {
  const [uri, setUri] = useState<URL>();
  const [focused, toggleFocused] = useToggle(false);
  const progressBarOpacity = new Animated.Value(1);

  const { url, progress, loading } = state;
  useEffect(() => {
    const newUrl = new URL(url);
    setUri(newUrl);
  }, [url]);

  useEffect(() => {
    if (progress === 1) {
      Animated.timing(progressBarOpacity, {
        toValue: 0,
        useNativeDriver: true,
        duration: 1000,
      }).start();
    }
  }, [progress, progressBarOpacity]);

  const onSubmitEditing = useCallback(
    (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
      toggleFocused();
      dispatch(webActions.loadText(e.nativeEvent.text));
    },
    [toggleFocused, dispatch]
  );

  const onPressLoading = useCallback(() => {
    if (loading) {
      webview.current?.stopLoading();
    } else {
      webview.current?.reload();
    }
  }, [loading, webview]);

  useLayoutEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [focused]);

  const styles = useDynamicStyleSheet(dynamicStyles);
  const redColor = useDynamicValue(colorPreset.rainbow.red);
  const greenColor = useDynamicValue(colorPreset.rainbow.green);
  const primaryLabelColor = useDynamicValue(colorPreset.labelColor.primary);
  return (
    <SafeAreaView style={styles.headerContainer}>
      <View style={styles.containerStyle}>
        {focused ? (
          <View style={styles.labelContainer}>
            <TextInput
              defaultValue={url}
              onSubmitEditing={onSubmitEditing}
              style={styles.inputStyle}
              underlineColorAndroid="transparent"
              textContentType="URL"
              selectTextOnFocus
              keyboardType="url"
              returnKeyType="go"
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus
              onBlur={e => {
                toggleFocused();
              }}
              clearButtonMode="while-editing"
            />
          </View>
        ) : (
          <TouchableOpacity
            activeOpacity={1}
            onPress={toggleFocused}
            style={styles.labelContainer}
          >
            <View style={styles.refreshButton}>
              <MaterialCommunityIcons
                name={
                  uri?.protocol === 'https:'
                    ? 'shield-outline'
                    : 'shield-off-outline'
                }
                color={uri?.protocol === 'https:' ? greenColor : redColor}
                size={20}
              />
            </View>
            <Text style={styles.hostLabel}>
              {uri?.hostname.replace(/^www\./, '')}
            </Text>
            <TouchableOpacity
              onPress={onPressLoading}
              style={styles.refreshButton}
            >
              <MaterialCommunityIcons
                name={loading ? 'close' : 'refresh'}
                color={primaryLabelColor}
                size={20}
              />
            </TouchableOpacity>
            <Animated.View
              style={[{ opacity: progressBarOpacity }, styles.progressBar]}
            >
              <Progress.Bar
                progress={progress}
                borderWidth={0}
                borderRadius={0}
                width={null}
                useNativeDriver
              />
            </Animated.View>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

export default WebviewHeader;
