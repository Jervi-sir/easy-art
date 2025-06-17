import { COLORS } from '@utils/constants/colors';
import { Dimensions, View, Platform, StatusBar} from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen';

const viewportHeight = Dimensions.get('window').height;
const WINDOW_HEIGHT = Dimensions.get('window').height;

let statusBarHeight = 0;
const platform = Platform.OS;
if (platform === 'android') {
   statusBarHeight = 0;
} else {
   statusBarHeight = 44;
}

const VIEWPORT_HEIGHT = WINDOW_HEIGHT - statusBarHeight;

export const StatusBarTop = () => {
  const height = viewportHeight - VIEWPORT_HEIGHT;

  if(platform === 'web')
    return null;
  return(
    <View style={{ backgroundColor: COLORS.white, height: 40 }} >
      <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.white} />
    </View>
  )
}
