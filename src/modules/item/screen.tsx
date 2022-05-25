import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Clipboard,
  Linking,
  Alert,
  LogBox,
  TouchableOpacity,
} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import {StackNavigationOptions} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {RootState} from '../index';
import {getValueType, ValueType} from './utils';
import vars from '../../vars';
import SnackBar from '../../elements/SnackBar';
import Icon from 'react-native-vector-icons/AntDesign';

export const options: StackNavigationOptions = {
  title: 'Барааны мэдээлэл',
  headerStyle: {
    backgroundColor: vars.colors.lightBlue,
  },
  headerTintColor: vars.colors.white,
  headerTitleAlign: 'center',
  headerTitleStyle: {
    color: vars.colors.white,
    textAlign: 'center',
  },
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 16,
    backgroundColor: vars.colors.white,
  },
  label: {
    color: vars.colors.darkGray,
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    color: vars.colors.gray,
    marginBottom: 8,
  },
  capitalized: {
    textTransform: 'capitalize',
  },
  separator: {
    borderBottomColor: vars.colors.gray,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginTop: 8,
    marginBottom: 10,
  },
  buttonsWrap: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  buttonWrap: {
    width: 110,
  },
});

export default function ItemScreen(): JSX.Element {
  const [copied, setCopied] = useState(false);
  // const {reset} = useActions({...itemActions});
  const navigation = useNavigation();
  const value = useSelector<RootState, string | undefined>(s => s.item.value);

  const valueType = useMemo<ValueType | undefined>(() => {
    if (!value) return undefined;
    return getValueType(value);
  }, [value]);

  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }, []);

  useEffect(() => {
    if (!value) {
      navigation.navigate('Scanner');
    }
  }, [value, navigation]);

  const openUrl = useCallback(async () => {
    if (value) {
      const supported = await Linking.canOpenURL(value);
      if (supported || (valueType && valueType.type === 'PHONE')) {
        await Linking.openURL(value);
      } else {
        Alert.alert(`Could not open this URL: ${value}`);
      }
    }
  }, [value, valueType]);

  const copyValue = useCallback(() => {
    if (value) {
      Clipboard.setString(value);
      setCopied(true);
    }
  }, [value]);

  return (
    <SafeAreaView style={style.container}>
      <ScrollView style={style.scrollView}>
        {/* <View>
          <Text style={[vars.text, style.label]}>Type</Text>
          <Text style={[vars.text, style.text, style.capitalized]}>
            {valueType && valueType.type}
          </Text>
        </View>
        {valueType && valueType.type === 'WIFI' && valueType.data && (
          <>
            <View>
              <Text style={[vars.text, style.label]}>Network Security</Text>
              <Text style={[vars.text, style.text]}>
                {valueType.data.network}
              </Text>
            </View>
            <View>
              <Text style={[vars.text, style.label]}>SSID</Text>
              <Text style={[vars.text, style.text]}>{valueType.data.ssid}</Text>
            </View>
            <View>
              <Text style={[vars.text, style.label]}>Password</Text>
              <Text style={[vars.text, style.text]}>
                {valueType.data.password}
              </Text>
            </View>
          </>
        )}
        {valueType && valueType.type === 'PHONE' && valueType.data && (
          <>
            <View>
              <Text style={[vars.text, style.label]}>Phone</Text>
              <Text style={[vars.text, style.text]}>
                {valueType.data.phone}
              </Text>

            </View>
          </>
        )}
        {valueType &&
          ['ETHEREUM', 'BITCOIN'].includes(valueType.type) &&
          valueType.data && (
            <>
              <View>
                <Text style={[vars.text, style.label]}>Bitcoin wallet</Text>
                <Text style={[vars.text, style.text]}>
                  {valueType.data.wallet}
                </Text>
              </View>
            </>
          )}
        {valueType && valueType.type === 'JSON' && valueType.data && (
          <>
            <View>
              <Text style={[vars.text, style.label]}>JSON</Text>
              <Text style={[vars.text, style.text]}>
                {JSON.stringify(valueType.data.object, null, 2)}
              </Text>
            </View>
          </>
        )}
        <View style={style.separator} /> */}
        <View>
          <Text style={[vars.text, style.label]}>Барааны бар код</Text>
          <Text style={[vars.text, style.text]}>{value && value}</Text>
        </View>
        {valueType && (
          <View style={style.buttonsWrap}>
            {['WEB', 'URL', 'PHONE', 'MAIL'].includes(valueType.type) && (
              <View style={style.buttonWrap}>
                <FontAwesome.Button
                  name="globe"
                  backgroundColor={vars.colors.blue}
                  onPress={openUrl}
                >
                  Open
                </FontAwesome.Button>
              </View>
            )}
            <View style={style.buttonWrap}>
              <FontAwesome.Button
                name="warning"
                backgroundColor={vars.colors.blue}
                onPress={() => setCopied(true)}
              >
                    АЛДАА 
              </FontAwesome.Button>
              
            </View>

            <View style={style.buttonWrap}>
              <FontAwesome.Button
                name="edit"
                backgroundColor={vars.colors.blue}
                onPress={() => setCopied(true)}
              >
               ШИВЭХ
              </FontAwesome.Button>
            </View>
          </View>
        )}
      </ScrollView>
      <SnackBar
        visible={copied}
        title="Барааны алдааны мэдээллийн мэдэгдэл явсан.!"
        buttonTitle="OK"
        onPress={() => setCopied(false)}
        onTimeout={() => setCopied(false)}
      />
    </SafeAreaView>
  );
}
