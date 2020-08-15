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
  return (
    <View style={[containerStyle.center, containerStyle.defaultBackground]}>
      <StatusBar barStyle={colorsApp.statusBar} />
      <SafeAreaView>
        
      </SafeAreaView>
    </View>
  );
};

export default withTheme(HomeScreen);
