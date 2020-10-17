/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  StatusBar,
  View,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  TouchableOpacity, Platform
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
import {ScreenNames} from '../../route/ScreenNames';
import { ToastHelper } from '../../shared/components/ToastHelper';

const Detail = (props) => {
  const {colorsApp} = props.theme;
  const url = props.navigation.state.params.data?.item?.image?.url;
  const [img, setImg] = useState(url || '');
  const {userStore} = useStores();
  const [size, setSize] = useState('0');
  const [type, setType] = useState({});
  const [sale, setSale] = useState('0%');

  const renderProduct = () => {
    var data = props.navigation.state.params.data?.item;
    console.log(JSON.stringify(data));
    return (
      <View>
        <FastImage
          source={{
            uri: img
          }}
          style={styles.slide1}
          resizeMode="cover"
        />
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          style={styles.swipe}>
          {data?.images.map((item) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setImg(item?.url);
                }}
                style={styles.slide2}>
                <FastImage
                  source={{
                    uri: item?.url
                  }}
                  style={styles.slide2}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <ScrollView
          horizontal
          style={{marginEnd: 20, marginLeft: 20, marginTop: -10}}>
          {(data?.sizes || []).map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setSize(item);
                  const a =
                    data?.priceSizes[
                      size === '0'
                        ? 0
                        : data?.priceSizes?.findIndex(
                            (b) => b?.sizeId === item?.id,
                          )
                    ];
                  console.log(JSON.stringify(a));
                  setType(a);
                  let f = `${
                    100 - Math.floor(((a?.salePrice || 0) * 100) / a?.price)
                  }`;
                  setSale(`${f}%`);
                }}
                style={{
                  borderColor:
                    size?.name === item?.name ? colors.green : 'black',
                  padding: 5,
                  paddingEnd: 10,
                  paddingLeft: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 0.5,
                  borderRadius: 10,
                  marginEnd: 10,
                }}>
                <TextNormal
                  text={item?.name}
                  style={{
                    textAlign: 'center',
                    color: size?.name === item?.name ? colors.green : 'black',
                  }}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <TextNormal
          text={data?.name}
          style={[
            {
              marginLeft: 20,
              marginTop: 20,
              textAlign: 'left',
            },
            containerStyle.textHeaderSmall,
          ]}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TextNormal
            text={type?.salePrice || ''}
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
            text={type?.price || ''}
            style={[
              {
                marginLeft: 20,
                marginTop: 20,
                textAlign: 'left',
                textDecorationLine: 'line-through',
                color: 'red',
                fontWeight: 'bold',
              },
              containerStyle.textHeaderSmall,
            ]}
          />
          <TextNormal
            text={sale || ''}
            style={[
              {
                marginLeft: 20,
                marginEnd: 20,
                marginTop: 20,
                textAlign: 'left',
              },
              containerStyle.textHeaderSmall,
            ]}
          />
        </View>
        <GradientButton
          onPress={() => {
            userStore.addProductToCart(data);
            ToastHelper.showSuccess('Thêm vào giỏ hàng thành công');
          }}
          text="Chọn mua"
          fromColor="red"
          toColor="red"
          style={{alignSelf: 'center', marginTop: 10}}
        />
        <View style={{marginLeft: 20, marginEnd: 20}}>
          <TextNormal
            text="Mô tả sản phẩm"
            style={[containerStyle.textHeaderSmall, {marginTop: 20}]}
          />
          <TextNormal
            text={data?.description || ''}
            numberOfLines={1000}
            style={[containerStyle.textContent, {marginTop: 20}]}
          />
        </View>
      </View>
    );
  };
  return useObserver(() => (
    <View style={[containerStyle.defaultBackground, {flex: 1}]}>
      <StatusBar barStyle={colorsApp.statusBar} />
      <ScrollView contentContainerStyle={{paddingBottom: 50}}>
        {/* <ImageBackground
          source={images.header}
          style={[
            styles.content,
            {
              alignItems: 'center',
              alignContent: 'center',
              justifyContent: 'center',
            },
          ]}
          resizeMethod="resize"
          resizeMode="cover"
        /> */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: 10,
            marginTop: Platform.OS === 'ios' ? 40 : 15,
          }}>
          <TouchableOpacity onPress={() => NavigationService.goBack()}>
            <Ionicons name="arrow-back" size={30} color={'black'} />
          </TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => {
                NavigationService.popToTop();
              }}>
              <Ionicons
                name="home-outline"
                size={28}
                color={'black'}
                style={{marginEnd: 10}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                NavigationService.navigate(ScreenNames.Cart);
              }}>
              <Ionicons name="ios-cart-outline" size={28} color={'black'} />
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  right: -5,
                  backgroundColor: 'red',
                  borderRadius: 7.5,
                  width: 15,
                  height: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TextNormal
                  text={`${userStore?.cart?.slice().length || 0}`}
                  style={{color: 'white', fontSize: 12}}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {renderProduct()}
      </ScrollView>
    </View>
  ));
};

export default withTheme(Detail);

const styles = StyleSheet.create({
  slide1: {
    width: ScreenWidth * 0.9,
    alignSelf: 'center',
    height: ScreenWidth * 0.75,
    borderRadius: 20,
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
