import React, { PropsWithChildren } from 'react';
import {
  ViewProps,
  View,
  SafeAreaView,
  FlatListProps,
  FlatList,
  SectionList,
  SectionListProps,
  ScrollViewProps,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useOriginalCopy } from '@huse/previous-value';
import { colorPreset } from '../../design';
import {
  DynamicStyleSheet,
  useDynamicStyleSheet,
} from 'react-native-dark-mode';
import { useSafeArea } from 'react-native-safe-area-context';

const dynamicStyles = new DynamicStyleSheet({
  background: {
    backgroundColor: colorPreset.groupedBackgroundColor.primary,
    flex: 1,
  },
  whiteBackground: {
    backgroundColor: colorPreset.backgroundColor.primary,
    flex: 1,
  },
});

type BackgroundProps<Props> = PropsWithChildren<Props> & {
  white?: boolean;
};

function useSafeContentContainerStyle(
  contentContainerStyle: ScrollViewProps['contentContainerStyle']
) {
  const { left, right } = useSafeArea();
  const calculated = StyleSheet.compose(contentContainerStyle, {
    paddingLeft: left,
    paddingRight: right,
  });
  const originValue = useOriginalCopy(calculated);
  return originValue;
}

export const BGView = ({
  style,
  white,
  ...props
}: BackgroundProps<ViewProps>) => {
  const styles = useDynamicStyleSheet(dynamicStyles);
  return (
    <View
      style={[white ? styles.whiteBackground : styles.background, style]}
      {...props}
    />
  );
};

export const BGSafe = ({
  style,
  white,
  ...props
}: BackgroundProps<ViewProps>) => {
  const styles = useDynamicStyleSheet(dynamicStyles);
  return (
    <SafeAreaView
      style={[white ? styles.whiteBackground : styles.background, style]}
      {...props}
    />
  );
};

export const BGScroll = ({
  style,
  white,
  contentContainerStyle,
  ...props
}: BackgroundProps<ScrollViewProps>) => {
  const styles = useDynamicStyleSheet(dynamicStyles);
  const safeContentStyle = useSafeContentContainerStyle(contentContainerStyle);
  return (
    <ScrollView
      style={[white ? styles.whiteBackground : styles.background, style]}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={safeContentStyle}
      {...props}
    />
  );
};

export const BGList = <T extends any>({
  style,
  white,
  contentContainerStyle,
  ...props
}: BackgroundProps<FlatListProps<T>>) => {
  const styles = useDynamicStyleSheet(dynamicStyles);
  const safeContentStyle = useSafeContentContainerStyle(contentContainerStyle);
  return (
    <FlatList
      style={[white ? styles.whiteBackground : styles.background, style]}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={safeContentStyle}
      keyExtractor={(_, i) => i.toString()}
      {...props}
    />
  );
};

export const BGSection = <T extends any>({
  style,
  white,
  ...props
}: BackgroundProps<SectionListProps<T>>) => {
  const styles = useDynamicStyleSheet(dynamicStyles);
  return (
    <SectionList
      style={[white ? styles.whiteBackground : styles.background, style]}
      contentInsetAdjustmentBehavior="automatic"
      keyExtractor={(_, i) => i.toString()}
      {...props}
    />
  );
};
