import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '@utils/constants/colors';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import WelcomeScreen from '@screens/welcome/welcome-screen';
import { Routes } from '@utils/constants/Routes';
import { NavigationScreen } from '@screens/navigation-screen';
import JoinEventScreen from '@screens/m3/join-event-screen';
import { StatusBarTop } from '@components/status-bar-top';
import CreateEventScreen from '@screens/m3/create-event-screen';
import SettingsScreen from '@screens/m6/setting-screen';

export default function App() {
  return (
    <>
      <StatusBarTop />
      <GestureHandlerRootView>
        <NavigationContainer >
          <Navigation />
        </NavigationContainer>
      </GestureHandlerRootView>
    </>

  );
}


const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <>
      {/* <StatusBarTop /> */}
      <Stack.Navigator
        id={undefined}
        screenOptions={{
          lazy: true,
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS
        } as any}
        // initialRouteName={initialRoute} 
      >
        {[
          { name: Routes.NavigationScreen, component: NavigationScreen },
          { name: Routes.WelcomeScreen, component: WelcomeScreen },
          { name: Routes.JoinEventScreen, component: JoinEventScreen },
          { name: Routes.CreateEventScreen, component: CreateEventScreen },
          { name: Routes.SettingsScreen, component: SettingsScreen },


        ].map((item, index) => (
          <Stack.Screen
            key={index}
            name={item.name}
            component={item.component as any}
          />
        ))
        }
      </Stack.Navigator>
    </>
  )
}
