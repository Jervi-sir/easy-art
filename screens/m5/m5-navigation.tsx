import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '@utils/constants/colors';

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
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Gradient Header */}
        <LinearGradient
          colors={[COLORS.primary, COLORS.primaryLight]}
          style={{
            paddingTop: 20,
            paddingBottom: 80,
            paddingHorizontal: 20,
            alignItems: 'center',
          }}
        >
          <Ionicons
            name="sparkles"
            size={40}
            color={COLORS.gold}
            style={{ marginBottom: 10 }}
          />
          <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#fff' }}>
            EasyArt Premium
          </Text>
          <Text style={{ fontSize: 16, color: 'rgba(255, 255, 255, 0.8)', marginTop: 5 }}>
            Débloquez tout le potentiel de l'application
          </Text>
        </LinearGradient>

        {/* Main Subscription Card */}
        <View style={{
          backgroundColor: '#fff',
          marginHorizontal: 20,
          borderRadius: 20,
          padding: 25,
          marginTop: -60,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.15,
          shadowRadius: 15,
          elevation: 10,
          alignItems: 'center',
        }}>
          <View style={{
            position: 'absolute',
            top: 20,
            right: -10,
            backgroundColor: '#FFA500',
            paddingHorizontal: 12,
            paddingVertical: 5,
            borderRadius: 15,
            transform: [{ rotate: '15deg' }]
          }}>
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 12 }}>
              Populaire
            </Text>
          </View>

          <Text style={{ fontSize: 18, fontWeight: '600', color: COLORS.darkGray }}>
            Abonnement Premium
          </Text>

          <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginVertical: 10 }}>
            <Text style={{ fontSize: 52, fontWeight: 'bold', color: '#343a40' }}>150</Text>
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#343a40', marginLeft: 5, marginBottom: 8 }}>
              DA <Text style={{ color: COLORS.darkGray, fontWeight: 'normal' }}>/ mois</Text>
            </Text>
          </View>

          <Text style={{ fontSize: 14, color: COLORS.darkGray, textAlign: 'center', marginBottom: 20 }}>
            Accès complet à tous les artistes et fonctionnalités
          </Text>

          <View style={{
            flexDirection: 'row',
            backgroundColor: '#FFF8DC',
            paddingVertical: 10,
            paddingHorizontal: 15,
            borderRadius: 12,
            alignItems: 'center',
          }}>
            <Ionicons name="sparkles-outline" size={18} color="#D2691E" />
            <Text style={{ color: '#D2691E', fontWeight: 'bold', marginLeft: 8 }}>
              7 jours d'essai gratuit inclus
            </Text>
          </View>
        </View>

        {/* What's Included Section */}
        <View style={{ marginTop: 30, marginHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#343a40' }}>
            Ce qui est inclus :
          </Text>
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

        {/* Comparison Table Section */}
        <View style={{ marginTop: 30, marginHorizontal: 20 }}>
          <View style={{
            backgroundColor: '#e9ecef',
            padding: 12,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: COLORS.darkGray }}>
              Gratuit vs Premium
            </Text>
          </View>
          <View style={{
            backgroundColor: '#fff',
            padding: 15,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
          }}>
            <ComparisonRow label="Profils consultés/jour" freeValue="3" premiumValue="Illimité" />
            <ComparisonRow label="Messages directs" freeValue="Non" premiumValue="Oui" />
            <ComparisonRow label="Profils vérifiés" freeValue="Limité" premiumValue="Tous" />
            <ComparisonRow label="Support prioritaire" freeValue="Non" premiumValue="Oui" />
          </View>
        </View>
        {/* Footer and CTA Button */}
        <View style={{
          padding: 20,
        }}>
          <TouchableOpacity style={{
            flexDirection: 'row',
            backgroundColor: COLORS.primary,
            padding: 18,
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: COLORS.primary,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            elevation: 8,
          }}>
            <Ionicons name="diamond-outline" size={20} color="#fff" style={{ marginRight: 10 }} />
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
              Commencer l'essai gratuit
            </Text>
          </TouchableOpacity>

          <Text style={{ textAlign: 'center', fontSize: 12, color: COLORS.darkGray, marginTop: 15 }}>
            Aucuns frais pendant les 7 premiers jours. Résiliez à tout moment.
          </Text>

          <Text style={{ textAlign: 'center', fontSize: 13, color: COLORS.darkGray, marginTop: 15, fontWeight: 'bold' }}>
            Méthodes de paiement acceptées
          </Text>

          <Text style={{ textAlign: 'center', fontSize: 12, color: COLORS.darkGray, marginTop: 5 }}>
            CCP • Carte bancaire • PayPal
          </Text>
        </View>

      </ScrollView>


    </View>
  );
};

export default M5Navigation;