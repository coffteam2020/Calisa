/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-inline-style */
import React, { useState, useEffect } from 'react';
import {
  StatusBar,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';
import { withTheme, Searchbar } from 'react-native-paper';
import { containerStyle } from '../../themes/styles';
import TopBackground from '../../shared/components/TopBackground';
import { ScreenHeight, ScreenWidth } from '../../shared/utils/dimension/Divices';
import { useStores } from '../../store/useStore';
import Swiper from 'react-native-swiper';
import Service from '../../api/Service';
import FastImage from 'react-native-fast-image';
import YouTube from 'react-native-youtube';
import { images } from '../../../assets';
import TextNormal from '../../shared/components/Text/TextNormal';
import { colors } from '../../shared/utils/colors/colors';
import { NavigationService } from '../../navigation';
import { ScreenNames } from '../../route/ScreenNames';
import Axios from 'axios';
import { useObserver } from 'mobx-react';
import { useNavigation } from 'react-navigation-hooks';
import Loading from '../../shared/components/Loading';
import { ToastHelper } from '../../shared/components/ToastHelper';
const MOCK_PRODUCT_BTNS = [
  {
    index: 0,
    title: 'Giá tốt trong tuần',
    image: images.daily,
    onPress: () => {
      NavigationService.navigate(ScreenNames.ProductListByCategoryScreen);
    },
  },
  {
    index: 1,
    title: 'Hot sale',
    image: images.recommend,
  },
  {
    index: 2,
    title: 'Combo',
    image: images.party,
  },
  {
    index: 3,
    title: 'Công thức chế biến',
    image: images.ingredient,
  },
];
const HomeScreen = (props) => {
  const { colorsApp } = props.theme;
  const [banner, setBanner] = useState([]);
  const [news, setNews] = useState({});
  const [keyGood, setKeyGood] = useState('all');
  const [keySell, setKeySell] = useState('all');
  const { userStore } = useStores();
  const [isLoading, setLoading]= useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    navigation.addListener('refocus', () => {
      console.log("dadsa");
      getProducts();
    })
    getProducts();
  }, []);

  const getProducts = async () => {
    // Axios.get('https://dev.calisa.vn/api/v1/news/banner').then((data) => {

    //   setBanner(data?.data || []);
    // });
    Axios.get('https://calisa.api.vn/cate/show/3/news').then((data) => {
      console.log(JSON.stringify(data));
      setNews(data?.data || []);
    });
    // Service.getCategories().then((data) => {
    //   userStore.setCategories(data?.content || {});
    // });
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
        {banner.map((item) => {
          return (
            <View style={styles.slide1}>
              <FastImage
                source={{
                  uri: `http://dev.calisa.vn/img${item?.thumbs[0]?.path}`,
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
  const btnCategories = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          width: '90%',
          zIndex: 10,
          marginTop: 20,
          marginBottom: 10,
          justifyContent: 'space-between',
        }}>
        {MOCK_PRODUCT_BTNS.map((item) => {
          return (
            <View>
              <TouchableOpacity
                onPress={() => {
                  if (item?.index === 0) {
                    NavigationService.navigate(
                      ScreenNames.ProductListByCategoryScreen,
                      { key: 'listHotPrice', banner: banner, title: item?.title },
                    );
                  } else if (item?.index === 1) {
                    NavigationService.navigate(
                      ScreenNames.ProductListByCategoryScreen,
                      { key: 'listHotSell', banner: banner, title: item?.title },
                    );
                  } else if (item?.index === 2) {
                    NavigationService.navigate(
                      ScreenNames.ProductListByCategoryScreen,
                      { key: 'listMenu', banner: banner, title: item?.title },
                    );
                  } else if (item?.index === 3) {
                    NavigationService.navigate(
                      ScreenNames.ProductListByCategoryScreen,
                      { key: 'listGuide', news: news, title: item?.title },
                    );
                  }
                }}
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
        horizontal>
        {banner.map((item) => {
          return (
            <FastImage
              resizeMode="cover"
              source={{
                uri: `http://dev.calisa.vn/img${item?.thumbs[0]?.path}`,
              }}
              style={styles.slide2}
            />
          );
        })}
      </ScrollView>
    );
  };
  const productDealDaily = () => {
    return (
      <View>
        <View
          style={{
            width: ScreenWidth * 0.9,

          }}>
          <ImageBackground
            source={images.vector}
            style={{
              width: ScreenWidth * 0.9,
              height: 50,
              backgroundColor: colors.blue,
              justifyContent: 'center',
              flexDirection: 'row',
              alignItems: 'center',
              zIndex: 10,
            }}
            resizeMode="stretch">
            <TextNormal
              text="Giá tốt trong tuần"
              style={[
                containerStyle.textHeaderSmall,
                { color: colors.whiteBackground },
                containerStyle.defaultTextMarginEnd,
              ]}
            />
            <Image
              source={images.flash}
              style={{ width: 20, height: 50, marginEnd: 20, marginLeft: 20 }}
            />
            <TextNormal
              clickable
              onPress={() => {
                NavigationService.navigate(
                  ScreenNames.ProductListByCategoryScreen,
                  { key: 'listHotPrice', banner: banner, title: 'Giá tốt trong tuần' },
                );
              }}
              text="XEM THÊM"
              style={[
                containerStyle.textDefaultContent,
                { color: colors.whiteBackground, zIndex: 100 },
                containerStyle.defaultTextMarginLeft,
              ]}
            />
          </ImageBackground>
          <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
            <TouchableOpacity
              onPress={() => {
                setKeyGood('all');
              }}
              style={{
                height: 40,
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
                paddingEnd: 10,
                paddingLeft: 10,
                marginEnd: 10,
                borderColor: colors.black_seventy,
                borderRadius: 10,
                borderWidth: 1,
                backgroundColor: keyGood === 'all' ? colors.blue : 'white',
              }}>
              <TextNormal text={'Tất cả'} />
            </TouchableOpacity>
            {userStore?.categories?.listCateHotWeek?.slice().map((item) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setKeyGood(item?.categoryName);
                  }}
                  style={{
                    height: 40,
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingEnd: 10,
                    paddingLeft: 10,
                    marginEnd: 10,
                    borderColor: colors.black_seventy,
                    borderRadius: 10,
                    borderWidth: 1,
                    backgroundColor:
                      keyGood === item?.categoryName ? colors.blue : 'white',
                  }}>
                  <TextNormal text={item?.categoryName || ''} />
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={{ marginTop: 0 }}>
            <ScrollView horizontal style={{ height: 150 }}>
              {userStore?.categories?.listHotWeek
                ?.slice()
                .filter((a) => a?.categoryName === keyGood || keyGood === 'all')
                .map((item) => {
                  let sale = `${Math.floor(
                    ((item?.priceSizes[0]?.salePrice || 0) * 100) /
                    item?.priceSizes[0]?.price,
                  )}`;
                  return (
                    <TouchableOpacity
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingEnd: 10,
                        marginEnd: 5,
                        borderColor: colors.gray_less,
                        borderRadius: 10,
                        borderWidth: 1,
                        // flexDirection: 'column',
                      }}
                      onPress={() => {
                        NavigationService.navigate(ScreenNames.ProductListByCategoryScreen, {
                          key: 'listHotPrice', banner: banner, title: item?.title
                        })
                      }}>
                      <View>
                        <FastImage
                          source={{
                            uri: item?.image?.url,
                          }}
                          cache={FastImage.cacheControl.cacheOnly}
                          style={{
                            width: ScreenWidth * 0.35,
                            height: ScreenWidth * 0.3,
                          }}
                        />
                        <TextNormal
                          text={`${item?.priceSizes[0]?.salePrice} / kg`}
                          style={{ color: 'black', textAlign: 'center' }}
                        />
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
                              style={{ color: 'white', fontSize: 11 }}
                            />
                          </View>
                        )}
                      </View>
                    </TouchableOpacity>
                  );
                })}
            </ScrollView>
          </View>
          <View style={{ marginTop: 20 }}>
            <View
              style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
              <TextNormal
                text={'Hot sale'}
                style={containerStyle.textHeaderSmall}
              />
              <TextNormal
                clickable
                onPress={() => {
                  NavigationService.navigate(
                    ScreenNames.ProductListByCategoryScreen,
                    { key: 'listHotSell', banner: banner, title: 'Hot sale' },
                  );
                }}
                text={'XEM THÊM'}
                style={containerStyle.textLink}
              />
            </View>
            <View
              style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
              <TouchableOpacity
                onPress={() => {
                  setKeySell('all');
                }}
                style={{
                  height: 40,
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingEnd: 10,
                  paddingLeft: 10,
                  marginEnd: 10,
                  borderColor: colors.black_seventy,
                  borderRadius: 10,
                  borderWidth: 1,
                  backgroundColor: keySell === 'all' ? colors.blue : 'white',
                }}>
                <TextNormal text={'Tất cả'} />
              </TouchableOpacity>
              {userStore?.categories?.listCateHotSale?.slice().map((item) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setKeySell(item?.categoryName);
                    }}
                    style={{
                      height: 40,
                      flexWrap: 'wrap',
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingEnd: 10,
                      paddingLeft: 10,
                      marginEnd: 10,
                      zIndex: 1000,
                      borderColor: colors.black_seventy,
                      borderRadius: 10,
                      borderWidth: 1,
                      backgroundColor:
                        keySell === item?.categoryName ? colors.blue : 'white',
                    }}>
                    <TextNormal text={item?.categoryName || ''} />
                  </TouchableOpacity>
                );
              })}
            </View>
            <ScrollView horizontal style={{ height: 150, width: '100%' }}>
              {userStore?.categories?.listHotSale
                ?.slice()
                ?.filter(
                  (a) => a?.categoryName === keySell || keySell === 'all',
                )
                .map((item) => {
                  let sale = `${Math.floor(
                    ((item?.priceSizes[0]?.salePrice || 0) * 100) /
                    item?.priceSizes[0]?.price,
                  )}`;
                  return (
                    <TouchableOpacity
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingEnd: 10,
                        marginEnd: 5,
                        borderColor: colors.gray_less,
                        borderRadius: 10,
                        borderWidth: 1,
                        // flexDirection: 'column',
                      }} onPress={() => {
                        NavigationService.navigate(ScreenNames.ProductListByCategoryScreen, {
                          key: 'listHotSell', banner: banner, title: item?.title
                        })
                      }}>
                      <View>
                        <FastImage
                          source={{
                            uri: item?.image?.url,
                          }}
                          cache={FastImage.cacheControl.cacheOnly}
                          style={{
                            width: ScreenWidth * 0.35,
                            height: ScreenWidth * 0.3,
                          }}
                        />
                        <TextNormal
                          text={`${item?.priceSizes[0]?.salePrice} / kg`}
                          style={{ color: 'black', textAlign: 'center' }}
                        />
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
                              style={{ color: 'white', fontSize: 11 }}
                            />
                          </View>
                        )}
                      </View>
                    </TouchableOpacity>
                  );
                })}
            </ScrollView>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginTop: 20,
                width: '100%'
              }}>
              <TextNormal
                text={'Video dành cho bạn'}
                style={containerStyle.textHeaderSmall}
              />
              <TextNormal
                clickable
                onPress={() => {
                  NavigationService.navigate(
                    ScreenNames.ProductListByCategoryScreen,
                    { key: 'listGuide', news: news, title: 'Video dành cho bạn' },
                  );
                }}
                text={'XEM THÊM'}
                style={containerStyle.textLink}
              />
              <View>
                <ScrollView horizontal style={{ height: ScreenWidth * 0.7 }}>
                  {(news?.news || [])?.map((item) => {
                    let id =
                      (item?.video_url || 'watch?v=a')?.split('watch?v=')[1] ||
                      '';
                    console.log(id);
                    return (
                      <YouTube
                        apiKey={'AIzaSyD-VuAxJLCUUmh0rAtiZytV2iI_t2sOh50'}
                        videoId={id || ''} // The YouTube video ID
                        play={false} // control playback of video with true/false
                        fullscreen={false} // control whether the video should play in fullscreen or inline
                        loop={false} // control whether the video should loop when ended
                        onReady={() => { }}
                        resumePlayAndroid={false}
                        onChangeState={() => { }}
                        onChangeQuality={() => { }}
                        onError={() => { }}
                        style={[styles.video]}
                        resumePlayAndroid={false}
                      />
                    );
                  })}
                </ScrollView>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return useObserver(() => (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View>
        <ScrollView style={{ height: '100%', padding: 20, paddingTop: 40 }}>
          <Searchbar placeholder="Search" onSubmitEditing={()=>{
            setLoading(true);
            setTimeout(()=>{
              setLoading(false);
              ToastHelper.showError('Không thấy dữ liệu bạn cần tìm');
            })
          }}/>
          {swipe()}
          {btnCategories()}
          {btnCategoriesBanner()}
          {productDealDaily()}
          {isLoading && <Loading />}
        </ScrollView>
      </View>
    </View>
  ));
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
    width: ScreenWidth * 0.9,
    height: 200,
    alignSelf: 'center',
    borderRadius: 20,
    marginEnd: 20,
    marginBottom: 10,
    marginTop: 20,
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
    // flex: 1,
    paddingTop: ScreenHeight / 10,
    alignItems: 'center',
    // height: '100%',
    width: '100%',
  },
  search: {
    width: '90%',
  },
  video: {
    alignSelf: 'stretch',
    height: ScreenWidth * 0.5,
    width: ScreenWidth * 0.9,
    margin: 0,
    marginEnd: 20,
    borderRadius: 5,
  },
});
