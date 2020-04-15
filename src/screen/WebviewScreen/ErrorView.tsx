import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  DynamicStyleSheet,
  useDynamicStyleSheet,
  useDynamicValue,
} from 'react-native-dark-mode';
import { colorPreset } from '../../design';

const dynamicStyles = new DynamicStyleSheet({
  background: {
    backgroundColor: colorPreset.backgroundColor.secondary,
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  errorCode: {
    color: colorPreset.labelColor.primary,
  },
  description: {
    color: colorPreset.labelColor.primary,
  },
});

export default function ErrorView({
  code,
  description,
}: {
  code: number;
  description: string;
}) {
  const styles = useDynamicStyleSheet(dynamicStyles);
  const redColor = useDynamicValue(colorPreset.rainbow.red);
  return (
    <SafeAreaView style={styles.background}>
      <MaterialCommunityIcons
        name={'close-circle'}
        size={60}
        color={redColor}
      />
      <Text style={styles.errorCode}>{code}</Text>
      <Text style={styles.description}>{description}</Text>
    </SafeAreaView>
  );
}
