import React, { useState, useCallback, useEffect } from 'react';
import DeviceInfo from 'react-native-device-info';
import { ListItem, Divider, BGList } from '../component/View';

type DeviceInfoMethod = keyof typeof DeviceInfo;

const keys = Object.keys(DeviceInfo).filter(
  (k) => !k.startsWith('use') && !/Sync/.test(k)
) as Array<DeviceInfoMethod>;

const DeviceInfoItem = ({ k }: { k: DeviceInfoMethod }) => {
  const [v, setV] = useState('');
  const onEval = useCallback(async () => {
    const method = DeviceInfo[k];
    let result = '';
    try {
      const r = await method('');
      result = typeof r === 'object' ? JSON.stringify(r) : String(r);
    } catch (error) {
      result = `err: ${error}`;
    }
    setV(result);
  }, [k]);
  useEffect(() => {
    onEval();
  }, [onEval]);
  return <ListItem title={k} subtitle={v} onPress={onEval} />;
};

const RNDeviceInfoList = () => {
  return (
    <BGList
      data={keys}
      ItemSeparatorComponent={Divider}
      renderItem={({ item }) => {
        return <DeviceInfoItem k={item} />;
      }}
    />
  );
};

export default RNDeviceInfoList;
