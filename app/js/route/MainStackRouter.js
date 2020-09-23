/* eslint-disable react/display-name */
import 'react-native-gesture-handler';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import React from 'react';
import LoginScreen from '../containers/LoginScreen/index';
import HomeScreen from '../containers/HomeScreen/index';
import ProfileScreen from '../containers/ProfileScreen/index';
import CartScreen from '../containers/CartScreen/index';
import ProductListByCategoryScreen from '../containers/ProductListByCategoryScreen/index';
import Detail from '../containers/ProductListByCategoryScreen/Detail';
import Cart from '../containers/ProductListByCategoryScreen/Cart';
import NotificationScreen from '../containers/NotificationScreen/index';
import FavouriteScreen from '../containers/FavouriteScreen/index';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Tabbar from './Tabbar';
import * as Animatable from 'react-native-animatable';
import {containerStyle} from '../themes/styles';
import icons from '../shared/utils/icons/icons';
import {colors} from '../shared/utils/colors/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Image} from 'react-native';
import {styles} from './styles';
import {images} from '../../assets';
const Tabs = createBottomTabNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        title: 'HomeScreen',
        tabBarIcon: ({focused}) => (
          <Animatable.View style={[containerStyle.tabbarViewIco]}>
            <Ionicons
              name="home-outline"
              size={30}
              color={focused ? colors.blueSocial : colors.black_seventy}
            />
          </Animatable.View>
        ),
      },
    },
    FavouriteScreen: {
      screen: FavouriteScreen,
      navigationOptions: {
        title: 'FavouriteScreen',
        tabBarIcon: ({tintColor, focused}) => (
          <Ionicons
            name="heart-outline"
            size={30}
            color={focused ? colors.blueSocial : colors.black_seventy}
          />
        ),
      },
    },
    CartScreen: {
      screen: Cart,
      navigationOptions: {
        title: 'CartScreen',
        tabBarIcon: ({tintColor, focused}) => (
          <Animatable.View>
            <Image
              source={focused ? images.btnCartFocused : images.btnCart}
              style={styles.cart}
            />
          </Animatable.View>
        ),
      },
    },
    NotificationScreen: {
      screen: NotificationScreen,
      navigationOptions: {
        title: 'NotificationScreen',
        tabBarIcon: ({tintColor, focused}) => (
          <Ionicons
            name="notifications-outline"
            size={30}
            color={focused ? colors.blueSocial : colors.black_seventy}
          />
        ),
      },
    },
    ProfileScreen: {
      screen: ProfileScreen,
      navigationOptions: {
        title: 'ProfileScreen',
        tabBarIcon: ({tintColor, focused}) => (
          <FontAwesome
            name="user-o"
            size={25}
            color={focused ? colors.blueSocial : colors.black_seventy}
          />
        ),
      },
    },
  },
  {
    initialRouteName: 'HomeScreen',
    mode: 'modal',
    headerMode: 'none',
    tabBarOptions: {
      activeTintColor: '#80A0AB',
      inactiveTintColor: '#fff',
      showLabel: false,
      style: {
        height: 80,
        backgroundColor: colors.whiteBackground,
      },
      labelStyle: {
        fontSize: 12,
        fontFamily: 'Abel-Regular',
      },
    },
    tabBarComponent: (props) => <Tabbar {...props} />,
  },
);
const AuthedStack = createStackNavigator(
  {
    HomeScreen: {screen: Tabs},
    ProductListByCategoryScreen: {screen: ProductListByCategoryScreen},
    Detail: {screen: Detail},
    Cart: {screen: Cart},
    LoginScreen: {screen: LoginScreen}
  },
  {
    initialRouteName: 'HomeScreen',
    mode: 'modal',
    headerMode: 'none',
  },
);
// SwitchNavigator for using the multiple stack in the same route
const AppBottombarSwitchNavigator = createAnimatedSwitchNavigator(
  {
    HomeScreen: {screen: AuthedStack},
  },
  {
    initialRouteName: 'HomeScreen',
    mode: 'modal',
    headerMode: 'none',
  },
);

export default createAppContainer(AppBottombarSwitchNavigator);
