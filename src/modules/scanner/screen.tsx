import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Vibration} from 'react-native';
import {StackNavigationOptions} from '@react-navigation/stack';
import {Camera} from 'expo-camera';
import {StatusBar} from 'expo-status-bar';
import {BarCodeScanningResult} from 'expo-camera/build/Camera.types';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import ScannerBackground from './components/ScannerBackground';
import {useActions} from '../../utils/react';
import {actions as itemActions} from '../item/duck';

export const options: StackNavigationOptions = {
  title: '',
  headerTransparent: true,
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanner: {
    flex: 1,
  },
});

export default function ScannerScreen(): JSX.Element {
  const [hasPermission, setHasPermission] = useState<boolean>();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const {setValue} = useActions({...itemActions});

  useEffect(() => {
    (async () => {
      const {status} = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const onScan = (result: BarCodeScanningResult) => {
    setValue({value: result.data});
    Vibration.vibrate(70);
    navigation.navigate('Item');
  };

  if (!hasPermission) {
    return (
      <View style={style.container}>
        <ScannerBackground />
      </View>
    );
  }

  return (
    <View style={style.container}>
      {isFocused && (
        <Camera
          onBarCodeScanned={onScan}
          ratio="16:9"
          style={StyleSheet.absoluteFillObject}
        >
          <ScannerBackground />
        </Camera>
      )}
      {/* eslint-disable-next-line react/style-prop-object */}
      <StatusBar style="light" />
    </View>
  );
}
