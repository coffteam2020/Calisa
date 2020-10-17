/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
  StatusBar,
  View,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { withTheme } from 'react-native-paper';
import { containerStyle } from './../../themes/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { images } from '../../../assets';
import { ScreenWidth, ScreenHeight } from '../../shared/utils/dimension/Divices';
import { NavigationService } from '../../navigation';
import Swiper from 'react-native-swiper';
import FastImage from 'react-native-fast-image';
import { ScrollView } from 'react-native-gesture-handler';
import TextNormal from '../../shared/components/Text/TextNormal';
import { colors } from '../../shared/utils/colors/colors';
import GradientButton from '../../shared/components/Buttons/GradientButton';
import { useStores } from '../../store/useStore';
import { useObserver } from 'mobx-react';
import HeaderImg from '../../shared/components/HeaderImg';
import IALocalStorage from '../../shared/utils/storage/IALocalStorage';
import { ScreenNames } from '../../route/ScreenNames';
import AxiosFetcher from '../../api/AxiosFetch';
import { ToastHelper } from '../../shared/components/ToastHelper';

const Cart = (props) => {
  const { colorsApp } = props.theme;
  const [img, setImg] = useState('');
  const { userStore } = useStores();
  const [size, setSize] = useState('0');
  const [type, setType] = useState({});
  const [sale, setSale] = useState('0%');
  const zzd = userStore?.cart?.slice();
  const [data, setData] = useState(zzd);

  useEffect(() => {
    checkData();
  }, [])
  const checkData = () => {
    var arr = []
    for (let i = 0; i < data?.length; i++) {
      let found = false;
      let fit = -1;
      let count = 0;
      for (let j = 0; j < arr.length; j++) {
        if (arr[j]?.id === data?.[i]?.id) {
          found = true;
          fit = j;
          count = arr[j].count;
          break;
        } else {
          fit = 0;
        }
      }
      console.log(fit);
      if (found && fit >= 0) {
        arr[fit].count = count + 1
      } else {
        arr.push({
          ...data[i],
          count: 1
        })
      }
    }
    setData(arr);
  }
  const addOrRemoveData = async (id, isAdd) => {
    var arr = data;


    for (let j = 0; j < arr.length; j++) {
      console.log(arr[j].count);
      if (arr[j].id === id) {
        if (isAdd) {
          arr[j].count = arr[j].count + 1;
          // setData(arr);
          userStore.cart = arr?.filter(a => a.count != 0);
        } else {
          let countLeft = arr[j].count - 1;
          console.log(countLeft);
          if (countLeft <= 0) {
            arr[j].count = 0
            console.log("=======0")
            if (arr?.length === 1) {
              console.log("=======dasda")
              userStore.cart = [];
              return;
            } else {
              console.log("=======dasdsdadas")
              // setData(arr);
              userStore.cart = arr?.filter(a => a.count != 0);
            }
          } else {
            arr[j].count = countLeft
            // setData(arr);
            userStore.cart = arr?.filter(a => a.count != 0);
          }
        }
        // return;
      }
    }
    console.log('arr.length' + arr.length);
    if (arr.length === 0) {
      userStore.cart = [];
      return;
    }
    console.log("===========userStore.cart.length" + userStore.cart.length);
  }
  const renderProduct = () => {
    // console.log(JSON.stringify(data));
    if (!data || data?.length === 0) {
      return (
        <View style={{ alignItems: 'center' }}>
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
            style={{ alignSelf: 'center', marginTop: 10 }}
          />
        </View>
      );
    }
    return useObserver(() => (
      <View>
        <ScrollView contentContainerStyle={{ padding: 10 }}>
          {data?.map((item) => {
            console.log(JSON.stringify(item));
            if (item?.count === 0) {
              return null;
            }
            return (
              <View style={{ flexDirection: 'row', marginBottom: 0 }}>
                <FastImage
                  source={{
                    uri: item?.image?.url,
                  }}
                  style={styles.slide1}
                  resizeMode="cover"
                />
                <View style={{ marginLeft: 10, justifyContent: 'center', marginBottom: 20 }}>
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
                    text={`${item?.priceSizes?.[0].price || ''} đ`}
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
                    text={`${item?.priceSizes?.[0].salePrice || ''} đ`}
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
                  <View style={{ flexDirection: 'row', marginLeft: 20, alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => {
                      addOrRemoveData(item?.id, true);
                    }}>
                      <Ionicons name="add-circle-outline" size={30} color={'black'} />
                    </TouchableOpacity>
                    <TextNormal text={item?.count} style={{ marginLeft: 10, marginEnd: 10 }} />
                    <TouchableOpacity onPress={() => {
                      addOrRemoveData(item?.id, false);
                    }}>
                      <Ionicons name="remove-circle-outline" size={30} color={'black'} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    ));
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
    console.log(JSON.stringify(user));
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
            firstname: user.firstName || '',
            lastname: user.lastName || '',
            phone: user.phone || '09',
          },
          deliveryDate: 0,
          note: '',
          orderItems: userStore?.cart?.slice(),
          paymentMethod: 0,
          shippingAddress: {
            contactPerson: user.lastName || ' ',
            contactPhone: user.phone,
            customerId: 0,
            description: '',
            districtId: 0,
            isDefault: true,
            latitude: 0,
            longitude: 0,
            provinceId: 0,
            text: 'HCM, VietNam',
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
    <View style={[containerStyle.defaultBackground, { flex: 1 }]}>
      <StatusBar barStyle={colorsApp.statusBar} />
      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        <HeaderImg hasBack title="Giỏ hàng" />
        {renderProduct()}
      </ScrollView>
      {userStore?.cart?.slice().length > 0 && (
        <GradientButton
          onPress={() => { checkout() }}
          fromColor="red"
          toColor="red"
          style={{ alignSelf: 'center', alignItems: 'center', marginBottom: 10 }}
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
