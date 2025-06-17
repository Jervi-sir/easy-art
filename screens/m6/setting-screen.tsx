// SettingsScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../utils/constants/colors';



const SettingsScreen = () => {
  const [eventsNotif, setEventsNotif] = useState(true);
  const [messagesNotif, setMessagesNotif] = useState(true);
  const [promoNotif, setPromoNotif] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Paramètres</Text>
        <View style={{ width: 24 }} />
      </View>
      <Text style={styles.screenSubtitle}>Personnalisez votre expérience EasyArt</Text>

      <Text style={styles.sectionHeader}>Compte</Text>
      <View style={styles.section}>
        <SettingsRow icon="shield-checkmark-outline" title="Sécurité" subtitle="Mot de passe et authentification" onPress={() => {}} hasChevron value="Modifier" />
        <View style={styles.divider}/>
        <SettingsRow icon="person-outline" title="Informations personnelles" subtitle="Email, téléphone, adresse" onPress={() => {}} hasChevron value="Modifier"/>
      </View>

      <Text style={styles.sectionHeader}>Notifications</Text>
      <View style={styles.section}>
        <SettingsRow icon="notifications-outline" title="Nouveaux événements" subtitle="Notifications pour les événements dans votre région" isSwitch switchValue={eventsNotif} onSwitchChange={setEventsNotif} />
        <View style={styles.divider}/>
        <SettingsRow icon="chatbubble-ellipses-outline" title="Messages" subtitle="Messages des organisateurs et participants" isSwitch switchValue={messagesNotif} onSwitchChange={setMessagesNotif} />
        <View style={styles.divider}/>
        <SettingsRow icon="pricetag-outline" title="Promotions" subtitle="Offres spéciales et réductions" isSwitch switchValue={promoNotif} onSwitchChange={setPromoNotif} />
      </View>

      <Text style={styles.sectionHeader}>Préférences de l'application</Text>
      <View style={styles.section}>
        <SettingsRow icon="moon-outline" title="Mode sombre" subtitle="Interface sombre pour vos yeux" isSwitch switchValue={darkMode} onSwitchChange={setDarkMode} />
        <View style={styles.divider}/>
        <SettingsRow icon="language-outline" title="Langue" subtitle="Langue de l'interface" onPress={() => {}} hasChevron value="Français"/>
      </View>
      
      <Text style={styles.sectionHeader}>Support</Text>
      <View style={styles.section}>
        <SettingsRow icon="help-circle-outline" title="Centre d'aide" subtitle="FAQ et guides d'utilisation" onPress={() => {}} hasChevron />
        <View style={styles.divider}/>
        <SettingsRow icon="chatbubble-ellipses-outline" title="Nous contacter" subtitle="Support client et assistance" onPress={() => {}} hasChevron />
        <View style={styles.divider}/>
        <SettingsRow icon="flag-outline" title="Signaler un problème" subtitle="Bugs et problèmes techniques" onPress={() => {}} hasChevron />
      </View>

      <Text style={styles.sectionHeader}>À propos</Text>
      <View style={styles.section}>
        <SettingsRow icon="apps-outline" title="Version de l'application" onPress={() => {}} hasChevron value="1.0.0" />
        <View style={styles.divider}/>
        <SettingsRow icon="document-text-outline" title="Conditions d'utilisation" onPress={() => {}} hasChevron />
        <View style={styles.divider}/>
        <SettingsRow icon="shield-outline" title="Politique de confidentialité" onPress={() => {}} hasChevron />
      </View>
      <View style={{height: 40}}/>
    </ScrollView>
  );
};


const SettingsRow = ({ icon, title, subtitle, onPress, isSwitch, switchValue, onSwitchChange, hasChevron, value }) => {
  return (
      <TouchableOpacity onPress={onPress} style={styles.row} disabled={!onPress}>
    <Ionicons name={icon} size={24} color={COLORS.primary} style={styles.icon} />
    <View style={styles.textContainer}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
    {isSwitch ? (
      <Switch
        trackColor={{ false: '#767577', true: COLORS.primaryLight }}
        thumbColor={switchValue ? COLORS.primary : '#f4f3f4'}
        onValueChange={onSwitchChange}
        value={switchValue}
      />
    ) : hasChevron ? (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {value && <Text style={styles.valueText}>{value}</Text>}
            <Ionicons name="chevron-forward" size={22} color={COLORS.darkGray} />
        </View>
    ) : null}
  </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.gray },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, backgroundColor: COLORS.white, paddingTop: Platform.OS === 'android' ? 40 : 60, paddingBottom: 10, },
  headerTitle: { fontSize: 22, fontWeight: 'bold' },
  screenSubtitle: { fontSize: 16, color: COLORS.darkGray, paddingHorizontal: 20, backgroundColor: COLORS.white, paddingBottom: 20 },
  sectionHeader: { fontSize: 14, color: COLORS.darkGray, fontWeight: '600', textTransform: 'uppercase', marginTop: 30, marginBottom: 10, marginHorizontal: 20 },
  section: { backgroundColor: COLORS.white, marginHorizontal: 20, borderRadius: 15, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 15, },
  icon: { marginRight: 15 },
  textContainer: { flex: 1 },
  title: { fontSize: 16, fontWeight: '500' },
  subtitle: { fontSize: 12, color: COLORS.darkGray, marginTop: 2 },
  divider: { height: 1, backgroundColor: COLORS.gray, marginLeft: 54 },
  valueText: { fontSize: 16, color: COLORS.darkGray, marginRight: 5 },
});

export default SettingsScreen;