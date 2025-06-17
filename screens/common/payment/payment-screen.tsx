import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../utils/constants/colors';

const PaymentScreen = () => {
    const [ccp, setCcp] = useState('');
    const [cle, setCle] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Paiement sécurisé</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Résumé du paiement</Text>
        <View style={styles.summaryRow}>
            <Text style={styles.summaryItem}>Abonnement EasyArt</Text>
            <Text style={styles.summaryItem}>150 DA</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total à payer</Text>
            <Text style={styles.totalAmount}>150 DA</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Paiement CCP</Text>
        <Text style={styles.ccpSubtitle}>Paiement sécurisé par CCP Algeria</Text>
        <Text style={styles.label}>Numéro de compte CCP</Text>
        <TextInput style={styles.input} placeholder='0123456789' keyboardType='numeric' value={ccp} onChangeText={setCcp} />
        <Text style={styles.label}>Clé CCP</Text>
        <TextInput style={styles.input} placeholder='XX' keyboardType='numeric' value={cle} onChangeText={setCle} />
        <Text style={styles.label}>Nom du titulaire du compte</Text>
        <TextInput style={styles.input} placeholder='Nom complet' value={name} onChangeText={setName} />
        <Text style={styles.label}>Numéro de téléphone</Text>
        <TextInput style={styles.input} placeholder='0123456789' keyboardType='phone-pad' value={phone} onChangeText={setPhone} />
      </View>

      <View style={styles.infoBox}>
        <Ionicons name="lock-closed" size={20} color={COLORS.blueInfoText} />
        <Text style={styles.infoText}>Vos informations bancaires sont protégées par un cryptage SSL 256 bits.</Text>
      </View>
    </ScrollView>
    <View style={styles.footer}>
        <TouchableOpacity style={styles.payButton}>
            <Text style={styles.payButtonText}>Payer 150 DA</Text>
        </TouchableOpacity>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.gray },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, backgroundColor: COLORS.white, paddingTop: Platform.OS === 'android' ? 40 : 60, },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  section: { backgroundColor: COLORS.white, padding: 20, margin: 20, borderRadius: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 },
  summaryItem: { fontSize: 16, color: COLORS.darkGray },
  divider: { height: 1, backgroundColor: COLORS.gray, marginVertical: 10 },
  totalLabel: { fontSize: 16, fontWeight: 'bold' },
  totalAmount: { fontSize: 20, fontWeight: 'bold', color: COLORS.primary },
  ccpSubtitle: { fontSize: 14, color: COLORS.darkGray, marginBottom: 20 },
  label: { fontSize: 14, color: COLORS.darkGray, marginTop: 10, marginBottom: 5 },
  input: { backgroundColor: COLORS.gray, padding: 15, borderRadius: 10, fontSize: 16 },
  infoBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.blueInfoBg, marginHorizontal: 20, padding: 15, borderRadius: 10, },
  infoText: { flex: 1, marginLeft: 10, color: COLORS.blueInfoText, fontSize: 13 },
  footer: { padding: 20, backgroundColor: COLORS.white, borderTopWidth: 1, borderTopColor: COLORS.gray },
  payButton: { backgroundColor: COLORS.green, padding: 18, borderRadius: 15, alignItems: 'center' },
  payButtonText: { color: COLORS.white, fontSize: 16, fontWeight: 'bold' },
});

export default PaymentScreen;