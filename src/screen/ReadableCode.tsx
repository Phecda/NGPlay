import React, { useState } from 'react';
import { QRCode, BarCode, readCodeFromUri } from '@phecdas/react-native-code';
import ImagePicker from 'react-native-image-crop-picker';
import { BGScroll, Card, ListItem } from '../component/View';
import { Input } from 'react-native-elements';
import { View, StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  codeWrapper: { alignItems: 'center', padding: 20 },
});

const ReadableCode = () => {
  const [qrValue, setQRValue] = useState('A brave new world');
  const [barValue, setBarValue] = useState('1234567890');
  const [readResult, setResult] = useState('');
  return (
    <BGScroll>
      <Card round>
        <Input
          defaultValue={qrValue}
          onSubmitEditing={(e) => setQRValue(e.nativeEvent.text)}
          placeholder="QR Code"
        />
        {!!qrValue && (
          <View style={styles.codeWrapper}>
            <QRCode value={qrValue} size={200} />
          </View>
        )}
      </Card>
      <Card round>
        <Input
          defaultValue={barValue}
          onSubmitEditing={(e) => setBarValue(e.nativeEvent.text)}
          placeholder="Bar Code"
          keyboardType="number-pad"
        />
        {!!barValue && (
          <View style={styles.codeWrapper}>
            <BarCode value={barValue} width={200} height={100} />
          </View>
        )}
      </Card>
      <Card round>
        <ListItem
          title="Read from image..."
          rightTitle={readResult}
          onPress={async () => {
            try {
              const result = await ImagePicker.openPicker({
                mediaType: 'photo',
              });
              const path = Array.isArray(result) ? result[0].path : result.path;
              const value = await readCodeFromUri(
                Platform.OS === 'ios' ? 'file://' : '' + path
              );
              setResult(value);
            } catch (err) {
              setResult('error: ' + err.message);
            }
          }}
        />
      </Card>
    </BGScroll>
  );
};

export default ReadableCode;
