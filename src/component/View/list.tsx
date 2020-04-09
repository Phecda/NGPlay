import React from 'react';
import { ListItem as RNEListItem, ListItemProps } from 'react-native-elements';
import {
  DynamicStyleSheet,
  useDynamicStyleSheet,
} from 'react-native-dark-mode';
import { colorPreset } from '../../design';

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
});

export const ListItem = ({
  containerStyle,
  titleStyle,
  subtitleStyle,
  rightTitleStyle,
  rightSubtitleStyle,
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
      {...props}
    />
  );
};
