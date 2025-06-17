import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Dimensions, Platform, Text, View } from 'react-native';
import M1Navigation from './m1/m1-navigation';
import M2Navigation from './m2/m2-navigation';
import M3Navigation from './m3/m3-navigation';
import M4Navigation from './m4/m4-navigation';
import M5Navigation from './m5/m5-navigation';
import { Routes } from '@utils/constants/Routes';
import M6Navigation from './m6/m6-navigation';

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('screen');
const menuIconWidth = width / 5 - 10;

export const NavigationScreen = () => {
  return (
    <>
      <Tab.Navigator
        id={undefined}
        initialRouteName={Routes.M1}
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: true,
          tabBarInactiveTintColor: 'black',
          tabBarActiveTintColor: 'black',
          tabBarStyle: {
            backgroundColor: 'white',
            paddingTop: 5,
            height: Platform.OS === "ios" ? 50 : 60,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
            marginBottom: Platform.OS === 'ios' ? 5 : 5,
          },
          tabBarHideOnKeyboard: true
        }}
      >
        {[
          { key: Routes.M1, routeName: Routes.M1, component: M1Navigation, Icon: HomeIcon, title: 'Accueil' },
          { key: Routes.M2, routeName: Routes.M2, component: M2Navigation, Icon: SparksIcon, title: 'Recherche' },
          { key: Routes.M3, routeName: Routes.M3, component: M3Navigation, Icon: ArchiveIcon, title: 'Evenement' },
          { key: Routes.M4, routeName: Routes.M4, component: M4Navigation, Icon: InboxIcon, title: 'Favoris' },
          { key: Routes.M5, routeName: Routes.M5, component: M5Navigation, Icon: ProfileIcon, title: 'Abonnement' },
          { key: Routes.M6, routeName: Routes.M6, component: M6Navigation, Icon: ProfileIcon, title: 'Profil' },
        ].map((tab: any, index) => (
          <Tab.Screen
            key={index}
            name={tab.routeName}
            component={tab.component}
            options={{
              tabBarLabel: ({ focused }) => (
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{
                    color: 'black',
                    fontSize: 11,
                    fontWeight: '500',
                  }}>
                    {tab.title}
                  </Text>
                </View>
              ),
              tabBarIconStyle: {
                width: menuIconWidth,
              },
              tabBarItemStyle: {
                justifyContent: 'center',
                flex: 1,
              },
              tabBarIcon: ({ focused, color }) => (
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: Platform.OS === "ios" ? 0 : -6, height: 42, width: menuIconWidth }}>
                  <tab.Icon isActive={focused} color={'black'} />
                </View>
              ),
            }}
            
          />
        ))
        }
      </Tab.Navigator>
    </>
  );
};

const HomeIcon = ({ isActive, color }: any) => <Text style={{ color }}>🏠</Text>;
const SparksIcon = ({ isActive, color }: any) => <Text style={{ color }}>✨</Text>;
const ArchiveIcon = ({ isActive, color }: any) => <Text style={{ color }}>📦</Text>;
const InboxIcon = ({ isActive, color }: any) => <Text style={{ color }}>📥</Text>;
const ProfileIcon = ({ isActive, color }: any) => <Text style={{ color }}>👤</Text>;
