import {StyleSheet} from 'react-native';
import {ScreenWidth, ScreenHeight} from '../../shared/utils/dimension/Divices';
import {SPACINGS} from '../../themes';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: ScreenWidth,
    height: ScreenHeight / 2,
    marginTop: ScreenHeight / 6,
    marginBottom: ScreenHeight / 8,
  },
  img: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: ScreenWidth / 10,
    width: ScreenWidth / 5,
    height: ScreenWidth / 5,
  },
  imgFooter: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: ScreenHeight / 5,
    zIndex: -1,
    width: ScreenWidth,
  },
  field: {
    width: ScreenWidth * 0.88,
    height: 50,
    marginTop: 30,
  },
});

export default {
  styles,
};
