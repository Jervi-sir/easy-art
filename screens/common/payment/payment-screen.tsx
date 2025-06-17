import React, { useState, useEffect } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, ScrollView,
    TextInput, Platform, Alert, ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../utils/constants/colors';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from 'zustand/auth.store';

const PaymentScreen = () => {
    const navigation: any = useNavigation();
    const { user, upgradeToPremium } = useAuthStore(); // Get user and upgrade function

    // Form state
    const [ccp, setCcp] = useState('');
    const [cle, setCle] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [isLoading, setIsLoading] = useState(false); // For loading indicator

    // Pre-fill form with user data from the store
    useEffect(() => {
        if (user) {
            setName(user.fullName);
            setPhone(user.phoneNumber);
        }
    }, [user]);

    // --- Handle the payment process ---
    const handlePayment = () => {
        // 1. Basic validation
        if (!ccp.trim() || !cle.trim() || !name.trim() || !phone.trim()) {
            Alert.alert("Formulaire incomplet", "Veuillez remplir tous les champs de paiement.");
            return;
        }

        setIsLoading(true);

        // 2. Simulate network delay for payment processing
        setTimeout(() => {
            // 3. Update the user's status in the global store
            upgradeToPremium();
            setIsLoading(false);

            // 4. Give feedback and navigate
            Alert.alert(
                "Paiement Réussi!",
                "Félicitations, vous êtes maintenant un membre Premium.",
                [{ text: "Génial!", onPress: () => navigation.popToTop() }] // Go back to the main tab screen
            );
        }, 2500); // 2.5-second delay
    };

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
            <ScrollView bounces={false} showsVerticalScrollIndicator={false} style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color={COLORS.black} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Paiement sécurisé</Text>
                    <View style={{ width: 24 }} />
                </View>

                {/* Payment Summary */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Résumé du paiement</Text>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryItem}>Abonnement EasyArt Premium</Text>
                        <Text style={styles.summaryItem}>150 DA</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.summaryRow}>
                        <Text style={styles.totalLabel}>Total à payer</Text>
                        <Text style={styles.totalAmount}>150 DA</Text>
                    </View>
                </View>

                {/* CCP Form */}
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

            {/* Footer with loading state */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={[styles.payButton, isLoading && styles.payButtonDisabled]}
                    onPress={handlePayment}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator size="small" color={COLORS.white} />
                    ) : (
                        <Text style={styles.payButtonText}>Payer 150 DA</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.gray },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, backgroundColor: COLORS.white, paddingTop: Platform.OS === 'android' ? 40 : 20, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
    headerTitle: { fontSize: 18, fontWeight: 'bold' },
    section: { backgroundColor: COLORS.white, padding: 20, marginHorizontal: 20, marginTop: 20, borderRadius: 15 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
    summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 },
    summaryItem: { fontSize: 16, color: COLORS.darkGray },
    divider: { height: 1, backgroundColor: COLORS.gray, marginVertical: 10 },
    totalLabel: { fontSize: 16, fontWeight: 'bold' },
    totalAmount: { fontSize: 20, fontWeight: 'bold', color: COLORS.primary },
    ccpSubtitle: { fontSize: 14, color: COLORS.darkGray, marginBottom: 20 },
    label: { fontSize: 14, color: COLORS.darkGray, marginTop: 10, marginBottom: 5 },
    input: { backgroundColor: COLORS.gray, padding: 15, borderRadius: 10, fontSize: 16 },
    infoBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.blueInfoBg, marginHorizontal: 20, marginTop: 10, padding: 15, borderRadius: 10, marginBottom: 20 },
    infoText: { flex: 1, marginLeft: 10, color: COLORS.blueInfoText, fontSize: 13 },
    footer: { padding: 20, backgroundColor: COLORS.white, borderTopWidth: 1, borderTopColor: '#f0f0f0' },
    payButton: { backgroundColor: COLORS.green, padding: 18, borderRadius: 15, alignItems: 'center', justifyContent: 'center', height: 58 },
    payButtonDisabled: { backgroundColor: '#90D8A2' }, // Lighter green when disabled
    payButtonText: { color: COLORS.white, fontSize: 16, fontWeight: 'bold' },
});

export default PaymentScreen;