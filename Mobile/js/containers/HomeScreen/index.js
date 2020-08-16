/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-inline-style */
import React, {useState, useEffect} from 'react';
import {
  StatusBar,
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import {withTheme, Searchbar} from 'react-native-paper';
import {containerStyle} from '../../themes/styles';
import TopBackground from '../../shared/components/TopBackground';
import {ScreenHeight, ScreenWidth} from '../../shared/utils/dimension/Divices';
import {useStores} from '../../store/useStore';
import Swiper from 'react-native-swiper';
import Service from '../../api/Service';
import FastImage from 'react-native-fast-image';
import {images} from '../../../assets';
import TextNormal from '../../shared/components/Text/TextNormal';
import {colors} from '../../shared/utils/colors/colors';
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
const MOCK_PRODUCT_BTNS = [
  {
    index: 0,
    title: 'SP đi chợ mỗi ngày',
    image: images.daily,
  },
  {
    index: 1,
    title: 'Menu gợi ý',
    image: images.recommend,
  },
  {
    index: 2,
    title: 'SP dành cho Party/tiệc nhậu',
    image: images.party,
  },
  {
    index: 3,
    title: 'Gia vị',
    image: images.ingredient,
  },
];
const MOCK_PRODUCT_BANNERS = [
  {
    index: 0,
    image: images.banner1,
  },
  {
    index: 1,
    image: images.banner2,
  },
];
const HomeScreen = (props) => {
  const {colorsApp} = props.theme;
  const [] = useState([]);
  const {userStore} = useStores();

  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    Service.getCategories().then((data) => {
      userStore.setCategories(data || []);
    });
  };
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
  const btnCategories = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: ScreenWidth / 4,
          width: '90%',
          zIndex: 10,
          marginTop: 20,
          justifyContent: 'space-between',
        }}>
        {MOCK_PRODUCT_BTNS.map((item) => {
          return (
            <View>
              <TouchableOpacity
                onPress={() => {}}
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
                  containerStyle.shadow,
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
                    resizeMode="contain"
                    source={item?.image}
                    style={[
                      {
                        width: ScreenWidth / 5,
                        height: ScreenWidth / 5,
                        borderRadius: 10,
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
      </View>
    );
  };
  const btnCategoriesBanner = () => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          alignSelf: 'center',
          paddingLeft: 20,
          paddingEnd: 20,
          marginEnd: 20,
          marginTop: 40,
        }}
        style={{marginEnd: 20}}>
        {MOCK_PRODUCT_BANNERS.map((item) => {
          return (
            <FastImage
              resizeMode="contain"
              source={item?.image}
              style={styles.slide2}
            />
          );
        })}
      </ScrollView>
    );
  };
  const productDealDaily = () => {
    return (
      <View
        style={{
          width: ScreenWidth * 0.9,
          height: 50,
          backgroundColor: colors.blue,
        }}>
        <ImageBackground
          source={images.vector}
          style={{
            width: ScreenWidth * 0.9,
            height: 50,
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            zIndex: 10,
          }}
          resizeMode="stretch">
          <TextNormal
            text="Sản phẩm Deal theo ngày"
            style={[
              containerStyle.textHeaderSmall,
              {color: colors.whiteBackground},
              containerStyle.defaultTextMarginEnd,
            ]}
          />
          <Image source={images.flash} style={{width: 20, height: 50}} />
          <TextNormal
            clickable
            onPress={() => {}}
            text="XEM THÊM"
            style={[
              containerStyle.textDefaultContent,
              {color: colors.whiteBackground, zIndex: 100},
              containerStyle.defaultTextMarginLeft,
            ]}
          />
        </ImageBackground>
      </View>
    );
  };
  return (
    <View style={[containerStyle.defaultBackground]}>
      <StatusBar barStyle={colorsApp.statusBar} />
      <TopBackground />
      <SafeAreaView>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{paddingBottom: 50}}
          style={{height: '100%', paddingBottom: 50}}>
          <View style={styles.container}>
            <Searchbar style={styles.search} placeholder="Search" />
            {swipe()}
            {btnCategories()}
            {btnCategoriesBanner()}
            {productDealDaily()}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default withTheme(HomeScreen);

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
    height: ScreenWidth * 0.55,
    borderRadius: 20,
    marginEnd: 20,
    overflow: 'hidden',
  },
  swipe: {
    alignItems: 'center',
    height: ScreenWidth * 0.35,
    marginTop: 15,
  },
  swipe2: {
    alignItems: 'center',
    marginTop: 55,
  },
  container: {
    paddingTop: ScreenHeight / 10,
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  search: {
    width: '90%',
  },
});
