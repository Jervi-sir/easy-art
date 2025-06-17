import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CreateEventScreen from './screens/m3/create-event-screen';
import M5Navigation from './screens/m5/m5-navigation';
import M1Navigation from './screens/m1/m1-navigation';
import PaymentScreen from './screens/common/payment/payment-screen';
import SettingsScreen from './screens/m6/setting-screen';
import M6Navigation from './screens/m6/m6-navigation';
import M2Navigation from './screens/m2/m2-navigation';
import AuthScreen from './screens/auth/signup-screen';
import M4Navigation from './screens/m4/m4-navigation';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 40 }}></View>
      <M6Navigation />
      <StatusBar style="auto" />
    </View>
  );
}