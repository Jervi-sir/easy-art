import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../utils/constants/colors';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
  const navigation: any = useNavigation();
  const [eventsNotif, setEventsNotif] = useState(true);
  const [messagesNotif, setMessagesNotif] = useState(true);
  const [promoNotif, setPromoNotif] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        paddingHorizontal: 20,
        backgroundColor: COLORS.primary,
        paddingTop: 20,
        paddingBottom: 10,
      }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ width: 40, height: 40, backgroundColor: COLORS.primaryLight, borderRadius: 100, alignItems: 'center', justifyContent: 'center' }}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: COLORS.white }}>Paramètres</Text>
      </View>
      <ScrollView bounces={false} style={{ flex: 1, backgroundColor: COLORS.background }}>


        <Text style={{
          fontSize: 16,
          paddingHorizontal: 20,
          backgroundColor: COLORS.primary,
          paddingBottom: 20,
          color: COLORS.white
        }}>
          Personnalisez votre expérience EasyArt
        </Text>

        <Text style={{
          fontSize: 14,
          color: COLORS.darkGray,
          fontWeight: '600',
          textTransform: 'uppercase',
          marginTop: 30,
          marginBottom: 10,
          marginHorizontal: 20
        }}>
          Compte
        </Text>

        <View style={{
          backgroundColor: COLORS.white,
          marginHorizontal: 20,
          borderRadius: 15,
          overflow: 'hidden',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.15,
        }}>
          <SettingsRow
            icon="shield-checkmark-outline"
            title="Sécurité"
            subtitle="Mot de passe et authentification"
            onPress={() => { }}
            hasChevron
            value="Modifier"
          />
          <View style={{ height: 1, backgroundColor: COLORS.gray, marginLeft: 54 }} />
          <SettingsRow
            icon="person-outline"
            title="Informations personnelles"
            subtitle="Email, téléphone, adresse"
            onPress={() => { }}
            hasChevron
            value="Modifier"
          />
        </View>

        <Text style={{
          fontSize: 14,
          color: COLORS.darkGray,
          fontWeight: '600',
          textTransform: 'uppercase',
          marginTop: 30,
          marginBottom: 10,
          marginHorizontal: 20
        }}>
          Notifications
        </Text>

        <View style={{
          backgroundColor: COLORS.white,
          marginHorizontal: 20,
          borderRadius: 15,
          overflow: 'hidden',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.15,
        }}>
          <SettingsRow
            icon="notifications-outline"
            title="Nouveaux événements"
            subtitle="Notifications pour les événements dans votre région"
            isSwitch
            switchValue={eventsNotif}
            onSwitchChange={setEventsNotif}
          />
          <View style={{ height: 1, backgroundColor: COLORS.gray, marginLeft: 54 }} />
          <SettingsRow
            icon="chatbubble-ellipses-outline"
            title="Messages"
            subtitle="Messages des organisateurs et participants"
            isSwitch
            switchValue={messagesNotif}
            onSwitchChange={setMessagesNotif}
          />
          <View style={{ height: 1, backgroundColor: COLORS.gray, marginLeft: 54 }} />
          <SettingsRow
            icon="pricetag-outline"
            title="Promotions"
            subtitle="Offres spéciales et réductions"
            isSwitch
            switchValue={promoNotif}
            onSwitchChange={setPromoNotif}
          />
        </View>

        <Text style={{
          fontSize: 14,
          color: COLORS.darkGray,
          fontWeight: '600',
          textTransform: 'uppercase',
          marginTop: 30,
          marginBottom: 10,
          marginHorizontal: 20
        }}>
          Préférences de l'application
        </Text>

        <View style={{
          backgroundColor: COLORS.white,
          marginHorizontal: 20,
          borderRadius: 15,
          overflow: 'hidden',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.15,
        }}>
          <SettingsRow
            icon="moon-outline"
            title="Mode sombre"
            subtitle="Interface sombre pour vos yeux"
            isSwitch
            switchValue={darkMode}
            onSwitchChange={setDarkMode}
          />
          <View style={{ height: 1, backgroundColor: COLORS.gray, marginLeft: 54 }} />
          <SettingsRow
            icon="language-outline"
            title="Langue"
            subtitle="Langue de l'interface"
            onPress={() => { }}
            hasChevron
            value="Français"
          />
        </View>

        <Text style={{
          fontSize: 14,
          color: COLORS.darkGray,
          fontWeight: '600',
          textTransform: 'uppercase',
          marginTop: 30,
          marginBottom: 10,
          marginHorizontal: 20
        }}>
          Support
        </Text>

        <View style={{
          backgroundColor: COLORS.white,
          marginHorizontal: 20,
          borderRadius: 15,
          overflow: 'hidden'
        }}>
          <SettingsRow
            icon="help-circle-outline"
            title="Centre d'aide"
            subtitle="FAQ et guides d'utilisation"
            onPress={() => { }}
            hasChevron
          />
          <View style={{ height: 1, backgroundColor: COLORS.gray, marginLeft: 54 }} />
          <SettingsRow
            icon="chatbubble-ellipses-outline"
            title="Nous contacter"
            subtitle="Support client et assistance"
            onPress={() => { }}
            hasChevron
          />
          <View style={{ height: 1, backgroundColor: COLORS.gray, marginLeft: 54 }} />
          <SettingsRow
            icon="flag-outline"
            title="Signaler un problème"
            subtitle="Bugs et problèmes techniques"
            onPress={() => { }}
            hasChevron
          />
        </View>

        <Text style={{
          fontSize: 14,
          color: COLORS.darkGray,
          fontWeight: '600',
          textTransform: 'uppercase',
          marginTop: 30,
          marginBottom: 10,
          marginHorizontal: 20
        }}>
          À propos
        </Text>

        <View style={{
          backgroundColor: COLORS.white,
          marginHorizontal: 20,
          borderRadius: 15,
          overflow: 'hidden'
        }}>
          <SettingsRow
            icon="apps-outline"
            title="Version de l'application"
            onPress={() => { }}
            hasChevron
            value="1.0.0"
          />
          <View style={{ height: 1, backgroundColor: COLORS.gray, marginLeft: 54 }} />
          <SettingsRow
            icon="document-text-outline"
            title="Conditions d'utilisation"
            onPress={() => { }}
            hasChevron
          />
          <View style={{ height: 1, backgroundColor: COLORS.gray, marginLeft: 54 }} />
          <SettingsRow
            icon="shield-outline"
            title="Politique de confidentialité"
            onPress={() => { }}
            hasChevron
          />
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

const SettingsRow = ({ icon, title, subtitle, onPress, isSwitch, switchValue, onSwitchChange, hasChevron, value }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 15,

      }}
      disabled={!onPress}
    >
      <Ionicons name={icon} size={24} color={COLORS.primary} style={{ marginRight: 15 }} />
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: '500' }}>{title}</Text>
        {subtitle && <Text style={{ fontSize: 12, color: COLORS.darkGray, marginTop: 2 }}>{subtitle}</Text>}
      </View>
      {isSwitch ? (
        <Switch
          trackColor={{ false: '#767577', true: COLORS.primaryLight }}
          thumbColor={switchValue ? COLORS.primary : '#f4f3f4'}
          onValueChange={onSwitchChange}
          value={switchValue}
        />
      ) : hasChevron ? (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {value && <Text style={{ fontSize: 16, color: COLORS.darkGray, marginRight: 5 }}>{value}</Text>}
          <Ionicons name="chevron-forward" size={22} color={COLORS.darkGray} />
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

export default SettingsScreen;