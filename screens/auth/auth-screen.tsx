import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../utils/constants/colors';
import { useAuthStore } from 'zustand/auth.store';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '@utils/constants/Routes';

const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  isPasswordVisible,
  setPasswordVisible,
  handleLogin,
}: any) => (
  <>
    <TextInput
      style={styles.input}
      placeholder="Email"
      keyboardType="email-address"
      value={email}
      onChangeText={setEmail}
      autoCapitalize="none"
    />
    <View style={styles.passwordContainer}>
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry={!isPasswordVisible}
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity
        onPress={() => setPasswordVisible(!isPasswordVisible)}
        style={styles.eyeIcon}
      >
        <Ionicons
          name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
          size={24}
          color={COLORS.darkGray}
        />
      </TouchableOpacity>
    </View>
    <TouchableOpacity style={styles.mainButton} onPress={handleLogin}>
      <Text style={styles.mainButtonText}>Se connecter</Text>
    </TouchableOpacity>
  </>
);

const SignupForm = ({
  fullName,
  setFullName,
  phoneNumber,
  setPhoneNumber,
  address,
  setAddress,
  email,
  setEmail,
  password,
  setPassword,
  handleSignup,
}: any) => (
  <>
    <TextInput
      style={styles.input}
      placeholder="Nom complet"
      value={fullName}
      onChangeText={setFullName}
    />
    <TextInput
      style={styles.input}
      placeholder="Numéro de téléphone"
      keyboardType="phone-pad"
      value={phoneNumber}
      onChangeText={setPhoneNumber}
    />
    <TextInput
      style={styles.input}
      placeholder="Adresse"
      value={address}
      onChangeText={setAddress}
    />
    <TextInput
      style={styles.input}
      placeholder="Email"
      keyboardType="email-address"
      value={email}
      onChangeText={setEmail}
      autoCapitalize="none"
    />
    <TextInput
      style={styles.input}
      placeholder="Mot de passe"
      secureTextEntry
      value={password}
      onChangeText={setPassword}
    />
    <TouchableOpacity style={styles.mainButton} onPress={handleSignup}>
      <Text style={styles.mainButtonText}>S'inscrire</Text>
    </TouchableOpacity>
  </>
);

const AuthScreen = ({ route }: any) => {

  const [activeTab, setActiveTab] = useState('login');
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const navigation: any = useNavigation();
  const { login, signup } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    // Check if an 'initialTab' parameter was passed
    const initialTab = route.params?.initialTab;
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [route.params?.initialTab]); // Re-run if the params change


  const handleLogin = useCallback(async () => {
    const success = await login({ email, pass: password });
    if (!success) {
      Alert.alert('Erreur de connexion', 'Email ou mot de passe incorrect.');
    }

  }, [email, password, login]);

  const handleSignup = useCallback(async () => {
    if (!fullName || !phoneNumber || !address || !email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }
    const success = await signup({ fullName, phoneNumber, address, email, password });
    if (success) {
      navigation.reset({
        index: 0,
        routes: [{ name: Routes.PaymentScreen }],
      });
    }
  }, [fullName, phoneNumber, address, email, password, signup, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
          keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
        >
          <ScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <View style={styles.header}>
              <Text style={styles.appName}>EasyArt</Text>
              <Text style={styles.tagline}>
                Découvrez et partagez vos talents artistiques
              </Text>
            </View>

            <View style={styles.tabContainer}>
              <TouchableOpacity
                onPress={() => setActiveTab('login')}
                style={[
                  styles.tab,
                  activeTab === 'login' && styles.activeTab,
                ]}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === 'login' && styles.activeTabText,
                  ]}
                >
                  Connexion
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setActiveTab('signup')}
                style={[styles.tab, activeTab === 'signup' && styles.activeTab]}
              >
                <Text
                  style={[styles.tabText, activeTab === 'signup' && styles.activeTabText]}
                >
                  Inscription
                </Text>
              </TouchableOpacity>
            </View>

            {activeTab === 'login' ? (
              <LoginForm
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                isPasswordVisible={isPasswordVisible}
                setPasswordVisible={setPasswordVisible}
                handleLogin={handleLogin}
              />
            ) : (
              <SignupForm
                fullName={fullName}
                setFullName={setFullName}
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                address={address}
                setAddress={setAddress}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                handleSignup={handleSignup}
              />
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  scrollContent: { padding: 20, paddingTop: 50 },
  header: { alignItems: 'center', marginBottom: 30 },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: 10,
  },
  tagline: { fontSize: 16, color: COLORS.darkGray, marginTop: 5 },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.gray,
    borderRadius: 4,
    padding: 5,
    marginBottom: 20,
  },
  tab: { flex: 1, paddingVertical: 12, borderRadius: 5, alignItems: 'center' },
  activeTab: { backgroundColor: COLORS.white },
  tabText: { color: COLORS.darkGray, fontSize: 16, fontWeight: '600' },
  activeTabText: { color: COLORS.primary },
  input: {
    backgroundColor: COLORS.gray,
    padding: 20,
    borderRadius: 5,
    fontSize: 16,
    marginBottom: 15,
  },
  passwordContainer: { position: 'relative', justifyContent: 'center' },
  eyeIcon: { position: 'absolute', right: 20 },
  mainButton: {
    backgroundColor: COLORS.primary,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  mainButtonText: { color: COLORS.white, fontSize: 18, fontWeight: 'bold' },
});

export default AuthScreen;