/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  StatusBar,
  View,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  Image,
} from 'react-native';
import {withTheme, Searchbar} from 'react-native-paper';
import {containerStyle} from '../../themes/styles';
import HeaderImg from '../../shared/components/HeaderImg';
import Swiper from 'react-native-swiper';
import {ScreenWidth, ScreenHeight} from '../../shared/utils/dimension/Divices';
import FastImage from 'react-native-fast-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {images} from '../../../assets';
import TextNormal from '../../shared/components/Text/TextNormal';
import {colors} from '../../shared/utils/colors/colors';
import {NavigationService} from '../../navigation';
import {useStores} from '../../store/useStore';
import {useObserver} from 'mobx-react';
const MOCK_BANNER = [
  {
    index: 0,
    imgUrl: 'https://www.barillacfn.com/m/articles/800x450/veg-diet.jpg',
  },
  {
    index: 1,
    imgUrl:
      'https://covid19.lacounty.gov/wp-content/uploads/GettyImages-1128687123-1024x683.jpg',
  },
  {
    index: 2,
    imgUrl:
      'https://res.cloudinary.com/grohealth/image/upload/c_fill,f_auto,fl_lossy,h_650,q_auto,w_1085,x_0,y_0/v1583843120/DCUK/Content/Surprisingly-High-Carb-Food.png',
  },
];
const ProductListByCategoryScreen = (props) => {
  const {colorsApp} = props.theme;
  const [product, setProduct] = useState([]);
  const {userStore} = useStores();
  // const getProducts = async () => {
  //   Services
  // }
  const swipe = () => {
    return (
      <Swiper
        autoplay
        horizontal
        autoplayTimeout={5}
        showsPagination
        scrollEnabled
        loop
        style={styles.swipe}>
        <View style={styles.slide1}>
          <FastImage
            source={{uri: MOCK_BANNER[0].imgUrl}}
            style={styles.slide1}
            resizeMode="cover"
          />
        </View>
        <View style={styles.slide1}>
          <FastImage
            resizeMode="cover"
            source={{uri: MOCK_BANNER[1].imgUrl}}
            style={styles.slide1}
          />
        </View>
        <View style={styles.slide1}>
          <FastImage
            resizeMode="cover"
            source={{uri: MOCK_BANNER[2].imgUrl}}
            style={styles.slide1}
          />
        </View>
      </Swiper>
    );
  };
  const renderProducts = () => {
    let categories = userStore?.categories.slice() || [];
    return (
      <ScrollView style={{flexDirection: 'row'}} horizontal>
        {(categories || []).map((item) => {
          return (
            <View>
              <TouchableOpacity
                onPress={item?.onPress}
                style={[
                  {
                    marginEnd: 10,
                    padding: 10,
                    width: ScreenWidth / 5,
                    height: ScreenWidth / 5,
                    borderRadius: 20,
                    borderColor: 'white',
                    borderWidth: 1,
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                ]}>
                <ImageBackground
                  source={images.backgroundBtnProduct}
                  style={[
                    {
                      width: ScreenWidth / 5,
                      height: ScreenWidth / 5,
                      justifyContent: 'center',
                      alignItems: 'center',
                    },
                  ]}>
                  <Image
                    resizeMethod="resize"
                    resizeMode="cover"
                    source={{uri: item?.image?.url}}
                    style={[
                      {
                        width: ScreenWidth / 5,
                        height: ScreenWidth / 5,
                        borderRadius: 20,
                      },
                    ]}
                  />
                </ImageBackground>
              </TouchableOpacity>
              <TextNormal
                props={props}
                text={item?.title}
                style={{
                  marginTop: 10,
                  width: ScreenWidth / 5,
                  fontSize: 13,
                  textAlign: 'center',
                }}
                numberOfLines={3}
              />
            </View>
          );
        })}
      </ScrollView>
    );
  };
  return useObserver(() => (
    <View style={[containerStyle.defaultBackground]}>
      <StatusBar barStyle={colorsApp.statusBar} />
      <ScrollView>
        <ImageBackground
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
          resizeMode="cover">
          <Searchbar style={styles.search} placeholder="Search" />
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
              alignItems: 'center',
              alignSelf: 'flex-start',
              marginLeft: 20,
              justifyContent: 'flex-start',
            }}>
            <TouchableOpacity onPress={() => NavigationService.goBack()}>
              <Ionicons name="home" size={25} color={colors.whiteBackground} />
            </TouchableOpacity>
            <TextNormal
              style={{color: colors.whiteBackground}}
              text="> Sản phẩm đi chợ mỗi ngày"
            />
          </View>
        </ImageBackground>
        <View style={styles.container}>
          {swipe()}
          <View style={{padding: 20}}>
            <TextNormal
              text="Mua sắm theo danh mục"
              style={[{color: 'black'}, containerStyle.textHeaderSmall]}
            />
            {renderProducts()}
          </View>
        </View>
      </ScrollView>
    </View>
  ));
};

export default withTheme(ProductListByCategoryScreen);

const styles = StyleSheet.create({
  slide1: {
    width: ScreenWidth * 0.9,
    alignSelf: 'center',
    height: ScreenWidth * 0.35,
    borderRadius: 20,
  },
  slide2: {
    width: ScreenWidth * 0.7,
    alignSelf: 'center',
    height: ScreenWidth * 0.35,
    borderRadius: 20,
    marginEnd: 20,
    overflow: 'hidden',
  },
  swipe: {
    // alignItems: 'center',
    height: ScreenWidth * 0.35,
    marginTop: 15,
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
    // height: ScreenHeight / 6,
    paddingTop: 20,
  },
});
