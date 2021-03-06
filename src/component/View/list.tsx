import React from 'react';
import { ListItem as RNEListItem, ListItemProps } from 'react-native-elements';
import {
  DynamicStyleSheet,
  useDynamicStyleSheet,
} from 'react-native-dark-mode';
import { colorPreset } from '../../design';
import { View, StyleSheet } from 'react-native';

const dynamicStyles = new DynamicStyleSheet({
  containerStyle: {
    backgroundColor: colorPreset.groupedBackgroundColor.secondary,
  },
  titleStyle: {
    color: colorPreset.labelColor.primary,
  },
  subtitleStyle: {
    color: colorPreset.labelColor.primary,
  },
  rightTitleStyle: {
    color: colorPreset.labelColor.primary,
  },
  rightSubtitleStyle: {
    color: colorPreset.labelColor.primary,
  },
  opaqueSeparator: {
    backgroundColor: colorPreset.separator.opaque,
    height: StyleSheet.hairlineWidth,
    marginLeft: 16,
  },
});

export const Divider = () => {
  const styles = useDynamicStyleSheet(dynamicStyles);
  return <View style={styles.opaqueSeparator} />;
};

export const ListItem = ({
  containerStyle,
  titleStyle,
  subtitleStyle,
  rightTitleStyle,
  rightSubtitleStyle,
  chevron,
  ...props
}: ListItemProps) => {
  const styles = useDynamicStyleSheet(dynamicStyles);
  return (
    <RNEListItem
      containerStyle={[styles.containerStyle, containerStyle]}
      titleStyle={[styles.titleStyle, titleStyle]}
      subtitleStyle={[styles.subtitleStyle, subtitleStyle]}
      rightTitleStyle={[styles.rightTitleStyle, rightTitleStyle]}
      rightSubtitleStyle={[styles.rightSubtitleStyle, rightSubtitleStyle]}
      chevron={chevron ?? !!props.onPress}
      {...props}
    />
  );
};
