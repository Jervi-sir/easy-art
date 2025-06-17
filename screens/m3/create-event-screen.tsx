import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  Platform, Image, StyleSheet, Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@utils/constants/colors';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker'; // Import Image Picker
import { Routes } from '@utils/constants/Routes'; // Import Routes for navigation
import { useAuthStore } from 'zustand/auth.store';
import { useDataStore } from 'zustand/data.store';

const CreateEventScreen = () => {
  const navigation: any = useNavigation();
  // Connect to Zustand stores
  const { user } = useAuthStore();
  const { addEvent } = useDataStore();

  // Form state
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState('Musique'); // Default value
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('100');
  const [imageUri, setImageUri] = useState<string | null>(null); // State for the image URI

  // --- Functional Image Picker ---
  const handlePickImage = async () => {
    // Request permission to access the media library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permission Refusée", "Vous devez autoriser l'accès à votre galerie pour choisir une image.");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setImageUri(pickerResult.assets[0].uri);
    }
  };

  // --- Functional Event Creation Handler ---
  const handleCreateEvent = () => {
    // 1. Check if user is premium
    if (!user?.isPremium) {
      Alert.alert(
        "Abonnement Premium Requis",
        "Seuls les membres Premium peuvent créer des événements.",
        [
          { text: "Annuler", style: "cancel" },
          // --- CHANGE THIS LINE ---
          { text: "Voir Premium", onPress: () => navigation.navigate(Routes.M5) }
        ]
      );
      return;
    }


    // 2. Validate inputs
    if (!eventName.trim() || !eventDate.trim() || !address.trim() || !description.trim() || !imageUri) {
      Alert.alert("Formulaire Incomplet", "Veuillez remplir tous les champs et ajouter une photo.");
      return;
    }

    // 3. Add event to the global store
    addEvent({
      title: eventName,
      description: description,
      rating: 4.0, // Default rating for a new event
      date: eventDate,
      time: '20:00', // Default time
      location: address,
      participants: 0,
      maxParticipants: 50, // Default max participants
      price: `${price} DA`,
      image: imageUri, // Use the selected image
      category: category,
    });

    // 4. Provide feedback and navigate back
    Alert.alert("Succès!", "Votre événement a été créé et est maintenant visible.");
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={COLORS.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Créer un événement</Text>
        </View>

        {/* Photo Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Photo de l'événement *</Text>
          <TouchableOpacity style={styles.imagePicker} onPress={handlePickImage}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.imagePreview} />
            ) : (
              <>
                <Ionicons name="camera-outline" size={32} color={COLORS.primary} />
                <Text style={styles.imagePickerText}>Ajouter une photo</Text>
                <Text style={styles.imagePickerSubtext}>Recommandé: 1200x800px</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Basic Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations de base</Text>
          <Text style={styles.label}>Nom de l'événement *</Text>
          <TextInput placeholder="Ex: Exposition de peinture moderne" style={styles.input} value={eventName} onChangeText={setEventName} />

          <Text style={styles.label}>Date de l'événement *</Text>
          <TextInput placeholder="Ex: 25 Décembre 2025" style={styles.input} value={eventDate} onChangeText={setEventDate} />

          <Text style={styles.label}>Adresse *</Text>
          <TextInput placeholder="Ex: Centre culturel, Oran" style={styles.input} value={address} onChangeText={setAddress} />

          <Text style={styles.label}>Catégorie *</Text>
          <TextInput placeholder="Ex: Musique, Art Visuel" style={styles.input} value={category} onChangeText={setCategory} />

          <Text style={styles.label}>Description *</Text>
          <TextInput placeholder="Décrivez votre événement..." style={styles.textArea} value={description} onChangeText={setDescription} multiline numberOfLines={4} />
        </View>

        {/* Pricing Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tarification</Text>
          <Text style={styles.label}>Prix d'inscription par participant (DA)</Text>
          <TextInput style={styles.input} value={price} onChangeText={setPrice} keyboardType="numeric" />
        </View>

        {/* Footer Button */}
        <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
          <TouchableOpacity style={styles.submitButton} onPress={handleCreateEvent}>
            <Text style={styles.submitButtonText}>
              {user?.isPremium ? "Publier l'événement" : "Créer (Abonnement Requis)"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

// Add StyleSheet for better organization
const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', gap: 20, paddingHorizontal: 20, paddingTop: Platform.OS === 'android' ? 40 : 20, paddingBottom: 20, backgroundColor: COLORS.primary },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.white },
  section: { backgroundColor: '#fff', marginHorizontal: 20, marginTop: 20, padding: 20, borderRadius: 15 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  label: { fontSize: 14, color: '#666', marginBottom: 8, marginTop: 10 },
  input: { backgroundColor: '#f0f0f7', padding: 15, borderRadius: 10, fontSize: 16 },
  textArea: { backgroundColor: '#f0f0f7', padding: 15, borderRadius: 10, fontSize: 16, height: 100, textAlignVertical: 'top' },
  imagePicker: { height: 150, borderWidth: 2, borderColor: '#e0e0e0', borderStyle: 'dashed', borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fafafa' },
  imagePickerText: { fontSize: 16, color: '#333', marginTop: 10 },
  imagePickerSubtext: { fontSize: 12, color: '#888', marginTop: 4 },
  imagePreview: { width: '100%', height: '100%', borderRadius: 13 },
  submitButton: { backgroundColor: COLORS.primary, padding: 18, borderRadius: 15, alignItems: 'center' },
  submitButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default CreateEventScreen;