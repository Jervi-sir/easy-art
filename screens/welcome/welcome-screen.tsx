import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../utils/constants/colors';
import { Routes } from '@utils/constants/Routes';

// @ts-ignore
const Feature = ({ text }) => (
  <View style={styles.feature}>
    <Ionicons name="checkmark-circle-outline" size={22} color={COLORS.white} />
    <Text style={styles.featureText}>{text}</Text>
  </View>
);

const WelcomeScreen = () => {
  const navigation: any = useNavigation();
  const handleGetStarted = () => {
    navigation.replace(Routes.AuthScreen, { initialTab: 'signup' });
  };
  const handleAlreadyHaveAccount = () => {
    navigation.replace(Routes.AuthScreen, { initialTab: 'login' });
  };
  return (
    <LinearGradient colors={[COLORS.primary, COLORS.primaryLight]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.appName}>EasyArt</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Découvrez les talents artistiques</Text>
          <Feature text="Trouver des artistes talentueux" />
          <Feature text="Tous les domaines artistiques" />
          <Feature text="Connexion directe avec les artistes" />
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleGetStarted}>
            <Text style={styles.primaryButtonText}>Commencer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={handleAlreadyHaveAccount}>
            <Text style={styles.secondaryButtonText}>J'ai déjà un compte</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1, justifyContent: 'space-between' },
  header: { alignItems: 'center', paddingTop: 60 },
  appName: { color: COLORS.white, fontSize: 24, fontWeight: 'bold', marginTop: 10 },
  content: { paddingHorizontal: 40, marginTop: -50 },
  title: { color: COLORS.white, fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 },
  feature: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  featureText: { color: COLORS.white, fontSize: 16, marginLeft: 10 },
  footer: { alignItems: 'center', paddingHorizontal: 40, paddingBottom: 40 },
  primaryButton: { backgroundColor: COLORS.white, paddingVertical: 18, borderRadius: 15, width: '100%', alignItems: 'center', },
  primaryButtonText: { color: COLORS.primary, fontSize: 18, fontWeight: 'bold' },
  secondaryButton: { marginTop: 20 },
  secondaryButtonText: { color: COLORS.white, fontSize: 16, fontWeight: '600' },
});

export default WelcomeScreen;