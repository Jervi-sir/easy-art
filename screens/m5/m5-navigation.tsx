import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Platform, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '@utils/constants/colors';
import { useNavigation } from '@react-navigation/native'; // Import Navigation
import { Routes } from '@utils/constants/Routes'; // Import Routes
import { useAuthStore } from 'zustand/auth.store';

// These sub-components can remain as they are
const FeatureItem = ({ icon, title, description }: any) => (
  <View style={{
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
  }}>
    <View style={{
      width: 45,
      height: 45,
      borderRadius: 12,
      backgroundColor: '#F0EAFE',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 15,
    }}>
      <MaterialCommunityIcons name={icon} size={24} color={COLORS.primary} />
    </View>
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{title}</Text>
      <Text style={{ fontSize: 13, color: COLORS.darkGray, marginTop: 2 }}>{description}</Text>
    </View>
    <Ionicons name="checkmark-circle" size={24} color="#28a745" />
  </View>
);

const ComparisonRow = ({ label, freeValue, premiumValue }: any) => (
  <View style={{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  }}>
    <Text style={{ flex: 2, fontSize: 15, color: COLORS.darkGray }}>{label}</Text>
    <Text style={{ flex: 1, fontSize: 15, textAlign: 'center', color: COLORS.darkGray }}>{freeValue}</Text>
    <Text style={{ flex: 1, fontSize: 15, textAlign: 'center', color: COLORS.primary, fontWeight: 'bold' }}>
      {premiumValue}
    </Text>
  </View>
);

const M5Navigation = () => {
    // Get user status and navigation handler
    const { user } = useAuthStore();
    const navigation: any = useNavigation();

    const handleUpgradePress = () => {
        navigation.navigate(Routes.PaymentScreen);
    };

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.background }}>
            <ScrollView bounces={false} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                {/* Gradient Header */}
                <LinearGradient
                    colors={[COLORS.primary, COLORS.primaryLight]}
                    style={styles.gradientHeader}
                >
                    <Ionicons name="sparkles" size={40} color={COLORS.gold} style={{ marginBottom: 10 }} />
                    <Text style={styles.headerTitle}>EasyArt Premium</Text>
                    <Text style={styles.headerSubtitle}>Débloquez tout le potentiel de l'application</Text>
                </LinearGradient>

                {/* --- DYNAMIC SUBSCRIPTION CARD --- */}
                <View style={styles.card}>
                    {user?.isPremium ? (
                        // --- VIEW FOR ALREADY-PREMIUM USERS ---
                        <View style={styles.premiumUserView}>
                             <Ionicons name="checkmark-circle" size={60} color={COLORS.green} />
                             <Text style={styles.premiumTitle}>Vous êtes un membre Premium</Text>
                             <Text style={styles.premiumSubtitle}>Profitez de toutes les fonctionnalités exclusives d'EasyArt!</Text>
                        </View>
                    ) : (
                        // --- VIEW FOR NON-PREMIUM USERS ---
                        <>
                            <View style={styles.popularBadge}>
                                <Text style={styles.popularText}>Populaire</Text>
                            </View>
                            <Text style={styles.planTitle}>Abonnement Premium</Text>
                            <View style={styles.priceContainer}>
                                <Text style={styles.price}>150</Text>
                                <Text style={styles.priceUnit}>DA <Text style={{ color: COLORS.darkGray, fontWeight: 'normal' }}>/ mois</Text></Text>
                            </View>
                            <Text style={styles.planDescription}>Accès complet à tous les artistes et fonctionnalités</Text>
                            <View style={styles.trialBadge}>
                                <Ionicons name="sparkles-outline" size={18} color="#D2691E" />
                                <Text style={styles.trialText}>7 jours d'essai gratuit inclus</Text>
                            </View>
                        </>
                    )}
                </View>

                {/* Feature & Comparison sections can remain for all users */}
                <View style={{ marginTop: 30, marginHorizontal: 20 }}>
                    <Text style={styles.sectionTitle}>Ce qui est inclus :</Text>
                    <FeatureItem icon="account-group-outline" title="Accès illimité aux profils" description="Consultez tous les profils d'artistes sans restriction" />
                    <FeatureItem icon="chat-processing-outline" title="Messagerie directe" description="Communiquez directement avec les artistes" />
                    <FeatureItem icon="star-check-outline" title="Profils vérifiés uniquement" description="Accédez aux artistes vérifiés et certifiés" />
                </View>

                <View style={{ marginTop: 30, marginHorizontal: 20 }}>
                     {/* ... Comparison Table JSX ... */}
                </View>

                {/* --- DYNAMIC FOOTER & CTA BUTTON --- */}
                {/* This entire section is hidden if the user is already premium */}
                {!user?.isPremium && (
                    <View style={{ padding: 20 }}>
                        <TouchableOpacity style={styles.ctaButton} onPress={handleUpgradePress}>
                            <Ionicons name="diamond-outline" size={20} color="#fff" style={{ marginRight: 10 }} />
                            <Text style={styles.ctaButtonText}>Commencer l'essai gratuit</Text>
                        </TouchableOpacity>
                        <Text style={styles.footerText}>Aucuns frais pendant les 7 premiers jours. Résiliez à tout moment.</Text>
                        <Text style={[styles.footerText, { marginTop: 15, fontWeight: 'bold' }]}>Méthodes de paiement acceptées</Text>
                        <Text style={[styles.footerText, { marginTop: 5 }]}>CCP • Carte bancaire • PayPal</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

// --- Styles have been organized here for clarity ---
const styles = StyleSheet.create({
    gradientHeader: { paddingTop: 40, paddingBottom: 80, paddingHorizontal: 20, alignItems: 'center' },
    headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#fff' },
    headerSubtitle: { fontSize: 16, color: 'rgba(255, 255, 255, 0.8)', marginTop: 5 },
    card: { backgroundColor: '#fff', marginHorizontal: 20, borderRadius: 20, padding: 25, marginTop: -60, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.15, shadowRadius: 15, elevation: 10, alignItems: 'center' },
    // Premium User View Styles
    premiumUserView: { alignItems: 'center', paddingVertical: 20 },
    premiumTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.darkGray, marginTop: 15 },
    premiumSubtitle: { fontSize: 14, color: COLORS.darkGray, textAlign: 'center', marginTop: 5 },
    // Non-Premium View Styles
    popularBadge: { position: 'absolute', top: 20, right: -10, backgroundColor: '#FFA500', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 15, transform: [{ rotate: '15deg' }] },
    popularText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
    planTitle: { fontSize: 18, fontWeight: '600', color: COLORS.darkGray },
    priceContainer: { flexDirection: 'row', alignItems: 'flex-end', marginVertical: 10 },
    price: { fontSize: 52, fontWeight: 'bold', color: '#343a40' },
    priceUnit: { fontSize: 18, fontWeight: '600', color: '#343a40', marginLeft: 5, marginBottom: 8 },
    planDescription: { fontSize: 14, color: COLORS.darkGray, textAlign: 'center', marginBottom: 20 },
    trialBadge: { flexDirection: 'row', backgroundColor: '#FFF8DC', paddingVertical: 10, paddingHorizontal: 15, borderRadius: 12, alignItems: 'center' },
    trialText: { color: '#D2691E', fontWeight: 'bold', marginLeft: 8 },
    // Common Section Styles
    sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#343a40' },
    // Footer CTA Styles
    ctaButton: { flexDirection: 'row', backgroundColor: COLORS.primary, padding: 18, borderRadius: 15, justifyContent: 'center', alignItems: 'center', shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5, elevation: 8 },
    ctaButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    footerText: { textAlign: 'center', fontSize: 12, color: COLORS.darkGray, marginTop: 15 },
});

export default M5Navigation;