import React, { useEffect, useMemo, useState, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';

const styles = StyleSheet.create({
  progressBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 1,
  },
});

export default function ProgressBar({
  progress,
  loading,
}: {
  progress: number;
  loading: boolean;
}) {
  const progressBarOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!loading) {
      Animated.timing(progressBarOpacity, {
        toValue: 0,
        useNativeDriver: true,
        duration: 1000,
      }).start();
    } else {
      progressBarOpacity.setValue(1);
    }
  }, [loading, progressBarOpacity]);

  return (
    <Animated.View
      style={[{ opacity: progressBarOpacity }, styles.progressBar]}
    >
      <Progress.Bar
        progress={progress}
        borderWidth={0}
        borderRadius={0}
        width={null}
        height={4}
        useNativeDriver
      />
    </Animated.View>
  );
}
