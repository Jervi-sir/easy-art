import { SafeAreaView, ActivityIndicator, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import WelcomeScreen from '@screens/welcome/welcome-screen';
import { Routes } from '@utils/constants/Routes';
import { NavigationScreen } from '@screens/navigation-screen';
import JoinEventScreen from '@screens/m3/join-event-screen';
import { StatusBarTop } from '@components/status-bar-top';
import CreateEventScreen from '@screens/m3/create-event-screen';
import SettingsScreen from '@screens/m6/setting-screen';
import AuthScreen from '@screens/auth/auth-screen'; // --- Import AuthScreen
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '@utils/constants/colors';
import { useAuthStore } from 'zustand/auth.store';
import { useSettingsStore } from 'zustand/settings.store';
import PaymentScreen from '@screens/common/payment/payment-screen';
import EditProfileScreen from '@screens/m6/edit-profile-screen';
import HelpCenterScreen from '@screens/m6/help-center-screen';

export default function App() {
  const { darkMode } = useSettingsStore();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBarTop />
      {/* Apply the theme to the entire navigator */}
      <NavigationContainer theme={darkMode ? DarkTheme : DefaultTheme}>
        <Navigation />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const Stack = createStackNavigator();

const Navigation = () => {
  const { isAuthenticated } = useAuthStore();
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if the app has been launched before
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  // Show a loading screen while checking for the first launch
  if (isFirstLaunch === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.primary }}>
        <ActivityIndicator size="large" color={COLORS.white} />
      </View>
    );
  }

  return (
    <Stack.Navigator
      id={undefined}
      screenOptions={{
        lazy: true,
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      {isAuthenticated ? (
        // --- Screens accessible only when authenticated ---
        <>
          <Stack.Screen name={Routes.NavigationScreen} component={NavigationScreen} />
          {/* You can add other main app screens here that are not in the tab navigator */}
          <Stack.Screen name={Routes.JoinEvent} component={JoinEventScreen} />
          <Stack.Screen name={Routes.CreateEventScreen} component={CreateEventScreen} />
          <Stack.Screen name={Routes.SettingsScreen} component={SettingsScreen} />
          <Stack.Screen name={Routes.PaymentScreen} component={PaymentScreen} />
          <Stack.Screen name={Routes.HelpCenterScreen} component={HelpCenterScreen} />
          <Stack.Screen name={Routes.EditProfileScreen} component={EditProfileScreen} />
        </>
      ) : (
        // --- Authentication flow screens ---
        <>
          {isFirstLaunch && (
            <Stack.Screen name={Routes.WelcomeScreen} component={WelcomeScreen} />
          )}
          <Stack.Screen name={Routes.AuthScreen} component={AuthScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};