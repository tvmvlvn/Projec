import React, {useEffect} from 'react';
import {StyleSheet, View, Text, TouchableWithoutFeedback} from 'react-native';
import vars from '../../vars';

type Props = {
  visible: boolean;
  title: string;
  buttonTitle: string;
  timeout?: number;
  onTimeout: () => void;
  onPress: () => void;
};

const style = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  content: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: vars.colors.darkGray,
    borderRadius: 4,
  },
  text: {
    color: vars.colors.white,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  button: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: vars.colors.green,
    fontWeight: 'bold',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
});

export default function SnackBar(props: Props): JSX.Element | null {
  const {
    visible,
    title,
    buttonTitle,
    timeout = 5500,
    onTimeout,
    onPress,
  } = props;

  useEffect(() => {
    if (visible) {
      const id = setTimeout(() => {
        onTimeout();
      }, timeout);
      return () => clearTimeout(id);
    }
    return () => undefined;
  }, [visible, timeout, onTimeout]);

  if (!visible) return null;

  return (
    <View style={style.container}>
      <View style={style.content}>
        <Text style={[vars.text, style.text]}>{title}</Text>
        <TouchableWithoutFeedback onPress={onPress} style={style.button}>
          <Text style={[vars.text, style.buttonText]}>{buttonTitle}</Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}
