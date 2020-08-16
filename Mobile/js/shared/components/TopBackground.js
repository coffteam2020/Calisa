/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, ImageBackground, Image} from 'react-native';
import {ScreenWidth, ScreenHeight} from '../utils/dimension/Divices';
import {images} from '../../../assets';
import {containerStyle} from '../../themes/styles';

const TopBackground = () => {
  return (
    <View style={styles.content}>
      <ImageBackground
        source={images.background}
        style={[styles.content, containerStyle.center]}
        resizeMethod="resize"
        resizeMode="cover">
        <Image
          source={images.title}
          style={{width: '20%', height: '20%'}}
          resizeMethod="resize"
          resizeMode="contain"
        />
      </ImageBackground>
    </View>
  );
};

export default TopBackground;

const styles = StyleSheet.create({
  content: {
    width: '100%',
    height: ScreenHeight / 4,
    position: 'absolute',
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
