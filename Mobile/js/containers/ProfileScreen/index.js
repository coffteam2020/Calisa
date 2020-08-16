/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StatusBar, View, SafeAreaView} from 'react-native';
import {withTheme} from 'react-native-paper';
import {containerStyle} from '../../themes/styles';
import HeaderImg from '../../shared/components/HeaderImg';
const ProfileScreen = (props) => {
  const {colorsApp} = props.theme;
  const renderProfile = () => {
    return (
      null
    )
  }
  return (
    <View style={[containerStyle.center, containerStyle.defaultBackground]}>
      <StatusBar barStyle={colorsApp.statusBar} />
      <HeaderImg hasBack={false} title="Cá nhân" />
    </View>
  );
};

export default withTheme(ProfileScreen);
