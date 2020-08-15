/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {StatusBar, View, Image, Platform, TouchableOpacity} from 'react-native';
import {styles} from './style';
import {images} from '../../../assets/index';
import {withTheme} from 'react-native-paper';
import TextNormal from '../../shared/components/Text/TextNormal';
import {containerStyle} from '../../themes/styles';
import AsyncStorage from '@react-native-community/async-storage';
import i18n from '../../shared/utils/locale/i18n';
import IALocalStorage from '../../shared/utils/storage/IALocalStorage';
import {useStores} from '../../store/useStore';
import GradientButton from '../../shared/components/Buttons/GradientButton';
import {OutlinedTextField} from 'react-native-material-textfield';
import {colors} from '../../shared/utils/colors/colors';
import Loading from '../../shared/components/Loading';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AxiosFetcher from '../../api/AxiosFetch';
import * as RNLocalize from 'react-native-localize';

import {ToastHelper} from '../../shared/components/ToastHelper';
import DeviceInfo from 'react-native-device-info';
import publicIP from 'react-native-public-ip';
import {NavigationService} from '../../navigation';
import notifee from '@notifee/react-native';
import TouchID from 'react-native-touch-id';
import {ScreenNames} from '../../route/ScreenNames';
const optionalConfigObject = {
  title: 'Yêu cầu xác thực', // Android
  color: '#e00606', // Android,
  fallbackLabel: 'Hiện mã code', // iOS
};
const LoginScreen = (props) => {
  const {colorsApp} = props.theme;
  const [userName, setUserName] = useState('');
  const [support, setSupport] = useState('');
  const [userNameErr, setUserNameErr] = useState(null);
  const [passwordErr, setPasswordErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [showBio, setShowBio] = useState(false);

  useEffect(() => {
    // askToSaveTouchId();
    detectShowBio();
  }, []);

  const detectShowBio = async () => {
    TouchID.isSupported()
      .then(async (biometryType) => {
        console.log(biometryType);
        // Success code
        if (
          biometryType === 'FaceID' ||
          biometryType === 'TouchID' ||
          biometryType === true
        ) {
          let userName = await IALocalStorage.getDeviceEmail();
          let password = await IALocalStorage.getDevicePass();
          let showBio = await IALocalStorage.getShowBiometrics();
          console.log(userName + "+"+password +'s'+showBio);
          if (userName !== '' && password !== '' && showBio) {
            setShowBio(true);
          } else {
            setShowBio(false);
          }
        } else {
          setShowBio(false);
        }
      })
      .catch((error) => {
        setShowBio(false);
      });
  };
  const askToSaveTouchId = () => {
    TouchID.isSupported()
      .then((biometryType) => {
        // Success code
        if (biometryType === 'FaceID') {
          setSupport('FACEID');
        } else if (biometryType === 'TouchID') {
          setSupport('TOUCHID');
        } else if (biometryType === true) {
          // TouchID đc hỗ trợ trên Android
          setSupport('FAST');
        } else {
          setSupport('');
        }
      })
      .catch((error) => {
        // Mã lỗi nếu thiết bị không hỗ trợ
        console.log(error);
      });
  };
  const onLogin = async () => {
    setIsLoading(true);
    let deviceId = await DeviceInfo.getUniqueId();
    let deviceName = await DeviceInfo.getDeviceId();
    let appVersion = await DeviceInfo.getVersion();
    let country = await RNLocalize.getCountry();
    let ip = await publicIP();
    if (!!userName.trim() && !!password.trim()) {
      AxiosFetcher({
        method: 'POST',
        data: {
          userName: userName,
          password: password,
          deviceId: deviceId,
          isMobileApp: true,
          appOSType: Platform.OS,
          deviceName: deviceName,
          appVersion: appVersion,
          country: country,
          ipAddress: ip,
          appSysVersion: appVersion,
        },
        url: 'api/users/app-login',
        hasToken: false,
      })
        .then(async (val) => {
          setIsLoading(false);
          if (val?.statusCode !== 200) {
            ToastHelper.showError(
              val?.message || 'Could not login with this account',
            );
          } else {
            await notifee.displayNotification({
              title: 'Welcome!',
              body: val?.message || 'Login success',
            });
            await IALocalStorage.setDeviceEmail(userName);
            await IALocalStorage.setDevicePass(password);
            await IALocalStorage.setShowBiometrics(true);
            await IALocalStorage.setUserInfo(val);
            await IALocalStorage.setTokenUserInfo(val?.token || '');
            NavigationService.navigate(ScreenNames.HomeScreen);
          }
        })
        .catch((err) => {
          setIsLoading(false);
          ToastHelper.showError(
            err?.message || 'Opps. Error while trying to log in',
          );
        });
    } else {
      setIsLoading(false);
      if (!password.trim()) {
        setPasswordErr('Password is required');
      }
      if (!userName.trim()) {
        setUserNameErr('Username is required');
      }
    }
  };
  const onLoginSpecial = async (name, pass) => {
    setIsLoading(true);
    let deviceId = await DeviceInfo.getUniqueId();
    let deviceName = await DeviceInfo.getDeviceId();
    let appVersion = await DeviceInfo.getVersion();
    let country = await RNLocalize.getCountry();
    let ip = await publicIP();
    if (name !== '' && pass !== '' && !!name.trim() && !!pass.trim()) {
      AxiosFetcher({
        method: 'POST',
        data: {
          userName: name,
          password: pass,
          deviceId: deviceId,
          isMobileApp: true,
          appOSType: Platform.OS,
          deviceName: deviceName,
          appVersion: appVersion,
          country: country,
          ipAddress: ip,
          appSysVersion: appVersion,
        },
        url: 'api/users/app-login',
        hasToken: false,
      })
        .then(async (val) => {
          setIsLoading(false);
          if (val?.statusCode !== 200) {
            ToastHelper.showError(
              val?.message || 'Could not login with this account',
            );
          } else {
            await notifee.displayNotification({
              title: 'Welcome!',
              body: val?.message || 'Login success',
            });
            await IALocalStorage.setDeviceEmail(userName);
            await IALocalStorage.setDevicePass(password);
            await IALocalStorage.setShowBiometrics(true);
            await IALocalStorage.setUserInfo(val);
            await IALocalStorage.setTokenUserInfo(val?.token || '');
            NavigationService.navigate(ScreenNames.HomeScreen);
          }
        })
        .catch((err) => {
          setIsLoading(false);
          ToastHelper.showError(
            err?.message || 'Opps. Error while trying to log in',
          );
        });
    } else {
      setIsLoading(false);
      if (!password.trim()) {
        setPasswordErr('Password is required');
      }
      if (!userName.trim()) {
        setUserNameErr('Username is required');
      }
    }
  };
  return (
    <View style={[containerStyle.center, containerStyle.defaultBackground]}>
      <StatusBar barStyle={colorsApp.statusBar} hidden />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        style={{alignSelf: 'center', alignContent: 'center', flex: 1}}>
        <View style={styles.content}>
          <Image
            source={images.ico}
            style={styles.img}
            resizeMethod="resize"
            resizeMode="cover"
          />
          <OutlinedTextField
            label="User name"
            keyboardType="default"
            error={userNameErr}
            onChangeText={(text) => {
              setUserNameErr(null);
              setUserName(text);
            }}
            containerStyle={styles.field}
          />
          <OutlinedTextField
            label="Password"
            keyboardType="default"
            error={passwordErr}
            onChangeText={(text) => {
              setPasswordErr(null);
              setPassword(text);
            }}
            containerStyle={[styles.field, containerStyle.defaultMarginBottom]}
          />
          <View style={[containerStyle.defaultMarginTop]}>
            <TextNormal
              props={props}
              clickable
              style
              onPress={() => {}}
              text=""
            />
          </View>
          {showBio && (
            <TouchableOpacity
              onPress={async () => {
                TouchID.authenticate('to authenticate', optionalConfigObject)
                  .then(async (success) => {
                    let userName = await IALocalStorage.getDeviceEmail();
                    let password = await IALocalStorage.getDevicePass();
                    await onLoginSpecial(userName, password);
                  })
                  .catch((error) => {
                    // eslint-disable-next-line no-alert
                    alert(error?.message);
                  });
              }}>
              <Image
                source={
                  support === 'FACEID'
                    ? images.faceId
                    : support === 'TOUCHID'
                    ? images.touchId
                    : images.faceId
                }
                style={styles.img}
                resizeMethod="resize"
                resizeMode="cover"
              />
            </TouchableOpacity>
          )}
          <GradientButton
            fromColor={colors.blue}
            toColor={colors.blue}
            style={[
              containerStyle.buttonCenter,
              containerStyle.defaultMarginTop,
              {borderRadius: 40},
            ]}
            onPress={() => {
              onLogin();
            }}
            text="Login"
          />
        </View>
      </KeyboardAwareScrollView>
      <Image
        source={images.bg}
        style={styles.imgFooter}
        resizeMethod="resize"
        resizeMode="cover"
      />
      {isLoading && <Loading />}
    </View>
  );
};

export default withTheme(LoginScreen);
