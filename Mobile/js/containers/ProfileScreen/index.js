/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StatusBar, View, TouchableOpacity} from 'react-native';
import {withTheme} from 'react-native-paper';
import {containerStyle} from '../../themes/styles';
import HeaderImg from '../../shared/components/HeaderImg';
import TextNormal from '../../shared/components/Text/TextNormal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ScrollView} from 'react-native-gesture-handler';
import {ScreenHeight, ScreenWidth} from '../../shared/utils/dimension/Divices';
import FastImage from 'react-native-fast-image';
import {colors} from '../../shared/utils/colors/colors';

const ProfileScreen = (props) => {
  const {colorsApp} = props.theme;

  const renderAvatar = (isDisable) => {
    return (
      <TouchableOpacity style={{flexDirection: 'row', padding: 20}}>
        <View
          style={{
            height: ScreenWidth / 5,
            width: ScreenWidth / 5,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            backgroundColor: 'grey',
          }}>
          <FontAwesome5 name="user" size={30} color={colors.whiteBackground} />
        </View>
        <View
          style={{
            padding: 10,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View>
            <TextNormal text="Chào mừng bạn đến với Calisa" />
            <View style={{flexDirection: 'row'}}>
              <TextNormal
                text="Đăng nhập"
                clickable
                style={{color: colors.blue, marginEnd: 20, padding: 5}}
              />
              <TextNormal
                text="Đăng ký"
                clickable
                style={{color: colors.blue, padding: 5}}
              />
            </View>
          </View>
          <EvilIcons
            name="chevron-right"
            size={30}
            color={colors.blue}
            style={{marginLeft: 20}}
          />
        </View>
      </TouchableOpacity>
    );
  };
  const renderProfile = (ico, text, rightText, bottom, disable, onPress) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          width: '100%',
          height: 64,
          paddingEnd: 20,
          paddingLeft: 20,
          opacity: disable ? 0.6 : 1,
          marginBottom: bottom ? bottom : 5,
          backgroundColor: 'white',
        }}>
        <View
          style={{
            flex: 2,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          {ico}
          <TextNormal text={text} style={{marginLeft: ico ? 20 : 0}} />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          {rightText ? <TextNormal numberOfLines={2} text={rightText} /> : null}
          <EvilIcons name="chevron-right" size={20} style={{marginLeft: 20}} />
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={[containerStyle.defaultBackground]}>
      <StatusBar barStyle={colorsApp.statusBar} />
      <HeaderImg hasBack={false} title="Cá nhân" />
      <View>
        <ScrollView
          // style={{paddingBottom: 50, flexWrap: 'wrap'}}
          contentContainerStyle={{
            height: ScreenHeight * 1.5,
            paddingBottom: 10,
          }}>
          <View>
            {renderAvatar()}
            {renderProfile(
              <MaterialCommunityIcons name="crown-outline" size={25} />,
              'Thành viên',
              '0 xu',
            )}
            {renderProfile(
              <Feather name="gift" size={25} />,
              'Voucher | Mã giảm giá',
              '',
            )}
            {renderProfile(
              <Ionicons name="share-social-outline" size={25} />,
              'Kết nối mạng xã hội',
              '',
              10,
            )}
            {renderProfile(
              <Ionicons name="ios-list-outline" size={25} />,
              'Quản lý đơn hàng',
              '',
            )}
            {renderProfile(null, 'Đơn hàng đang vận chuyển', '')}
            {renderProfile(null, 'Đơn hàng thanh toán lại', '')}
            {renderProfile(null, 'Đơn hàng thành công', '', 10)}
            {renderProfile(
              <EvilIcons name="location" size={25} />,
              'Sổ địa chỉ giao hàng',
              '',
            )}
            {renderProfile(
              <AntDesign name="shoppingcart" size={25} />,
              'Sản phẩm đã mua ',
              '',
            )}
            {renderProfile(
              <AntDesign name="shoppingcart" size={25} />,
              'Sản phẩm đã xem ',
              '',
            )}
            {renderProfile(
              <AntDesign name="shoppingcart" size={25} />,
              'Sản phẩm mua sau',
              '',
              10,
            )}
            {renderProfile(
              <MaterialCommunityIcons name="headphones-bluetooth" size={25} />,
              'Hỗ trợ',
              '',
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default withTheme(ProfileScreen);
