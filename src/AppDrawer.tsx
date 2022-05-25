import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ScannerScreen, {
  options as scannerOptions,
} from './modules/scanner/screen';

const {Navigator, Screen} = createDrawerNavigator();

export default function AppDrawer(): JSX.Element {
  return (
    <Navigator initialRouteName="Scanner">
      <Screen name="Scanner" component={ScannerScreen} />
    </Navigator>
  );
}
