/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StatusBar, View, SafeAreaView} from 'react-native';
import {withTheme} from 'react-native-paper';
import {containerStyle} from '../../themes/styles';
const ProfileScreen = (props) => {
  const {colorsApp} = props.theme;
  return (
    <View style={[containerStyle.center, containerStyle.defaultBackground]}>
      <StatusBar barStyle={colorsApp.statusBar} />
      <SafeAreaView />
    </View>
  );
};

export default withTheme(ProfileScreen);
