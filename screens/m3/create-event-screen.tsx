// CreateEventScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// For a better picker experience, you might install:
// npx expo install @react-native-picker/picker
// import { Picker } from '@react-native-picker/picker';


const CreateEventScreen = () => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('100');
  const [image, setImage] = useState(null);

  // In a real app, you would use expo-image-picker
  const handlePickImage = () => {
    // Placeholder for image picker logic
    console.log('Pick image');
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
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Créer un événement</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* --- Photo Section --- */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Photo de l'événement *</Text>
          <TouchableOpacity style={styles.imagePicker} onPress={handlePickImage}>
            {image ? (
              <Image source={{ uri: image }} style={styles.eventImage} />
            ) : (
              <>
                <Ionicons name="camera-outline" size={32} color="#8A2BE2" />
                <Text style={styles.imagePickerText}>Ajouter une photo</Text>
                <Text style={styles.imagePickerSubText}>Recommandé: 1200x800px</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* --- Basic Info Section --- */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations de base</Text>
          <Text style={styles.label}>Nom de l'événement *</Text>
          <TextInput
            placeholder="Ex: Exposition de peinture moderne"
            style={styles.input}
            value={eventName}
            onChangeText={setEventName}
          />

          <Text style={styles.label}>Date de l'événement</Text>
          <View style={styles.dateInputContainer}>
            <TextInput
              placeholder="jj/mm/aaaa"
              style={styles.input}
              value={eventDate}
              onChangeText={setEventDate}
            />
             <Ionicons name="calendar-outline" size={24} color="#888" style={styles.inputIcon} />
          </View>


          <Text style={styles.label}>Adresse</Text>
          <TextInput
            placeholder="Ex: Centre culturel, Oran"
            style={styles.input}
            value={address}
            onChangeText={setAddress}
          />

          <Text style={styles.label}>Catégorie</Text>
          {/* A Picker would be ideal here */}
          <TextInput
            placeholder="Sélectionnez une catégorie"
            style={styles.input}
            value={category}
            onChangeText={setCategory}
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            placeholder="Décrivez votre événement..."
            style={[styles.input, styles.textArea]}
            multiline
            numberOfLines={4}
            value={description}
            onChangeText={setDescription}
          />
        </View>

        {/* --- Pricing Section --- */}
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tarification</Text>
            <Text style={styles.label}>Prix d'inscription par participant (DA)</Text>
            <TextInput
                style={styles.input}
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
            />
            <View style={styles.suggestionBox}>
                <Text style={styles.suggestionTitle}>Prix suggérés par catégorie:</Text>
                <Text style={styles.suggestionText}>• Ateliers (Cuisine, Dessin): 200-500 DA</Text>
                <Text style={styles.suggestionText}>• Concerts, Spectacles: 800-800 DA</Text>
                <Text style={styles.suggestionText}>• Expositions: 100-300 DA</Text>
                <Text style={styles.suggestionText}>• Formations: 500-1500 DA</Text>
            </View>
        </View>

      </ScrollView>

       {/* --- Footer Button --- */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Créer l'événement (Abonnement requis: 150 DA)</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f0f0f7' },
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 40 : 60,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  section: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
    borderRadius: 15,
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  label: { fontSize: 14, color: '#666', marginBottom: 8, marginTop: 10 },
  input: {
    backgroundColor: '#f0f0f7',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
  },
  dateInputContainer: { position: 'relative', justifyContent: 'center' },
  inputIcon: { position: 'absolute', right: 15 },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  imagePicker: {
    height: 150,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fafafa',
  },
  eventImage: {
    width: '100%',
    height: '100%',
    borderRadius: 13,
  },
  imagePickerText: { fontSize: 16, color: '#333', marginTop: 10 },
  imagePickerSubText: { fontSize: 12, color: '#888', marginTop: 4 },
  suggestionBox: {
      backgroundColor: '#f0f0f7',
      borderRadius: 10,
      padding: 15,
      marginTop: 15,
  },
  suggestionTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 8,
  },
  suggestionText: {
      fontSize: 13,
      color: '#555',
      lineHeight: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: '#f0f0f7',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  submitButton: {
    backgroundColor: '#8A2BE2',
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
  },
  submitButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default CreateEventScreen;