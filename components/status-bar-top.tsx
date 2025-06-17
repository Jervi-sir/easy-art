import { COLORS } from '@utils/constants/colors';
import { Dimensions, View, Platform, StatusBar} from 'react-native'


const platform = Platform.OS;

export const StatusBarTop = () => {

  if(platform === 'web')
    return null;
  return(
    <View style={{ backgroundColor: COLORS.primary, height: 40 }} >
      <StatusBar barStyle={'light-content'} backgroundColor={COLORS.primary} />
    </View>
  )
}
