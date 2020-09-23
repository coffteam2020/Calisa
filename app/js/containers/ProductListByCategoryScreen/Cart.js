/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  StatusBar,
  View,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {withTheme} from 'react-native-paper';
import {containerStyle} from './../../themes/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {images} from '../../../assets';
import {ScreenWidth, ScreenHeight} from '../../shared/utils/dimension/Divices';
import {NavigationService} from '../../navigation';
import Swiper from 'react-native-swiper';
import FastImage from 'react-native-fast-image';
import {ScrollView} from 'react-native-gesture-handler';
import TextNormal from '../../shared/components/Text/TextNormal';
import {colors} from '../../shared/utils/colors/colors';
import GradientButton from '../../shared/components/Buttons/GradientButton';
import {useStores} from '../../store/useStore';
import {useObserver} from 'mobx-react';
import HeaderImg from '../../shared/components/HeaderImg';
import IALocalStorage from '../../shared/utils/storage/IALocalStorage';
import {ScreenNames} from '../../route/ScreenNames';
import AxiosFetcher from '../../api/AxiosFetch';
import { ToastHelper } from '../../shared/components/ToastHelper';

const Cart = (props) => {
  const {colorsApp} = props.theme;
  const [img, setImg] = useState('');
  const {userStore} = useStores();
  const [size, setSize] = useState('0');
  const [type, setType] = useState({});
  const [sale, setSale] = useState('0%');

  const renderProduct = () => {
    var data = userStore?.cart?.slice();
    console.log(JSON.stringify(data));
    if (!data || data?.length === 0) {
      return (
        <View style={{alignItems: 'center'}}>
          <Image
            source={images.no}
            style={{
              alignItems: 'center',
              alignContent: 'center',
              alignSelf: 'center',
              marginTop: 20,
              marginBottom: 20,
              width: ScreenWidth / 4,
              height: ScreenWidth / 4,
            }}
          />
          <TextNormal text={'Bạn không có sản phẩm nào trong giỏ hàng'} />
          <GradientButton
            onPress={() => {
              NavigationService.goBack();
            }}
            text="Tiếp tục mua sắm"
            fromColor="red"
            toColor="red"
            style={{alignSelf: 'center', marginTop: 10}}
          />
        </View>
      );
    }
    return (
      <View>
        <ScrollView contentContainerStyle={{padding: 10}}>
          {data?.map((item) => {
            console.log(JSON.stringify(item));
            return (
              <View style={{flexDirection: 'row', marginBottom: 10}}>
                <FastImage
                  source={{
                    uri: item?.image?.url,
                  }}
                  style={styles.slide1}
                  resizeMode="cover"
                />
                <View style={{marginLeft: 10}}>
                  <TextNormal
                    text={item?.name || ''}
                    style={[
                      {
                        marginLeft: 20,
                        marginTop: 20,
                        textAlign: 'left',
                      },
                      containerStyle.textHeaderSmall,
                    ]}
                  />
                  <TextNormal
                    text={`${item?.priceSizes?.[0].price || ''}d`}
                    style={[
                      {
                        marginLeft: 20,
                        marginTop: 5,
                        textAlign: 'left',
                        textDecorationLine: 'line-through',
                        color: 'red',
                        fontWeight: 'bold',
                      },
                      containerStyle.textHeaderSmall,
                    ]}
                  />
                  <TextNormal
                    text={`${item?.priceSizes?.[0].salePrice || ''}d`}
                    style={[
                      {
                        marginLeft: 20,
                        marginEnd: 20,
                        marginTop: 5,
                        textAlign: 'left',
                      },
                      containerStyle.textHeaderSmall,
                    ]}
                  />
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  };
  // {
  //   "billingAddress": {
  //     "companyAddress": "string",
  //     "companyName": "string",
  //     "companyTaxCode": "string"
  //   },
  //   "customerId": 0,
  //   "customerInfo": {
  //     "birthday": "2020-08-20T16:26:15.378Z",
  //     "email": "string",
  //     "firstname": "string",
  //     "lastname": "string",
  //     "phone": "string"
  //   },
  //   "deliveryDate": 0,
  //   "note": "string",
  //   "orderItems": [
  //     {
  //       "menuId": 0,
  //       "note": "string",
  //       "productId": 0,
  //       "productPriceId": 0,
  //       "quantity": 0
  //     }
  //   ],
  //   "paymentMethod": 0,
  //   "shippingAddress": {
  //     "contactPerson": "string",
  //     "contactPhone": "string",
  //     "customerId": 0,
  //     "description": "string",
  //     "districtId": 0,
  //     "isDefault": true,
  //     "latitude": 0,
  //     "longitude": 0,
  //     "provinceId": 0,
  //     "text": "string",
  //     "type": 0,
  //     "wardId": 0
  //   },
  //   "sourceType": 0,
  //   "voucherCode": "string"
  // }
  const checkout = async () => {
    let user = await IALocalStorage.getDetailUserInfo();
    if (!user) {
      NavigationService.navigate(ScreenNames.LoginScreen);
    } else {
      AxiosFetcher({
        method: 'POST',
        data: {
          billingAddress: {
            companyAddress: '',
            companyName: '',
            companyTaxCode: '',
          },
          customerId: 0,
          customerInfo: {
            email: user.email,
            firstname: user.name || '',
            lastname: user.name || '',
            phone: user.phone || '09',
          },
          deliveryDate: 0,
          note: '',
          orderItems: userStore?.cart?.slice(),
          paymentMethod: 0,
          shippingAddress: {
            contactPerson: user.name || ' ',
            contactPhone: '09',
            customerId: 0,
            description: '',
            districtId: 0,
            isDefault: true,
            latitude: 0,
            longitude: 0,
            provinceId: 0,
            text: '',
            type: 0,
            wardId: 0,
          },
          sourceType: 0,
          voucherCode: '',
        },
        url: 'orders/',
        hasToken: false,
      }).then(async (a) => {
        if (a?.content) {
          ToastHelper.showSuccess('Đặt hàng thành công');
          // await IALocalStorage.setDetailUserInfo(a);
          setTimeout(() => {
            NavigationService.goBack();
          }, 1000);
        } else {
          ToastHelper.showError('Đặt hàng lỗi');
        }
      });
    }
  };
  return useObserver(() => (
    <View style={[containerStyle.defaultBackground, {flex: 1}]}>
      <StatusBar barStyle={colorsApp.statusBar} />
      <ScrollView contentContainerStyle={{paddingBottom: 50}}>
        <HeaderImg hasBack title="Giỏ hàng" />
        {renderProduct()}
      </ScrollView>
      {userStore?.cart?.slice().length > 0 && (
        <GradientButton
          onPress={() => {checkout()}}
          fromColor="red"
          toColor="red"
          style={{alignSelf: 'center', alignItems: 'center', marginBottom: 10}}
          text="Tiến hành đặt hàng"
        />
      )}
    </View>
  ));
};

export default withTheme(Cart);

const styles = StyleSheet.create({
  slide1: {
    width: ScreenWidth * 0.3,
    alignSelf: 'center',
    height: ScreenWidth * 0.3,
    borderRadius: 5,
  },
  slide2: {
    width: ScreenWidth * 0.4,
    alignSelf: 'center',
    height: ScreenWidth * 0.4,
    borderRadius: 20,
    marginEnd: 20,
    marginLeft: 20,
    overflow: 'hidden',
  },
  swipe: {
    // alignItems: 'center',
    height: ScreenWidth * 0.75,
    marginTop: 5,
  },
  swipe2: {
    alignItems: 'center',
    marginTop: 55,
  },
  container: {
    // paddingTop: ScreenHeight / 2,
    // height: ScreenHeight,
    width: '100%',
  },
  search: {
    width: '90%',
    height: 35,
    marginTop: 15,
    alignSelf: 'center',
    alignItems: 'center',
  },
  content: {
    width: ScreenWidth,
    height: ScreenHeight / 12,
    paddingTop: 20,
  },
});
