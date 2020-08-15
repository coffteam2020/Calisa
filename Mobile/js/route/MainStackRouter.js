/* eslint-disable react/display-name */
import 'react-native-gesture-handler';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator, TransitionPresets} from 'react-navigation-stack';
import React from 'react';
import SplashScreen from '../containers/SplashScreen/index';
import LoginScreen from '../containers/LoginScreen/index';
import HomeScreen from '../containers/HomeScreen/index';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import {Transition} from 'react-native-reanimated';

// ScreenNavigator for separately each screen into stack one
const MainScreenNavigator = createStackNavigator(
  {
    LoginScreen: {screen: LoginScreen},
  },
  {
    mode: 'modal',
    headerMode: 'none',
    initialRouteName: 'LoginScreen',
  },
);
// SwitchNavigator for using the multiple stack in the same route
const AppBottombarSwitchNavigator = createAnimatedSwitchNavigator(
  {
    SplashScreen: {screen: SplashScreen},
    // Auth: {screen: MainScreenNavigator},
    // HomeScreen: {screen: HomeScreen},
  },
  {
    initialRouteName: 'SplashScreen',
    mode: 'modal',
    headerMode: 'none',
    // transition: (
    //   <Transition.Together>
    //     <Transition.Out type="fade" durationMs={300} interpolation="easeIn" />
    //     <Transition.In type="fade" durationMs={200} />
    //   </Transition.Together>
    // ),
  },
);

export default createAppContainer(AppBottombarSwitchNavigator);
