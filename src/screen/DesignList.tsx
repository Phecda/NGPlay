import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { BGScroll } from '../component/View/background';
import { colorPreset } from '../design';
import {
  useDynamicStyleSheet,
  useDynamicValue,
  DynamicStyleSheet,
  useDarkMode,
} from 'react-native-dark-mode';

const dynamicStyles = new DynamicStyleSheet({
  primaryLabel: { color: colorPreset.labelColor.primary },
  secondaryLabel: { color: colorPreset.labelColor.secondary },
  tertiaryLabel: { color: colorPreset.labelColor.tertiary },
  quaternaryLabel: { color: colorPreset.labelColor.quaternary },
  central: { justifyContent: 'center', alignItems: 'center' },
  primaryBG: {
    backgroundColor: colorPreset.backgroundColor.primary,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colorPreset.separator.opaque,
    width: 240,
    height: 100,
  },
  secondaryBG: {
    backgroundColor: colorPreset.backgroundColor.secondary,
    width: 200,
    height: 80,
  },
  tertiaryBG: {
    backgroundColor: colorPreset.backgroundColor.tertiary,
    width: 160,
    height: 60,
  },
  primaryGroupedBG: {
    backgroundColor: colorPreset.groupedBackgroundColor.primary,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colorPreset.separator.opaque,
    width: 240,
    height: 100,
  },
  secondaryGroupedBG: {
    backgroundColor: colorPreset.groupedBackgroundColor.secondary,
    width: 200,
    height: 80,
  },
  tertiaryGroupedBG: {
    backgroundColor: colorPreset.groupedBackgroundColor.tertiary,
    width: 160,
    height: 60,
  },
});

export default () => {
  const styles = useDynamicStyleSheet(dynamicStyles);
  const inDarkMode = useDarkMode();
  return (
    <BGScroll>
      <Text style={styles.primaryLabel}>Primary Label</Text>
      <Text style={styles.secondaryLabel}>Secondary Label</Text>
      <Text style={styles.tertiaryLabel}>Tertiary Label</Text>
      <Text style={styles.quaternaryLabel}>Quaternary Label</Text>
      <View style={[styles.primaryBG, styles.central]}>
        <View style={[styles.secondaryBG, styles.central]}>
          <View style={[styles.tertiaryBG, styles.central]}>
            <Text style={styles.primaryLabel}>Background</Text>
          </View>
        </View>
      </View>
      <View style={[styles.primaryGroupedBG, styles.central]}>
        <View style={[styles.secondaryGroupedBG, styles.central]}>
          <View style={[styles.tertiaryGroupedBG, styles.central]}>
            <Text style={styles.primaryLabel}>
              {'Grouped Background' +
                (inDarkMode ? ', same as background in dark mode' : '')}
            </Text>
          </View>
        </View>
      </View>
    </BGScroll>
  );
};
