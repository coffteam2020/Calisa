/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {StatusBar, View, SafeAreaView, Alert} from 'react-native';
import {styles} from './style';
import {withTheme} from 'react-native-paper';
import {containerStyle} from '../../themes/styles';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-community/async-storage';
import i18n from '../../shared/utils/locale/i18n';
import {useStores} from '../../store/useStore';
import WebView from 'react-native-webview';
import {ScreenHeight, ScreenWidth} from '../../shared/utils/dimension/Divices';
import {TouchableOpacity} from 'react-native-gesture-handler';
import TextNormal from '../../shared/components/Text/TextNormal';
import IALocalStorage from '../../shared/utils/storage/IALocalStorage';
import {NavigationService} from '../../navigation';
import {ScreenNames} from '../../route/ScreenNames';
import TouchID from 'react-native-touch-id';
const optionalConfigObject = {
  title: 'Yêu cầu xác thực', // Android
  color: '#e00606', // Android,
  fallbackLabel: 'Hiện mã code', // iOS
};
const HomeScreen = (props) => {
  const {colorsApp} = props.theme;
  useEffect(() => {}, []);
  const logout = async () => {
    await IALocalStorage.resetLocalStorage();
    NavigationService.navigate(ScreenNames.SplashScreen);
  };

  const authenWithTouchId = async () => {
    TouchID.authenticate(
      'to authenticate for next login with biometrics',
      optionalConfigObject,
    )
      .then(async (success) => {
        await IALocalStorage.setDeviceEmail('');
      })
      .catch((error) => {
        alert('Xác thực thất bại');
      });
  };

  const showAlertAskToAutoLogin = () => {
    Alert.alert(
      'Thông báo',
      'Bạn có muốn bật tính năng đăng nhập nhanh, hoặc xoá đăng nhập nhanh?',
      [
        {
          text: 'Huỷ',
          onPress: async () => await IALocalStorage.setDeviceEmail(''),
          style: 'cancel',
        },
        {
          text: 'Giữ',
          onPress: () => {
            authenWithTouchId();
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <View style={[containerStyle.center, containerStyle.defaultBackground]}>
      <StatusBar barStyle={colorsApp.statusBar} />
      <SafeAreaView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TextNormal
            props={props}
            style={[
              containerStyle.textHeaderSmallCenter,
              {width: ScreenWidth / 4},
            ]}
            text={''}
          />
          <TextNormal
            props={props}
            style={[
              containerStyle.textHeaderSmallCenter,
              {width: ScreenWidth / 3},
            ]}
            text={'Home'}
          />
          <TextNormal
            props={props}
            clickable
            onPress={() => logout()}
            style={[
              containerStyle.textContentSmall,
              {
                width: ScreenWidth / 4,
                textAlign: 'right',
                paddingEnd: 20,
                marginTop: 5,
              },
            ]}
            text={'Logout'}
          />
        </View>
        <View style={styles.content}>
          <WebView
            style={{height: '100%', width: ScreenWidth}}
            source={{uri: 'http://171.235.25.249/auth'}}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default withTheme(HomeScreen);
