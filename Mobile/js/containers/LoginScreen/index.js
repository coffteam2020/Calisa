/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {StatusBar, View, Image, Platform, TouchableOpacity} from 'react-native';
import {styles} from './style';
import {images} from '../../../assets/index';
import {withTheme} from 'react-native-paper';
import TextNormal from '../../shared/components/Text/TextNormal';
import {containerStyle} from '../../themes/styles';
import AsyncStorage from '@react-native-community/async-storage';
import i18n from '../../shared/utils/locale/i18n';
import IALocalStorage from '../../shared/utils/storage/IALocalStorage';
import {useStores} from '../../store/useStore';
import GradientButton from '../../shared/components/Buttons/GradientButton';
import {OutlinedTextField} from 'react-native-material-textfield';
import {colors} from '../../shared/utils/colors/colors';
import Loading from '../../shared/components/Loading';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AxiosFetcher from '../../api/AxiosFetch';
import * as RNLocalize from 'react-native-localize';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TextInputFlat from '../../shared/components/TextInput/TextInputFlat';
import {ToastHelper} from '../../shared/components/ToastHelper';
import DeviceInfo from 'react-native-device-info';
import publicIP from 'react-native-public-ip';
import {NavigationService} from '../../navigation';
import notifee from '@notifee/react-native';
import TouchID from 'react-native-touch-id';
import {ScreenNames} from '../../route/ScreenNames';
import HeaderImg from '../../shared/components/HeaderImg';
import {ScreenWidth} from '../../shared/utils/dimension/Divices';
import LogManager from '../../shared/utils/logging/LogManager';
import Constant from '../../shared/utils/constant/Constant';
const optionalConfigObject = {
  title: 'Yêu cầu xác thực', // Android
  color: '#e00606', // Android,
  fallbackLabel: 'Hiện mã code', // iOS
};
const LoginScreen = (props) => {
  const {colorsApp} = props.theme;
  const [userName, setUserName] = useState('');
  const [type, setType] = useState('login');
  const [gender, setGender] = useState(1);
  const [userNameErr, setUserNameErr] = useState(null);
  const [year, setYear] = useState(new Date().getFullYear());
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [month, setMonth] = useState(1);
  const [date, setDate] = useState(1);
  const [user, setUser] = useState({});

  useEffect(()=>{
    GoogleSignin.configure({
			webClientId: Constant.WEB_CLIENT_ID,
		});
  }, [])
  const onLogin = async (mail, pass) => {
    AxiosFetcher({
      method: 'POST',
      data: {
        email: mail ? mail : userName,
        password: pass ? pass : password,
      },
      url: 'auth/sign-in',
      hasToken: false,
    }).then(async (a) => {
      if (a?.content) {
        ToastHelper.showSuccess(a?.content || 'Đăng nhập thành công');
        await IALocalStorage.setDetailUserInfo(a);
        setTimeout(() => {
          NavigationService.goBack();
        }, 1000);
      } else {
        ToastHelper.showError('Sai tên đăng nhập hoặc mật khẩu');
      }
    });
  };
  const onLoginSocial = async (mail, pass) => {
    AxiosFetcher({
      method: 'POST',
      data: {
        email: mail ? mail : userName,
        password: pass ? pass : password,
      },
      url: 'auth/sign-in',
      hasToken: false,
    }).then(async (a) => {
      if (a?.content) {
        ToastHelper.showSuccess(a?.content || 'Đăng nhập thành công');
        await IALocalStorage.setDetailUserInfo(a);
        setTimeout(() => {
          NavigationService.goBack();
        }, 1000);
      } else {
        ToastHelper.showError('Sai tên đăng nhập hoặc mật khẩu');
      }
    });
  };
  const onRegister = async () => {
    if (user?.pass?.length < 6) {
      ToastHelper.showError('Mật khẩu phải lớn hơn 6 ký tự');
      return;
    }
    let data = {
      email: user.email,
      firstName: userName,
      gender: gender,
      lastName: userName,
      password: user.pass,
      passwordConfirm: user.pass,
      phone: user.phone,
      role: 2,
    };
    AxiosFetcher({
      method: 'POST',
      customBaseUrl: 'http://calisa.techer.vn/',
      hasBaseURL: true,
      data: {
        email: user.email,
        firstName: userName,
        gender: gender,
        lastName: userName,
        password: user.pass,
        passwordConfirm: user.pass,
        phone: user.phone,
        role: 2,
      },
      url: '/api/auth/sign-up',
      hasToken: false,
    }).then(async (a) => {
      if (a?.content) {
        ToastHelper.showSuccess(a?.content || 'Đăng ký thành công');
        await IALocalStorage.setDetailUserInfo(data);
        setTimeout(() => {
          NavigationService.goBack();
        }, 1000);
      } else {
        ToastHelper.showError('Đăng ký thất bại');
      }
    });
  };
  const signInFacebook = async () => {
    LoginManager.logInWithPermissions(['public_profile', 'email'])
      .then(
        (result) => {
          if (!result.isCancelled) {
            _getFBUserInfo();
          } else {
          }
        },
        (err) => {
          console.log(err?.message);

          ToastHelper.showError('Lỗi xác thực facebook: FB-OAuth2 error');
        },
      )
      .catch((err) => {
        console.log(err?.message);
        ToastHelper.showError(
          'Lỗi: FB-OAuth2 error. We are trying to fix this issue.',
        );
      });
  };

  const _getFBUserInfo = async () => {
    await AccessToken.getCurrentAccessToken()
      .then((user) => {
        console.log(LogManager.parseJsonObjectToJsonString(user));
        // There are some info here:
        // user.accessToken
        // user.accessTokenSource
        // user.userID
        // IALocalStorage.setTokenUserInfoFacebook(user.accessToken);
        return user;
      })
      .then((user) => {
        const responseInfoCallback = (error, result) => {
          if (error) {
            // this.alertInfo(langs.errorFetchingDataFB, error.toString());
          } else {
            // There are some info here:
            // email, id, last_name, first_name, name, picture.
            // They are exist here because of depending on the fields in GraphRequest
            console.log(
              'Access Facebook SDK for userInfo: ' +
                LogManager.parseJsonObjectToJsonString(result),
            );
            let email = result.email;
            if (email) {
              // setEmail(email);
              // onFireBaseCheckEmail(user?.accessToken || '', email);
            } else {
              if (result?.id) {
                // setEmail(result?.id);
                // onFireBaseCheckEmail(user?.accessToken || '', '', result?.id);
              } else {
                // ToastHelper.showError(t('error.emailNotExist'));
              }
            }
          }
        };
        // Config request for getting information
        const infoRequest = new GraphRequest(
          '/me',
          {
            accessToken: user.accessToken,
            parameters: {
              fields: {
                string: 'email, name, first_name, last_name, picture',
              },
            },
          },
          responseInfoCallback,
        );

        // Start the graph request.
        new GraphRequestManager().addRequest(infoRequest).start();
      });
  };
  const signInGoogle = async () => {
    try {
      let support = await GoogleSignin.hasPlayServices();
      if (support) {
        const userInfo = await GoogleSignin.signIn();
        console.log(JSON.stringify(userInfo));
        if (userInfo) {
          onLogin(userInfo?.user?.email, '');
          // setEmail(userInfo.user.email);
          // onFireBaseCheckEmail(userInfo.idToken, userInfo.user.email);
        } else {
          // ToastHelper.showError(t('socialAuthen.google.other'));
        }
      } else {
        // ToastHelper.showError(t('socialAuthen.google.notSupport'));
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // ToastHelper.showError(t('socialAuthen.google.cancel'));
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // ToastHelper.showWarning(t('socialAuthen.google.inProgress'));
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // ToastHelper.showError(t('socialAuthen.google.notSupport'));
      } else {
        // ToastHelper.showError(t('socialAuthen.google.other'));
      }
    }
  };
  return (
    <View
      style={[
        containerStyle.center,
        containerStyle.defaultBackground,
        {flex: 1},
      ]}>
      <StatusBar barStyle={colorsApp.statusBar} hidden />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        style={{alignSelf: 'center', alignContent: 'center', flex: 1}}>
        <View style={styles.content}>
          <HeaderImg hasBack title="Đăng nhập | Đăng ký" />
          <View style={{marginTop: 20, alignItems: 'center'}}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={{alignItems: 'center', width: '50%'}}
                onPress={() => setType('login')}>
                <TextNormal
                  text="ĐĂNG NHẬP"
                  style={{fontWeight: type === 'login' ? 'bold' : 'normal'}}
                />
                <View
                  style={{
                    backgroundColor: type === 'login' ? colors.blue : 'white',
                    height: 5,
                    width: '100%',
                    marginTop: 10,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{alignItems: 'center', width: '50%'}}
                onPress={() => setType('signup')}>
                <TextNormal
                  text="ĐĂNG KÝ"
                  style={{fontWeight: type === 'signup' ? 'bold' : 'normal'}}
                />
                <View
                  style={{
                    backgroundColor: type === 'signup' ? colors.blue : 'white',
                    height: 5,
                    width: '100%',
                    marginTop: 10,
                  }}
                />
              </TouchableOpacity>
            </View>
            {type === 'login' ? (
              <View style={{marginTop: 20}}>
                <TextInputFlat
                  text="Địa chỉ email"
                  props={props}
                  onChangeText={(text) => setUserName(text)}
                />
                <TextInputFlat
                  text="Mật khẩu"
                  props={props}
                  onChangeText={(text) => setPassword(text)}
                />
                <GradientButton
                  onPress={() => {
                    onLogin();
                  }}
                  fromColor="red"
                  toColor="red"
                  style={{
                    alignSelf: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                  }}
                  text="Đăng nhập"
                />
                <TextNormal
                  style={{marginTop: 20, marginBottom: 20, alignSelf: 'center'}}
                  text={'Đăng nhập với'}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    alignSelf: 'center',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    style={{marginEnd: 5}}
                    onPress={() => signInFacebook()}>
                    <Image source={images.fb} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{marginLeft: 5}}
                    onPress={() => signInGoogle()}>
                    <Image source={images.gg} />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={{marginTop: 20}}>
                <TextInputFlat
                  text="Họ và tên"
                  props={props}
                  onChangeText={(text) => setUserName(text)}
                />
                <TextInputFlat
                  text="Số điện thoại"
                  props={props}
                  keyboardType="number-pad"
                  onChangeText={(text) => setUser({...user, phone: text})}
                />
                <TextInputFlat
                  text="Email"
                  props={props}
                  onChangeText={(text) => setUser({...user, email: text})}
                />
                <TextInputFlat
                  text="Mật khẩu"
                  secureText
                  props={props}
                  onChangeText={(text) => setUser({...user, pass: text})}
                />
                <View style={{flexDirection: 'row'}}>
                  <View>
                    <TextNormal text="Ngày sinh" />
                    <View
                      style={{
                        borderRadius: 5,
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderWidth: 0.5,
                        borderColor: 'gray',
                        width: ScreenWidth / 3.5,
                        overflow: 'hidden',
                      }}>
                      <View style={{alignItems: 'center', padding: 5, flex: 2}}>
                        <TextNormal text={`${date}`} />
                      </View>
                      <View
                        style={{
                          alignItems: 'flex-end',
                          flex: 1,
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            if (date + 1 > 31) {
                              setDate(1);
                            } else {
                              setDate(date + 1);
                            }
                          }}
                          style={{backgroundColor: colors.gray_bg}}>
                          <Ionicons name="chevron-up" size={25} />
                        </TouchableOpacity>
                        <View
                          style={{
                            height: 1,
                            backgroundColor: colors.gray_less,
                            width: '96%',
                          }}
                        />
                        <TouchableOpacity
                          onPress={() => {
                            if (date - 1 <= 0) {
                              setDate(31);
                            } else {
                              setDate(date - 1);
                            }
                          }}
                          style={{backgroundColor: colors.gray_bg}}>
                          <Ionicons name="chevron-down-sharp" size={25} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  <View style={{marginLeft: 10}}>
                    <TextNormal text="Tháng sinh" />
                    <View
                      style={{
                        borderRadius: 5,
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderWidth: 0.5,
                        borderColor: 'gray',
                        width: ScreenWidth / 3.5,
                        overflow: 'hidden',
                      }}>
                      <View style={{alignItems: 'center', padding: 5, flex: 2}}>
                        <TextNormal text={`${month}`} />
                      </View>
                      <View
                        style={{
                          alignItems: 'flex-end',
                          flex: 1,
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            if (month + 1 > 12) {
                              setMonth(1);
                            } else {
                              setMonth(month + 1);
                            }
                          }}
                          style={{backgroundColor: colors.gray_bg}}>
                          <Ionicons name="chevron-up" size={25} />
                        </TouchableOpacity>
                        <View
                          style={{
                            height: 1,
                            backgroundColor: colors.gray_less,
                            width: '96%',
                          }}
                        />
                        <TouchableOpacity
                          onPress={() => {
                            if (month - 1 <= 0) {
                              setMonth(12);
                            } else {
                              setMonth(month - 1);
                            }
                          }}
                          style={{backgroundColor: colors.gray_bg}}>
                          <Ionicons name="chevron-down-sharp" size={25} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  <View style={{marginLeft: 10}}>
                    <TextNormal text="Năm sinh" />
                    <View
                      style={{
                        borderRadius: 5,
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderWidth: 0.5,
                        borderColor: 'gray',
                        width: ScreenWidth / 3.5,
                        overflow: 'hidden',
                      }}>
                      <View style={{alignItems: 'center', padding: 5, flex: 2}}>
                        <TextNormal text={`${year}`} />
                      </View>
                      <View
                        style={{
                          alignItems: 'flex-end',
                          flex: 1,
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            if (year + 1 > new Date().getFullYear()) {
                            } else {
                              setYear(year + 1);
                            }
                          }}
                          style={{backgroundColor: colors.gray_bg}}>
                          <Ionicons name="chevron-up" size={25} />
                        </TouchableOpacity>
                        <View
                          style={{
                            height: 1,
                            backgroundColor: colors.gray_less,
                            width: '96%',
                          }}
                        />
                        <TouchableOpacity
                          onPress={() => {
                            setYear(year - 1);
                          }}
                          style={{backgroundColor: colors.gray_bg}}>
                          <Ionicons name="chevron-down-sharp" size={25} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={{flexDirection: 'row', marginTop: 20}}>
                  <TouchableOpacity
                    style={{flexDirection: 'row', alignItems: 'center'}}
                    onPress={() => setGender(1)}>
                    <View
                      style={{
                        backgroundColor: gender === 1 ? colors.blue : 'white',
                        borderRadius: 7,
                        width: 14,
                        height: 14,
                        marginEnd: 10,
                        borderWidth: 0.5,
                        borderColor: 'black',
                      }}
                    />
                    <TextNormal text="Nam" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginLeft: 30,
                    }}
                    onPress={() => setGender(0)}>
                    <View
                      style={{
                        backgroundColor: gender === 0 ? colors.blue : 'white',
                        borderRadius: 7,
                        width: 14,
                        height: 14,
                        marginEnd: 10,
                        borderWidth: 0.5,
                        borderColor: 'black',
                      }}
                    />
                    <TextNormal text="Nữ" />
                  </TouchableOpacity>
                </View>
                <GradientButton
                  onPress={() => {
                    onRegister();
                  }}
                  fromColor="red"
                  toColor="red"
                  style={{
                    alignSelf: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                  }}
                  text="Đăng ký"
                />
              </View>
            )}
          </View>
        </View>
      </KeyboardAwareScrollView>
      {isLoading && <Loading />}
    </View>
  );
};

export default withTheme(LoginScreen);
