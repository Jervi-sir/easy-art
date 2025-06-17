import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Platform, Alert, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@utils/constants/colors';
import { useNavigation } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker'; // Import Document Picker
import { useAuthStore } from 'zustand/auth.store';

const JoinEventScreen = ({ route }: any) => {
    const navigation: any = useNavigation();
    const { user } = useAuthStore();
    const event = route?.params?.event;

    // State for all form inputs
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [portfolioFile, setPortfolioFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);

    // Pre-fill user's name from the auth store
    useEffect(() => {
        if (user) {
            const nameParts = user.fullName.split(' ');
            setFirstName(nameParts[0] || '');
            setLastName(nameParts.slice(1).join(' ') || '');
        }
    }, [user]);

    // --- File Picker Functionality ---
    const handleSelectFile = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: '*/*', // Allow any file type
            });

            if (!result.canceled) {
                setPortfolioFile(result.assets[0]);
            }
        } catch (err) {
            console.error('Unknown error selecting file:', err);
            Alert.alert("Erreur", "Impossible de sélectionner le fichier.");
        }
    };

    // --- Submission Handler ---
    const handleJoinEvent = () => {
        // Basic validation
        if (!firstName || !lastName || !birthDate) {
            Alert.alert("Champs manquants", "Veuillez remplir toutes vos informations personnelles.");
            return;
        }
        if (!portfolioFile) {
            Alert.alert("Portfolio manquant", "Veuillez ajouter un fichier à votre portfolio.");
            return;
        }
        
        // Simulate submission
        Alert.alert(
            "Inscription Réussie!",
            `Merci, ${firstName}. Votre inscription à "${event.title}" avec le fichier "${portfolioFile.name}" a bien été reçue.`,
            [{ text: "OK", onPress: () => navigation.goBack() }]
        );
    };

    // Guard clause if event data is missing
    if (!event) {
        return (
            <View style={styles.errorContainer}>
                <Ionicons name="alert-circle-outline" size={60} color={COLORS.red} />
                <Text style={styles.errorTitle}>Erreur</Text>
                <Text style={styles.errorMessage}>Les données de l'événement n'ont pas pu être chargées.</Text>
                <TouchableOpacity style={styles.errorButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.errorButtonText}>Retour</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.background }}>
            <ScrollView bounces={false} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                {/* Header with event details */}
                <View style={{ gap: 30, paddingHorizontal: 20, backgroundColor: COLORS.primary, paddingTop: Platform.OS === 'android' ? 40 : 20, paddingBottom: 20 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                            <Ionicons name="arrow-back" size={24} color="#fff" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Inscription</Text>
                    </View>
                    <View style={styles.eventCard}>
                        <Text style={styles.eventTitle}>{event.title}</Text>
                        <View style={styles.eventInfoRow}><Ionicons name="calendar-outline" size={18} color={COLORS.white} /><Text style={styles.eventInfoText}>{event.date}</Text></View>
                        <View style={styles.eventInfoRow}><Ionicons name="location-outline" size={18} color={COLORS.white} /><Text style={styles.eventInfoText}>{event.location}</Text></View>
                    </View>
                </View>

                {/* --- Personal Information Section --- */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Informations personnelles</Text>
                    <View style={{ flexDirection: 'row', gap: 16 }}>
                        <TextInput placeholder="Prénom" style={styles.inputFlex} value={firstName} onChangeText={setFirstName} />
                        <TextInput placeholder="Nom" style={styles.inputFlex} value={lastName} onChangeText={setLastName} />
                    </View>
                    <TextInput placeholder="Date de naissance (jj/mm/aaaa)" style={styles.input} value={birthDate} onChangeText={setBirthDate} keyboardType="numeric" />
                </View>

                {/* --- Portfolio Section --- */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Portfolio</Text>
                    <TouchableOpacity style={styles.filePicker} onPress={handleSelectFile}>
                        <Ionicons name="attach-outline" size={48} color={COLORS.primary} />
                        <Text style={styles.filePickerTitle}>Ajoutez votre portfolio</Text>
                        <Text style={styles.filePickerSubtitle}>Tout type de fichier est accepté</Text>
                        {portfolioFile ? (
                            <Text style={styles.fileName}>Fichier sélectionné: {portfolioFile.name}</Text>
                        ) : (
                            <View style={styles.selectButton}><Text style={styles.selectButtonText}>Sélect. un fichier</Text></View>
                        )}
                    </TouchableOpacity>
                </View>

                {/* --- Final Submit Button --- */}
                <View style={{ paddingHorizontal: 20 }}>
                    <TouchableOpacity onPress={handleJoinEvent} style={styles.submitButton}>
                        <Text style={styles.submitButtonText}>S'inscrire ({event.price})</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: COLORS.background },
    errorTitle: { fontSize: 22, fontWeight: 'bold', color: COLORS.black, marginTop: 15 },
    errorMessage: { fontSize: 16, color: COLORS.darkGray, textAlign: 'center', marginTop: 10, marginBottom: 20 },
    errorButton: { backgroundColor: COLORS.primary, paddingVertical: 12, paddingHorizontal: 30, borderRadius: 10 },
    errorButtonText: { color: COLORS.white, fontSize: 16, fontWeight: 'bold' },
    backButton: { width: 40, height: 40, backgroundColor: COLORS.primaryLight, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
    headerTitle: { color: COLORS.white, fontSize: 20, fontWeight: 'bold' },
    eventCard: { backgroundColor: COLORS.primaryLight, padding: 20, borderRadius: 15, elevation: 5, gap: 10 },
    eventTitle: { fontSize: 22, fontWeight: 'bold', color: '#fff', marginBottom: 10 },
    eventInfoRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    eventInfoText: { fontSize: 16, color: '#fff' },
    section: { backgroundColor: '#fff', marginHorizontal: 20, marginTop: 20, padding: 20, borderRadius: 15 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 },
    input: { backgroundColor: '#f0f0f7', padding: 15, borderRadius: 10, fontSize: 16, marginTop: 16 },
    inputFlex: { backgroundColor: '#f0f0f7', padding: 15, borderRadius: 10, fontSize: 16, flex: 1 },
    filePicker: { borderWidth: 2, borderColor: '#e0e0e0', borderStyle: 'dashed', borderRadius: 15, padding: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fafafa' },
    filePickerTitle: { fontSize: 16, color: '#333', marginTop: 10, fontWeight: 'bold' },
    filePickerSubtitle: { fontSize: 14, color: '#888', marginTop: 5, marginBottom: 15 },
    fileName: { fontSize: 14, color: COLORS.green, marginTop: 10, fontWeight: 'bold' },
    selectButton: { backgroundColor: '#e0e0e0', paddingVertical: 8, paddingHorizontal: 20, borderRadius: 20, overflow: 'hidden' },
    selectButtonText: { color: '#333' },
    submitButton: { backgroundColor: COLORS.primary, padding: 18, borderRadius: 15, alignItems: 'center', marginTop: 20 },
    submitButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

export default JoinEventScreen;