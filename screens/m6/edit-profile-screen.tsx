import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '@utils/constants/colors';
import { useAuthStore } from 'zustand/auth.store';

const EditProfileScreen = () => {
    const navigation = useNavigation();
    const { user, updateUser } = useAuthStore();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        if (user) {
            setFullName(user.fullName);
            setEmail(user.email);
            setPhoneNumber(user.phoneNumber);
            setAddress(user.address);
        }
    }, [user]);

    const handleSave = () => {
        if (!fullName || !email || !phoneNumber || !address) {
            Alert.alert("Erreur", "Veuillez remplir tous les champs.");
            return;
        }
        updateUser({ fullName, email, phoneNumber, address });
        Alert.alert("Succès", "Votre profil a été mis à jour.");
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Modifier le profil</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Nom complet</Text>
                    <TextInput style={styles.input} value={fullName} onChangeText={setFullName} />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Numéro de téléphone</Text>
                    <TextInput style={styles.input} value={phoneNumber} onChangeText={setPhoneNumber} keyboardType="phone-pad" />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Adresse</Text>
                    <TextInput style={styles.input} value={address} onChangeText={setAddress} />
                </View>
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Enregistrer</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    header: { flexDirection: 'row', alignItems: 'center', gap: 20, paddingHorizontal: 20, backgroundColor: COLORS.primary, paddingTop: Platform.OS === 'android' ? 30 : 20, paddingBottom: 15 },
    backButton: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
    headerTitle: { fontSize: 22, fontWeight: 'bold', color: COLORS.white },
    scrollContent: { padding: 20 },
    inputGroup: { marginBottom: 20 },
    label: { fontSize: 14, color: COLORS.darkGray, marginBottom: 8 },
    input: { backgroundColor: COLORS.white, padding: 15, borderRadius: 10, fontSize: 16, borderWidth: 1, borderColor: COLORS.lightGray },
    saveButton: { backgroundColor: COLORS.primary, padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 10 },
    saveButtonText: { color: COLORS.white, fontSize: 16, fontWeight: 'bold' }
});


export default EditProfileScreen;