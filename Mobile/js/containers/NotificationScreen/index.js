/* eslint-disable react/jsx-no-duplicate-props */
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
import HTML from 'react-native-render-html';
import Swiper from 'react-native-swiper';
import {ScreenWidth, ScreenHeight} from '../../shared/utils/dimension/Divices';
import FastImage from 'react-native-fast-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native-gesture-handler';
import {images} from '../../../assets';
import TextNormal from '../../shared/components/Text/TextNormal';
import {colors} from '../../shared/utils/colors/colors';
import {NavigationService} from '../../navigation';
import {useStores} from '../../store/useStore';
import {useObserver} from 'mobx-react';
import {ScreenNames} from '../../route/ScreenNames';
import YouTube from 'react-native-youtube';
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
const NotificationScreen = (props) => {
  const {colorsApp} = props.theme;
  const [product, setProduct] = useState([]);
  const {userStore} = useStores();
  // const getProducts = async () => {
  //   Services
  // }
  const swipe = () => {
    const news = props.navigation.state.params.news || [];
    console.log(JSON.stringify(news));
    const banner = props.navigation.state.params.banner || [];
    return (
      <Swiper
        autoplay
        horizontal
        autoplayTimeout={5}
        showsPagination
        scrollEnabled
        loop
        style={styles.swipe}>
        {banner.map((item) => {
          return (
            <View style={styles.slide1}>
              <FastImage
                source={{
                  uri: `http://calisa.ispa.io/img${item?.thumbs[0]?.path}`,
                }}
                style={styles.slide1}
                resizeMode="cover"
              />
            </View>
          );
        })}
      </Swiper>
    );
  };
  const renderProducts = () => {
    let key = props?.navigation.state.params?.key;
    let categories =
      key === 'listHotPrice'
        ? userStore?.categories?.listCateHotWeek.slice() || []
        : key === 'listHotSell'
        ? userStore?.categories?.listCateHotSale.slice() || []
        : null;
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
                    width: ScreenWidth / 4,
                    // height: ScreenWidth / 4,
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
                      width: ScreenWidth / 4,
                      height: ScreenWidth / 4,
                      justifyContent: 'center',
                      alignItems: 'center',
                    },
                  ]}>
                  <Image
                    resizeMethod="resize"
                    resizeMode="cover"
                    source={{
                      uri:
                        item?.image?.url ||
                        'https://covid19.lacounty.gov/wp-content/uploads/GettyImages-1128687123-1024x683.jpg',
                    }}
                    style={[
                      {
                        width: ScreenWidth / 4,
                        height: ScreenWidth / 4,
                        borderRadius: 20,
                      },
                    ]}
                  />
                </ImageBackground>
                <TextNormal
                  numberOfLines={3}
                  text={`${item?.categoryName}`}
                  style={{color: 'black', textAlign: 'center'}}
                />
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
  const renderProduct = () => {
    let key = props?.navigation.state.params?.key;
    var data =
      key === 'listHotPrice'
        ? userStore?.categories?.listHotWeek.slice() || []
        : key === 'listHotSell'
        ? userStore?.categories?.listHotSale.slice() || []
        : userStore?.categories?.listMenus.slice() || [];
    return (
      <FlatList
        numColumns={3}
        data={data}
        renderItem={(item, index) => {
          console.log(JSON.stringify(item));
          let sale = `${Math.floor(
            ((item?.item?.priceSizes?.[0]?.salePrice || 0) * 100) /
              item?.item?.priceSizes?.[0]?.price,
          )}`;
          return (
            <TouchableOpacity
              onPress={() =>
                NavigationService.navigate(ScreenNames.Detail, {data: item})
              }
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingEnd: 5,
                marginBottom: 10,
                marginEnd: 5,
                borderColor: colors.gray_less,
                borderRadius: 10,
                borderWidth: 1,
                // flexDirection: 'column',
              }}>
              <View>
                <FastImage
                  source={{
                    uri: item?.item?.image?.url,
                  }}
                  cache={FastImage.cacheControl.cacheOnly}
                  style={{
                    width: ScreenWidth * 0.28,
                    height: ScreenWidth * 0.28,
                  }}
                />
                <TextNormal
                  text={`${item?.item?.name}`}
                  numberOfLines={3}
                  style={{
                    color: 'black',
                    fontSize: 13,
                    width: ScreenWidth * 0.28,
                  }}
                />
                {item?.item?.priceSizes?.[0]?.sizeName && (
                  <TextNormal
                    text={`${item?.item?.priceSizes?.[0]?.sizeName}`}
                    numberOfLines={3}
                    style={{
                      color: 'black',
                      fontSize: 13,
                      width: ScreenWidth * 0.28,
                    }}
                  />
                )}
                <TextNormal
                  text={`${
                    item?.item?.price || item?.item?.priceSizes?.[0]?.price
                  }d`}
                  numberOfLines={3}
                  style={{
                    fontWeight: 'bold',
                    color: 'red',
                    fontSize: 15,
                    width: ScreenWidth * 0.28,
                  }}
                />
                {item?.item?.isSale && (
                  <TextNormal
                    text={`${
                      item?.item?.price ||
                      item?.item?.priceSizes?.[0]?.salePrice
                    }d`}
                    numberOfLines={3}
                    style={{
                      color: 'black',
                      fontSize: 13,
                      width: ScreenWidth * 0.28,
                      textDecorationLine: 'line-through',
                    }}
                  />
                )}
                {100 - sale > 0 && (
                  <View
                    style={{
                      height: 30,
                      justifyContent: 'center',
                      alignItems: 'center',
                      position: 'absolute',
                      top: 5,
                      right: 5,
                      width: 35,
                      borderBottomLeftRadius: 20,
                      borderBottomRightRadius: 20,
                      backgroundColor: 'red',
                    }}>
                    <TextNormal
                      text={`${100 - sale}%`}
                      style={{color: 'white', fontSize: 11}}
                    />
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        }}
      />
    );
  };
  const renderNews = () => {
    let data = props?.navigation.state.params?.news?.news;
    return (
      <FlatList
        numColumns={1}
        data={data}
        renderItem={(item, index) => {
          let id =
            (item?.item?.video_url || 'watch?v=a')?.split('watch?v=')[1] || '';
          return (
            <TouchableOpacity
              style={{
                // justifyContent: 'center',
                // alignItems: 'center',
                // paddingEnd: 5,
                marginBottom: 10,
                marginEnd: 5,
                borderColor: colors.gray_less,
                borderRadius: 10,
                borderWidth: 1,
                // flexDirection: 'column',
              }}>
              <View>
                <YouTube
                  apiKey={'AIzaSyD-VuAxJLCUUmh0rAtiZytV2iI_t2sOh50'}
                  videoId={id || ''} // The YouTube video ID
                  play={false} // control playback of video with true/false
                  fullscreen={false} // control whether the video should play in fullscreen or inline
                  loop={false} // control whether the video should loop when ended
                  onReady={() => {}}
                  resumePlayAndroid={false}
                  onChangeState={() => {}}
                  onChangeQuality={() => {}}
                  onError={() => {}}
                  style={[styles.video]}
                  resumePlayAndroid={false}
                />
                <TextNormal
                  text={`${item?.item?.seo_title}`}
                  numberOfLines={3}
                  style={{
                    color: 'black',
                    fontSize: 17,
                    fontWeight: 'bold',
                    width: ScreenWidth,
                  }}
                />
                <TextNormal
                  text={`${item?.item?.seo_text}`}
                  numberOfLines={1000}
                  style={{
                    color: 'black',
                    fontSize: 13,
                    width: ScreenWidth,
                  }}
                />
                {/* <TextNormal
                  text={`${item?.item?.descriptions}`}
                  numberOfLines={3000}
                  style={{
                    fontWeight: 'bold',
                    color: 'red',
                    fontSize: 15,
                    width: ScreenWidth,
                  }}
                /> */}
                <HTML
                  html={`${item?.item?.descriptions}`}
                  imagesMaxWidth={ScreenWidth}
                />
                {item?.item?.isSale && (
                  <TextNormal
                    text={`${item?.item?.priceSizes?.[0]?.salePrice}d`}
                    numberOfLines={3}
                    style={{
                      color: 'black',
                      fontSize: 13,
                      width: ScreenWidth * 0.28,
                      textDecorationLine: 'line-through',
                    }}
                  />
                )}
              </View>
            </TouchableOpacity>
          );
        }}
      />
    );
  };
  return useObserver(() => (
    <View style={[containerStyle.defaultBackground, {flex: 1}]}>
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
              text={' > Thông báo của bạn'}
            />
          </View>
        </ImageBackground>
        <View style={styles.container}>
          <View style={{alignItems: 'center'}}>
            <Image
              source={images.notify}
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
            <TextNormal text={'Bạn không có thông báo nào'} />
          </View>
        </View>
      </ScrollView>
    </View>
  ));
};

export default withTheme(NotificationScreen);

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
  video: {
    alignSelf: 'stretch',
    height: ScreenWidth * 0.5,
    width: ScreenWidth * 1,
    margin: 0,
    // marginEnd: 20,
    borderRadius: 5,
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
