import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';

const InscriptionScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [audioFile, setAudioFile] = useState(null);

  const handleSelectFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['audio/mpeg', 'audio/wav', 'audio/x-m4a'], // MP3, WAV, M4A
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setAudioFile(result.assets[0]);
        console.log('File selected:', result.assets[0].name);
      }
    } catch (err) {
      console.error('Unknown error selecting file:', err);
    }
  };

  return (
    <View style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}>
        {/* --- Header --- */}
        <View style={styles.header}>
          <TouchableOpacity>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* --- Event Details Card --- */}
        <View style={styles.eventCard}>
          <Text style={styles.eventTitle}>Concert de Musique Traditionnelle</Text>
          <Text style={styles.eventDate}>20/12/2025</Text>
          <Text style={styles.eventLocation}>Théâtre National, Alger</Text>
        </View>

        {/* --- Personal Information Section --- */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations personnelles</Text>
          <View style={styles.inputRow}>
            <TextInput
              placeholder="Prénom"
              style={[styles.input, { flex: 1, marginRight: 8 }]}
              value={firstName}
              onChangeText={setFirstName}
            />
            <TextInput
              placeholder="Nom"
              style={[styles.input, { flex: 1, marginLeft: 8 }]}
              value={lastName}
              onChangeText={setLastName}
            />
          </View>
          <View style={styles.dateInputContainer}>
            <TextInput
              placeholder="jj/mm/aaaa"
              style={styles.input}
              value={birthDate}
              onChangeText={setBirthDate}
              keyboardType="numeric"
            />
            <Ionicons name="calendar-outline" size={24} color="#888" style={styles.inputIcon} />
          </View>
        </View>

        {/* --- Portfolio Section --- */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Portfolio</Text>
          <TouchableOpacity style={styles.filePicker} onPress={handleSelectFile}>
            <Ionicons name="musical-notes-outline" size={48} color="#8A2BE2" />
            <Text style={styles.filePickerText}>Ajoutez vos enregistrements audio</Text>
            <Text style={styles.filePickerSubText}>MP3, WAV, M4A</Text>
            {audioFile ? (
              <Text style={styles.fileNameText}>Fichier: {audioFile.name}</Text>
            ) : (
              <Text style={styles.selectFileButton}>Sélect. fichiers</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* --- Important Info Card --- */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Informations importantes</Text>
          <Text style={styles.infoText}>• Prix d'inscription: 500 DA</Text>
          <Text style={styles.infoText}>• Organisé par: Association Culturelle</Text>
          <Text style={styles.infoText}>• Catégorie: Musique</Text>
          <Text style={styles.infoText}>• Inscription soumise à validation</Text>
        </View>
      </ScrollView>

      {/* --- Footer Button --- */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>S'inscrire à l'événement (150 DA)</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f0f0f7' },
  container: { flex: 1 },
  header: {
    backgroundColor: '#8A2BE2',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 40 : 60,
    paddingBottom: 80,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  eventCard: {
    backgroundColor: '#9932CC',
    padding: 20,
    borderRadius: 15,
    marginHorizontal: 20,
    marginTop: -60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  eventTitle: { fontSize: 22, fontWeight: 'bold', color: '#fff', marginBottom: 10 },
  eventDate: { fontSize: 16, color: '#fff', marginBottom: 5 },
  eventLocation: { fontSize: 16, color: '#fff' },
  section: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
    borderRadius: 15,
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  inputRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  input: {
    backgroundColor: '#f0f0f7',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
  },
  dateInputContainer: { position: 'relative', justifyContent: 'center' },
  inputIcon: { position: 'absolute', right: 15 },
  filePicker: {
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fafafa',
  },
  filePickerText: { fontSize: 16, color: '#333', marginTop: 10, fontWeight: 'bold' },
  filePickerSubText: { fontSize: 14, color: '#888', marginTop: 5, marginBottom: 15 },
  selectFileButton: {
    backgroundColor: '#e0e0e0',
    color: '#333',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    overflow: 'hidden', // for iOS
  },
  fileNameText: { fontSize: 14, color: '#007BFF', marginTop: 10 },
  infoCard: {
    backgroundColor: '#FFF8DC', // Cornsilk color
    padding: 20,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 15,
    borderLeftWidth: 5,
    borderLeftColor: '#FFD700', // Gold color
  },
  infoTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  infoText: { fontSize: 14, color: '#555', lineHeight: 22 },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: '#f0f0f7',
  },
  submitButton: {
    backgroundColor: '#8A2BE2',
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
  },
  submitButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

export default InscriptionScreen;
