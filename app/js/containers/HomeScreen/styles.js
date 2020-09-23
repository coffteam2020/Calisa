import {StyleSheet} from 'react-native';
import {ScreenWidth} from '../../shared/utils/dimension/Divices';
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
    width: '100%',
    height: '90%',
  },
  img: {
    marginLeft: SPACINGS.avg,
    width: ScreenWidth / 3,
    height: ScreenWidth / 3,
  },
  // wrapper: {},
  slide1: {
    width: '100%',
    height: ScreenWidth * 0.35,
    borderRadius: 10,
  },
});
export default {styles};
