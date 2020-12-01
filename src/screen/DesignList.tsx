import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { BGScroll, BGSection } from '../component/View/background';
import { colorPreset } from '../design';
import {
  useDynamicStyleSheet,
  useDynamicValue,
  DynamicStyleSheet,
  useDarkMode,
  useDarkModeContext,
} from 'react-native-dark-mode';
import { ListItem, Divider, Card } from '../component/View';

const dynamicStyles = new DynamicStyleSheet({
  rightSquare: { width: 40, height: 40 },
});
const { labelColor, rainbow } = colorPreset;

const DesignList = () => {
  const styles = useDynamicStyleSheet(dynamicStyles);
  const currentMode = useDarkModeContext();
  return (
    <BGScroll>
      <Card round>
        {Object.keys(labelColor).map(name => {
          return (
            <ListItem
              title={name}
              key={name}
              titleStyle={{
                color: labelColor[name as keyof typeof labelColor][currentMode],
              }}
            />
          );
        })}
      </Card>
      <Card round>
        {Object.keys(rainbow).map(name => {
          const color = rainbow[name as keyof typeof rainbow];
          return (
            <ListItem
              title={name}
              key={name}
              titleStyle={{
                color: color[currentMode],
              }}
              rightElement={
                <>
                  <View
                    style={[
                      styles.rightSquare,
                      { backgroundColor: color.light },
                    ]}
                  />
                  <View
                    style={[
                      styles.rightSquare,
                      { backgroundColor: color.dark },
                    ]}
                  />
                </>
              }
            />
          );
        })}
      </Card>
    </BGScroll>
  );
};
DesignList.whyDidYouRender = true;
export default DesignList;
