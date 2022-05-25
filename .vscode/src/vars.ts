import {Dimensions, Platform} from 'react-native';

const {width, height} = Dimensions.get('window');

export default {
  text: {
    ...Platform.select({
      ios: {fontFamily: 'San Francisco'},
      android: {fontFamily: 'Roboto'},
    }),
  },
  colors: {
    green: '#20bf55',
    blue: '#0B4F6C',
    lightBlue: '#01BAEF',
    white: '#FBFBFF',
    gray: '#757575',
    darkGray: '#323232',
  },
  width,
  height,
};
