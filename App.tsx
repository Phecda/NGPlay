/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Button,
  NativeModules,
  Picker,
  ScrollView,
  Platform,
} from 'react-native';
import { Text, ListItem, Card } from 'react-native-elements';
import Wechat, { WXShareType, WXShareScene } from './src';

const { BCWechat } = NativeModules;
Wechat.registerApp('wx32beae1b4606079a', 'https://pm.yfchangketong.com/');

const App = () => {
  const [err, setErr] = useState<Error>();
  const [version, setVersion] = useState('');
  const [isWXInstalled, setIsWXInstalled] = useState(false);
  const [apiLevel, setApiLevel] = useState<number | boolean>();
  const [scene, setScene] = useState(WXShareScene.WXSceneSession);

  const constants = BCWechat.getConstants();

  useEffect(() => {
    Wechat.getApiVersion().then(setVersion);
    Wechat.isWXAppInstalled().then(setIsWXInstalled);
    if (Platform.OS === 'android') {
      Wechat.getWXAppSupportAPI().then(setApiLevel);
    } else {
      Wechat.isWXAppSupportApi().then(setApiLevel);
    }
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Card>
        <Text h4>Error</Text>
        <Text>{`${err?.message}`}</Text>
      </Card>
      <ScrollView
        style={{ flex: 1 }}
        contentInsetAdjustmentBehavior="automatic"
      >
        <Text h4>Native</Text>
        {Object.keys(BCWechat).map((k, i) => (
          <Text key={i}>{k}</Text>
        ))}
        <Text h4>Info</Text>
        <ListItem title="version" rightTitle={version} />
        <ListItem title="wx installed" rightTitle={`${isWXInstalled}`} />
        <ListItem title="api support" rightTitle={`${apiLevel}`} />
        <Text h4>Constants</Text>
        {Object.keys(constants).map((k, i) => (
          <ListItem key={k} title={k} rightTitle={`${constants[k]}`} />
        ))}
        <Button title="open WX" onPress={Wechat.openWXApp} />
        <Text h4>分享</Text>
        <Picker selectedValue={scene} onValueChange={v => setScene(v)}>
          <Picker.Item label="对话" value={WXShareScene.WXSceneSession} />
          <Picker.Item label="朋友圈" value={WXShareScene.WXSceneTimeline} />
          <Picker.Item label="收藏" value={WXShareScene.WXSceneFavorite} />
        </Picker>
        <Button
          title="分享文字"
          onPress={() => {
            Wechat.shareMessage({
              type: WXShareType.WXShareTypeText,
              text: 'Some test text',
              scene,
            })
              .then(resp => {
                console.log(resp);
              })
              .catch(setErr);
          }}
        />
        <Button
          title="分享图片"
          onPress={() => {
            Wechat.shareMessage({
              type: WXShareType.WXShareTypeImage,
              title: '标题',
              description: '描述',
              thumbUrl: '',
              scene,
              imageUrl:
                'https://i0.hdslb.com/bfs/archive/45b8d2f84ec662df05b829bbe866cf620833cce5.jpg@412w_232h_1c_100q.jpg',
            });
          }}
        />
        <Button
          title="分享音乐"
          onPress={() => {
            Wechat.shareMessage({
              type: WXShareType.WXShareTypeMusic,
              musicUrl: 'https://music.163.com/#/song?id=1410448577',
              title: '标题',
              description: '描述',
              thumbUrl:
                'https://i0.hdslb.com/bfs/archive/45b8d2f84ec662df05b829bbe866cf620833cce5.jpg@412w_232h_1c_100q.jpg',
              scene,
            });
          }}
        />
        <Button
          title="分享视频"
          onPress={() => {
            Wechat.shareMessage({
              type: WXShareType.WXShareTypeVideo,
              videoUrl:
                'https://www.bilibili.com/video/BV1o7411177j?spm_id_from=333.851.b_7265706f7274466972737431.8',
              title: '标题',
              description: '描述',
              thumbUrl:
                'https://i0.hdslb.com/bfs/archive/45b8d2f84ec662df05b829bbe866cf620833cce5.jpg@412w_232h_1c_100q.jpg',
              scene,
            });
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
