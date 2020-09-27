/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {ScreenWidth, ScreenHeight} from '../utils/dimension/Divices';
import {images} from '../../../assets';
import {containerStyle} from '../../themes/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TextNormal from './Text/TextNormal';
import {colors} from '../utils/colors/colors';
import {NavigationService} from '../../navigation';

const HeaderImg = ({hasBack, title, rightIco}) => {
  return (
    <View style={styles.content}>
      <ImageBackground
        source={images.header}
        style={[styles.content, containerStyle.center]}
        resizeMethod="resize"
        resizeMode="cover">
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            marginTop: 20,
          }}>
          <TouchableOpacity
            onPress={() => {
              NavigationService.goBack();
            }}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'flex-start',
              paddingLeft: 20,
            }}>
            {hasBack && (
              <Ionicons
                name="ios-chevron-back-outline"
                size={30}
                color={colors.whiteBackground}
              />
            )}
          </TouchableOpacity>
          <View
            style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
            <TextNormal
              text={`${title || ''}`}
              style={[
                containerStyle.textDefaultNormal,
                {color: colors.whiteBackground},
              ]}
            />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'flex-start',
              paddingLeft: 20,
            }}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default HeaderImg;

const styles = StyleSheet.create({
  content: {
    width: '100%',
    height: ScreenHeight / 10,
    // position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
  },
  container: {
    width: ScreenWidth / 3,
    height: ScreenWidth / 3,
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
    zIndex: -10,
    justifyContent: 'center',
  },
});
