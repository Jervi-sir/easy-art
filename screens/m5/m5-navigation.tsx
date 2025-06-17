// M5Navigation.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// A reusable component for the "What's included" section
const FeatureItem = ({ icon, title, description }) => (
  <View style={styles.featureItem}>
    <View style={styles.featureIconContainer}>
      <MaterialCommunityIcons name={icon} size={24} color="#5D3FD3" />
    </View>
    <View style={styles.featureTextContainer}>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
    </View>
    <Ionicons name="checkmark-circle" size={24} color="#28a745" />
  </View>
);

// A reusable component for the comparison table
const ComparisonRow = ({ label, freeValue, premiumValue }) => (
    <View style={styles.comparisonRow}>
        <Text style={styles.comparisonLabel}>{label}</Text>
        <Text style={styles.comparisonValue}>{freeValue}</Text>
        <Text style={[styles.comparisonValue, styles.premiumValue]}>{premiumValue}</Text>
    </View>
);


const M5Navigation = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#f4f5f7'}}>
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* --- Gradient Header --- */}
        <LinearGradient
            colors={['#8A2BE2', '#5D3FD3']}
            style={styles.header}
        >
            <Ionicons name="sparkles" size={40} color="#FFD700" style={styles.headerCrown} />
            <Text style={styles.headerTitle}>EasyArt Premium</Text>
            <Text style={styles.headerSubtitle}>Débloquez tout le potentiel de l'application</Text>
        </LinearGradient>

        {/* --- Main Subscription Card --- */}
        <View style={styles.card}>
            <View style={styles.popularTag}>
                <Text style={styles.popularTagText}>Populaire</Text>
            </View>
            <Text style={styles.cardTitle}>Abonnement Premium</Text>
            <View style={styles.priceContainer}>
                <Text style={styles.price}>150</Text>
                <Text style={styles.currency}>DA <Text style={styles.period}>/ mois</Text></Text>
            </View>
            <Text style={styles.accessText}>Accès complet à tous les artistes et fonctionnalités</Text>
            <View style={styles.trialBanner}>
                <Ionicons name="sparkles-outline" size={18} color="#D2691E" />
                <Text style={styles.trialText}>7 jours d'essai gratuit inclus</Text>
            </View>
        </View>

        {/* --- What's Included Section --- */}
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ce qui est inclus :</Text>
            <FeatureItem
                icon="account-group-outline"
                title="Accès illimité aux profils"
                description="Consultez tous les profils d'artistes sans restriction"
            />
            <FeatureItem
                icon="chat-processing-outline"
                title="Messagerie directe"
                description="Communiquez directement avec les artistes"
            />
            <FeatureItem
                icon="star-check-outline"
                title="Profils vérifiés uniquement"
                description="Accédez aux artistes vérifiés et certifiés"
            />
        </View>

        {/* --- Comparison Table Section --- */}
        <View style={styles.section}>
            <View style={styles.comparisonHeader}>
                <Text style={styles.comparisonTitle}>Gratuit vs Premium</Text>
            </View>
            <View style={styles.comparisonTable}>
                <ComparisonRow label="Profils consultés/jour" freeValue="3" premiumValue="Illimité" />
                <ComparisonRow label="Messages directs" freeValue="Non" premiumValue="Oui" />
                <ComparisonRow label="Profils vérifiés" freeValue="Limité" premiumValue="Tous" />
                <ComparisonRow label="Support prioritaire" freeValue="Non" premiumValue="Oui" />
            </View>
        </View>
        </ScrollView>
        {/* --- Footer and CTA Button --- */}
        <View style={styles.footer}>
             <TouchableOpacity style={styles.ctaButton}>
                <Ionicons name="diamond-outline" size={20} color="#fff" style={{marginRight: 10}} />
                <Text style={styles.ctaButtonText}>Commencer l'essai gratuit</Text>
            </TouchableOpacity>
            <Text style={styles.footerNote}>Aucuns frais pendant les 7 premiers jours. Résiliez à tout moment.</Text>
            <Text style={styles.paymentMethods}>Méthodes de paiement acceptées</Text>
            <Text style={styles.paymentIcons}>CCP • Carte bancaire • PayPal</Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: Platform.OS === 'android' ? 70 : 90,
    paddingBottom: 80,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerCrown: {
      marginBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 5,
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 25,
    marginTop: -60, // Pulls the card up into the header
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 10,
    alignItems: 'center',
  },
  popularTag: {
    position: 'absolute',
    top: 20,
    right: -10,
    backgroundColor: '#FFA500',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 15,
    transform: [{ rotate: '15deg' }]
  },
  popularTagText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6c757d',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 10,
  },
  price: {
    fontSize: 52,
    fontWeight: 'bold',
    color: '#343a40',
  },
  currency: {
    fontSize: 18,
    fontWeight: '600',
    color: '#343a40',
    marginLeft: 5,
    marginBottom: 8,
  },
  period: {
      color: '#6c757d',
      fontWeight: 'normal',
  },
  accessText: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 20,
  },
  trialBanner: {
    flexDirection: 'row',
    backgroundColor: '#FFF8DC', // Cornsilk
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  trialText: {
    color: '#D2691E', // Chocolate
    fontWeight: 'bold',
    marginLeft: 8,
  },
  section: {
    marginTop: 30,
    marginHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#343a40',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
  },
  featureIconContainer: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: '#F0EAFE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  featureDescription: {
    fontSize: 13,
    color: '#6c757d',
    marginTop: 2,
  },
  comparisonHeader: {
    backgroundColor: '#e9ecef',
    padding: 12,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  comparisonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#495057',
  },
  comparisonTable: {
      backgroundColor: '#fff',
      padding: 15,
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
  },
  comparisonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  comparisonLabel: {
    flex: 2,
    fontSize: 15,
    color: '#495057'
  },
  comparisonValue: {
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    color: '#6c757d'
  },
  premiumValue: {
      color: '#5D3FD3',
      fontWeight: 'bold',
  },
  footer: {
      padding: 20,
      borderTopWidth: 1,
      borderTopColor: '#e9ecef',
      backgroundColor: '#f4f5f7'
  },
  ctaButton: {
    flexDirection: 'row',
    backgroundColor: '#5D3FD3',
    padding: 18,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#5D3FD3',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  ctaButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerNote: {
      textAlign: 'center',
      fontSize: 12,
      color: '#6c757d',
      marginTop: 15,
  },
  paymentMethods: {
      textAlign: 'center',
      fontSize: 13,
      color: '#6c757d',
      marginTop: 15,
      fontWeight: 'bold'
  },
  paymentIcons: {
      textAlign: 'center',
      fontSize: 12,
      color: '#6c757d',
      marginTop: 5,
  }
});

export default M5Navigation;