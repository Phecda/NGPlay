import React, { useRef, useCallback, useState } from 'react';
import {
  RNCamera,
  TakePictureResponse,
  RNCameraProps,
} from 'react-native-camera';
import { BGScroll, ListItem, Card, Divider } from '../component/View';
import { useSwitch, useToggle } from '@huse/boolean';
import {
  Image,
  useWindowDimensions,
  View,
  SafeAreaView,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { Icon } from 'react-native-elements';
import {
  DynamicStyleSheet,
  useDynamicStyleSheet,
} from 'react-native-dark-mode';
import { colorPreset } from '../design';

const dynamicStyles = new DynamicStyleSheet({
  cameraContainerPortrait: {
    flex: 1,
    backgroundColor: colorPreset.backgroundColor.primary,
  },
  topBar: { flex: 0.5 },
  bottomBar: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flex: 1,
  },
  loadingButton: {
    width: 52,
    height: 52,
    borderRadius: 28,
    backgroundColor: 'white',
    margin: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoResult: {
    flex: 1,
    height: 240,
    resizeMode: 'contain',
    margin: 16,
  },
});

const CameraModal = ({
  visible,
  onCancel,
  onTakenPicture,
}: {
  onCancel: () => void;
  visible: boolean;
  onTakenPicture: (picture: TakePictureResponse) => void;
}) => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  const camera = useRef<RNCamera>(null);
  const [loading, toggleLoading] = useToggle(false);
  const [isBackCamera, toggleCameraType] = useToggle(true);
  const { width, height } = useWindowDimensions();
  const inPortrait = width <= height;
  const previewDimension = inPortrait
    ? { width, height: (width * 4) / 3 }
    : { height, width: (height * 4) / 3 };

  const bottomDirection = inPortrait ? 'row' : 'column';
  const containerDirection = inPortrait ? 'column' : 'row';

  const onShot = useCallback(async () => {
    if (camera.current) {
      toggleLoading();
      const result = await camera.current.takePictureAsync({
        base64: true,
        quality: 0.8,
        pauseAfterCapture: true,
        doNotSave: true,
      });
      toggleLoading();
      onTakenPicture(result);
    }
  }, [onTakenPicture, toggleLoading]);

  return (
    <Modal visible={visible} onRequestClose={onCancel} animationType="slide">
      <View
        style={[
          styles.cameraContainerPortrait,
          { flexDirection: containerDirection },
        ]}
      >
        <SafeAreaView style={styles.topBar} />
        <RNCamera
          ref={camera}
          type={isBackCamera ? 'back' : 'front'}
          style={previewDimension}
          captureAudio={false}
        />
        <SafeAreaView
          style={[
            styles.bottomBar,
            {
              flexDirection: bottomDirection,
            },
          ]}
        >
          <Icon name="close" raised onPress={onCancel} />
          {loading ? (
            <View style={styles.loadingButton}>
              <ActivityIndicator />
            </View>
          ) : (
            <Icon name="camera" raised onPress={onShot} />
          )}
          <Icon
            type="ionicon"
            name="ios-reverse-camera"
            raised
            onPress={toggleCameraType}
          />
        </SafeAreaView>
      </View>
    </Modal>
  );
};

type ParamsOf<T extends (...args: any[]) => any> = T extends (
  ...args: infer U
) => any
  ? U
  : never;

const Scanner = ({
  visible,
  onCancel,
  onScanCode,
}: {
  visible: boolean;
  onCancel: () => void;
  onScanCode: (
    ...args: ParamsOf<Required<RNCameraProps>['onBarCodeRead']>
  ) => void;
}) => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  const camera = useRef<RNCamera>(null);
  const { width, height } = useWindowDimensions();
  const inPortrait = width <= height;
  const previewDimension = inPortrait
    ? { width, height: (width * 4) / 3 }
    : { height, width: (height * 4) / 3 };

  const bottomDirection = inPortrait ? 'row' : 'column';
  const containerDirection = inPortrait ? 'column' : 'row';
  return (
    <Modal visible={visible} onRequestClose={onCancel} animationType="slide">
      <View
        style={[
          styles.cameraContainerPortrait,
          { flexDirection: containerDirection },
        ]}
      >
        <SafeAreaView style={styles.topBar} />
        <RNCamera
          ref={camera}
          style={previewDimension}
          captureAudio={false}
          onBarCodeRead={onScanCode}
        />
        <SafeAreaView
          style={[
            styles.bottomBar,
            {
              flexDirection: bottomDirection,
            },
          ]}
        >
          <Icon name="close" raised onPress={onCancel} />
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const CameraScreen = () => {
  const styles = useDynamicStyleSheet(dynamicStyles);
  const [cameraVisible, openCamera, closeCamera] = useSwitch(false);
  const [scannerVisible, openScanner, closeScanner] = useSwitch(false);
  const [tempPicture, setTempPicture] = useState<TakePictureResponse>();
  const [codeData, setCodeData] = useState<string>();
  const [codeType, setCodeType] = useState<string>();
  return (
    <>
      <BGScroll>
        <Card round>
          <ListItem title="Camera Modal" onPress={openCamera} />
          {tempPicture && <Divider />}
          {tempPicture && (
            <Image
              style={styles.photoResult}
              source={{
                uri: `data:image/jpeg;base64,${tempPicture.base64}`,
              }}
            />
          )}
        </Card>
        <Card round>
          <ListItem title="Scanner Modal" onPress={openScanner} />
          <Divider />
          <ListItem title="data" rightTitle={codeData} />
          <Divider />
          <ListItem title="type" rightTitle={codeType} />
        </Card>
      </BGScroll>
      <CameraModal
        visible={cameraVisible}
        onTakenPicture={(picture) => {
          setTempPicture(picture);
          closeCamera();
        }}
        onCancel={closeCamera}
      />
      <Scanner
        visible={scannerVisible}
        onCancel={closeScanner}
        onScanCode={(e) => {
          setCodeData(e.data);
          setCodeType(e.type);
          closeScanner();
        }}
      />
    </>
  );
};

export default CameraScreen;
