// AuthScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, SafeAreaView, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../utils/constants/colors';

const AuthScreen = () => {
    const [activeTab, setActiveTab] = useState('login'); // 'login' or 'signup'
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const LoginForm = () => (
        <>
            <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" />
            <View style={styles.passwordContainer}>
                <TextInput style={styles.input} placeholder="Mot de passe" secureTextEntry={!isPasswordVisible} />
                <TouchableOpacity onPress={() => setPasswordVisible(!isPasswordVisible)} style={styles.eyeIcon}>
                    <Ionicons name={isPasswordVisible ? "eye-off-outline" : "eye-outline"} size={24} color={COLORS.darkGray} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.mainButton}>
                <Text style={styles.mainButtonText}>Se connecter</Text>
            </TouchableOpacity>
        </>
    );

    const SignupForm = () => (
        <>
            <TextInput style={styles.input} placeholder="Nom complet" />
            <TextInput style={styles.input} placeholder="Numéro de téléphone" keyboardType="phone-pad" />
            <TextInput style={styles.input} placeholder="Adresse" />
            <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" />
            <TextInput style={styles.input} placeholder="Mot de passe" secureTextEntry />
            <TouchableOpacity style={styles.mainButton}>
                <Text style={styles.mainButtonText}>S'inscrire</Text>
            </TouchableOpacity>
        </>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView bounces={false} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    {/* <Image source={require('./assets/logo-purple.png')} style={styles.logo} /> */}
                    <Text style={styles.appName}>EasyArt</Text>
                    <Text style={styles.tagline}>Découvrez et partagez vos talents artistiques</Text>
                </View>
                
                <View style={styles.tabContainer}>
                    <TouchableOpacity onPress={() => setActiveTab('login')} style={[styles.tab, activeTab === 'login' && styles.activeTab]}>
                        <Text style={[styles.tabText, activeTab === 'login' && styles.activeTabText]}>Connexion</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setActiveTab('signup')} style={[styles.tab, activeTab === 'signup' && styles.activeTab]}>
                        <Text style={[styles.tabText, activeTab === 'signup' && styles.activeTabText]}>Inscription</Text>
                    </TouchableOpacity>
                </View>

                {activeTab === 'login' ? <LoginForm /> : <SignupForm />}
            </ScrollView>
        </SafeAreaView>
    );
};

// ... Add StyleSheet below
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.white },
    scrollContent: { padding: 20, paddingTop: 50 },
    header: { alignItems: 'center', marginBottom: 30 },
    logo: { width: 60, height: 60 },
    appName: { fontSize: 24, fontWeight: 'bold', color: COLORS.primary, marginTop: 10 },
    tagline: { fontSize: 16, color: COLORS.darkGray, marginTop: 5 },
    tabContainer: { flexDirection: 'row', backgroundColor: COLORS.gray, borderRadius: 15, padding: 5, marginBottom: 20 },
    tab: { flex: 1, paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
    activeTab: { backgroundColor: COLORS.white },
    tabText: { color: COLORS.darkGray, fontSize: 16, fontWeight: '600' },
    activeTabText: { color: COLORS.primary },
    input: { backgroundColor: COLORS.gray, padding: 18, borderRadius: 12, fontSize: 16, marginBottom: 15 },
    passwordContainer: { position: 'relative', justifyContent: 'center' },
    eyeIcon: { position: 'absolute', right: 20 },
    mainButton: { backgroundColor: COLORS.primary, padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 10 },
    mainButtonText: { color: COLORS.white, fontSize: 18, fontWeight: 'bold' },
});


export default AuthScreen;