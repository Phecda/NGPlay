import React, { PropsWithChildren } from 'react';
import {
  DynamicStyleSheet,
  useDynamicStyleSheet,
  useDarkMode,
} from 'react-native-dark-mode';
import { ViewProps, View, TouchableOpacity, ViewStyle } from 'react-native';
import { colorPreset } from '../../design';

const dynamicStyles = new DynamicStyleSheet({
  containerStyle: {
    backgroundColor: colorPreset.groupedBackgroundColor.secondary,
    margin: 16,
    marginBottom: 8,
  },
  wrapperStyle: { minHeight: 44 },
  shadowContainer: {
    elevation: 5,
    shadowColor: 'rgba(51,51,51,0.1)',
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 16,
  },
  roundContainer: {
    borderRadius: 8,
  },
  roundWrapper: {
    borderRadius: 8,
    overflow: 'hidden',
  },
});

export type CardProps = ViewProps & {
  onPress?: () => void;
  disabled?: boolean;
  shadow?: boolean;
  round?: boolean;
  containerStyle?: ViewStyle;
  wrapperStyle?: ViewStyle;
};

export const Card = ({
  style,
  children,
  onPress,
  disabled,
  shadow,
  round,
  containerStyle,
  wrapperStyle,
  ...props
}: PropsWithChildren<CardProps>) => {
  const styles = useDynamicStyleSheet(dynamicStyles);
  const inDarkMode = useDarkMode();
  const InnerComponent: React.ComponentClass<any> = onPress
    ? TouchableOpacity
    : View;
  return (
    <View
      style={[
        styles.containerStyle,
        shadow && !inDarkMode && styles.shadowContainer,
        (round || shadow) && styles.roundContainer,
        containerStyle,
      ]}
      {...props}
    >
      <InnerComponent
        style={[
          (round || shadow) && styles.roundWrapper,
          styles.wrapperStyle,
          wrapperStyle,
        ]}
        onPress={onPress}
        disabled={disabled}
      >
        {children}
      </InnerComponent>
    </View>
  );
};
