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
} from 'react-native';
import { colorPreset } from '../../design';
import {
  DynamicStyleSheet,
  useDynamicStyleSheet,
} from 'react-native-dark-mode';

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
  ...props
}: BackgroundProps<ScrollViewProps>) => {
  const styles = useDynamicStyleSheet(dynamicStyles);
  return (
    <ScrollView
      style={[white ? styles.whiteBackground : styles.background, style]}
      contentInsetAdjustmentBehavior="automatic"
      {...props}
    />
  );
};

export const BGList = <T extends any>({
  style,
  white,
  ...props
}: BackgroundProps<FlatListProps<T>>) => {
  const styles = useDynamicStyleSheet(dynamicStyles);
  return (
    <FlatList
      style={[white ? styles.whiteBackground : styles.background, style]}
      contentInsetAdjustmentBehavior="automatic"
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
