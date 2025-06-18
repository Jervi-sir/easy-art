import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch, Platform, Alert, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../utils/constants/colors';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '@utils/constants/Routes';
import { useSettingsStore } from 'zustand/settings.store';
import { useDataStore } from 'zustand/data.store';

const SettingsScreen = () => {
  const navigation: any = useNavigation();
  // Get state and actions from the settings store
  const { notifications, darkMode, setNotifications, toggleTheme } = useSettingsStore();
  const { resetData } = useDataStore(); // Get the reset function from the store

  const handleComingSoon = () => {
    Alert.alert("Prochainement", "Cette fonctionnalité sera bientôt disponible.");
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Paramètres</Text>
      </View>

      <ScrollView bounces={false}>
        <Text style={styles.sectionHeader}>Compte</Text>
        <View style={styles.section}>
          <SettingsRow icon="shield-checkmark-outline" title="Sécurité" onPress={handleComingSoon} hasChevron />
          <SettingsRow icon="person-outline" title="Informations personnelles" onPress={() => navigation.navigate(Routes.EditProfileScreen)} hasChevron />
        </View>

        <Text style={styles.sectionHeader}>Notifications</Text>
        <View style={styles.section}>
          <SettingsRow icon="notifications-outline" title="Nouveaux événements" isSwitch switchValue={notifications.events} onSwitchChange={(value: any) => setNotifications({ events: value })} />
          <SettingsRow icon="chatbubble-ellipses-outline" title="Messages" isSwitch switchValue={notifications.messages} onSwitchChange={(value: any) => setNotifications({ messages: value })} />
          <SettingsRow icon="pricetag-outline" title="Promotions" isSwitch switchValue={notifications.promotions} onSwitchChange={(value: any) => setNotifications({ promotions: value })} />
        </View>

        <Text style={styles.sectionHeader}>Préférences</Text>
        <View style={styles.section}>
          <SettingsRow icon="moon-outline" title="Mode sombre" isSwitch switchValue={darkMode} onSwitchChange={toggleTheme} />
          <SettingsRow icon="language-outline" title="Langue" value="Français" onPress={handleComingSoon} hasChevron />
        </View>

        <Text style={styles.sectionHeader}>Support</Text>
        <View style={styles.section}>
          <SettingsRow icon="help-circle-outline" title="Centre d'aide" onPress={() => navigation.navigate(Routes.HelpCenterScreen)} hasChevron />
          <SettingsRow icon="chatbubble-ellipses-outline" title="Nous contacter" onPress={handleComingSoon} hasChevron />
          <SettingsRow icon="flag-outline" title="Signaler un problème" onPress={handleComingSoon} hasChevron />
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

// Re-usable SettingsRow component (no changes needed)
// @ts-ignore
const SettingsRow: any = ({ icon, title, onPress, isSwitch, switchValue, onSwitchChange, hasChevron, value }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.row} disabled={!onPress && !isSwitch}>
      <Ionicons name={icon} size={24} color={COLORS.primary} style={styles.icon} />
      <Text style={styles.title}>{title}</Text>
      {isSwitch ? (
        <Switch trackColor={{ false: '#767577', true: COLORS.primaryLight }} thumbColor={switchValue ? COLORS.primary : '#f4f3f4'} onValueChange={onSwitchChange} value={switchValue} />
      ) : hasChevron ? (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {value && <Text style={styles.valueText}>{value}</Text>}
          <Ionicons name="chevron-forward" size={22} color={COLORS.darkGray} />
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', gap: 20, paddingHorizontal: 20, backgroundColor: COLORS.primary, paddingTop: Platform.OS === 'android' ? 30 : 20, paddingBottom: 15 },
  backButton: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: COLORS.white },
  sectionHeader: { fontSize: 14, color: COLORS.darkGray, fontWeight: '600', textTransform: 'uppercase', marginTop: 30, marginBottom: 10, marginHorizontal: 20 },
  section: { backgroundColor: COLORS.white, marginHorizontal: 20, borderRadius: 15, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 15, backgroundColor: COLORS.white },
  icon: { marginRight: 15 },
  title: { flex: 1, fontSize: 16, fontWeight: '500' },
  valueText: { fontSize: 16, color: COLORS.darkGray, marginRight: 5 },
});


export default SettingsScreen;