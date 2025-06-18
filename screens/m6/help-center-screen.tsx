import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '@utils/constants/colors';

// @ts-ignore
const FAQItem = ({ q, a }) => (
  <View style={styles.faqItem}>
    <Text style={styles.question}>{q}</Text>
    <Text style={styles.answer}>{a}</Text>
  </View>
);

const HelpCenterScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Centre d'aide</Text>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <FAQItem q="Comment puis-je créer un événement ?" a="Pour créer un événement, vous devez avoir un abonnement Premium. Allez dans l'onglet Événements et appuyez sur le bouton 'Créer un événement'." />
        <FAQItem q="Comment fonctionne le paiement ?" a="Nous acceptons les paiements via CCP. Toutes les transactions sont sécurisées et vos informations sont cryptées." />
        <FAQItem q="Puis-je modifier mon profil ?" a="Oui, allez dans l'onglet Profil, puis Paramètres, et sélectionnez 'Informations personnelles' pour modifier vos données." />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', alignItems: 'center', gap: 20, paddingHorizontal: 20, backgroundColor: COLORS.primary, paddingTop: Platform.OS === 'android' ? 30 : 20, paddingBottom: 15 },
  backButton: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: COLORS.white },
  faqItem: { backgroundColor: COLORS.white, padding: 15, borderRadius: 10, marginBottom: 15 },
  question: { fontSize: 16, fontWeight: 'bold', color: COLORS.primary, marginBottom: 8 },
  answer: { fontSize: 14, color: COLORS.darkGray, lineHeight: 20 },
});


export default HelpCenterScreen;