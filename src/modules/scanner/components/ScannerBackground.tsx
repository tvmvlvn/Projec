import React, {ReactNode} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import vars from '../../../vars';

import corner from '../../../../assets/scanner/corner.png';

const opacity = 'rgba(0, 0, 0, .7)';

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    position: 'relative',
    backgroundColor: 'black',
  },
  topText: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  layerTop: {
    flex: 1.5,
    backgroundColor: opacity,
    width: '100%',
    justifyContent: 'center',
    zIndex: 1,
  },
  layerCenter: {
    flex: 1,
    flexDirection: 'row',
  },
  layerLeft: {
    flex: 1,
    backgroundColor: opacity,
    zIndex: 1,
  },
  focused: {
    flex: 2,
  },
  layerRight: {
    flex: 1,
    backgroundColor: opacity,
    zIndex: 1,
  },
  layerBottom: {
    flex: 1.5,
    backgroundColor: opacity,
    width: '100%',
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageWrap: {
    zIndex: 5,
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  corner: {
    width: 30,
    height: 30,
    position: 'absolute',
  },
  cornerTopLeft: {
    top: vars.height * 0.38 - 1,
    left: vars.width * 0.25 - 6,
  },
  cornerTopRight: {
    top: vars.height * 0.38 - 1,
    right: vars.width * 0.25 - 6,
    transform: [{rotate: '90deg'}],
  },
  cornerBottomRight: {
    bottom: vars.height * 0.38 - 1,
    right: vars.width * 0.25 - 6,
    transform: [{rotate: '180deg'}],
  },
  cornerBottomLeft: {
    bottom: vars.height * 0.38 - 1,
    left: vars.width * 0.25 - 6,
    transform: [{rotate: '270deg'}],
  },
});

type Props = {
  children?: ReactNode;
};

export default function ScannerBackground(props: Props): JSX.Element {
  const {children} = props;
  return (
    <View style={style.container}>
      <View style={style.imageWrap}>
        <Image source={corner} style={[style.corner, style.cornerTopLeft]} />
        <Image source={corner} style={[style.corner, style.cornerTopRight]} />
        <Image
          source={corner}
          style={[style.corner, style.cornerBottomRight]}
        />
        <Image source={corner} style={[style.corner, style.cornerBottomLeft]} />
      </View>
      <View style={style.layerTop}>
        <Text style={[vars.text, style.topText]}>Ready to Scan</Text>
      </View>
      <View style={style.layerCenter}>
        <View style={style.layerLeft} />
        <View style={style.focused} />
        <View style={style.layerRight} />
      </View>
      <View style={style.layerBottom}>{children && children}</View>
    </View>
  );
}
