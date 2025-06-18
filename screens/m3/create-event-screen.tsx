import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  Platform, Image, StyleSheet, Alert,
  Pressable,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@utils/constants/colors';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker'; // Import Image Picker
import { Routes } from '@utils/constants/Routes'; // Import Routes for navigation
import { useAuthStore } from 'zustand/auth.store';
import { useDataStore } from 'zustand/data.store';
import { formatDateInput } from '@utils/format-input-date';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useEventFormStore } from 'zustand/eventForm.store';

const CreateEventScreen = () => {
  const navigation: any = useNavigation();
  const { user } = useAuthStore();
  const { addEvent } = useDataStore();
  // --- Get ALL form state and actions from the new Zustand store ---
  const {
    eventName, setEventName,
    address, setAddress,
    category, setCategory,
    description, setDescription,
    price, setPrice,
    imageUri, setImageUri,
    maxParticipants, setMaxParticipants,
    date, setDate,
    time, setTime,
    clearForm // Get the clear function
  } = useEventFormStore();
  // --- UI state for showing the picker remains local ---
  const [showPicker, setShowPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState<'date' | 'time'>('date');

  const togglePicker = (modeToShow: 'date' | 'time') => {
    setShowPicker(true);
    setPickerMode(modeToShow);
  };

  // @ts-ignore
  const onChange = (event, selectedValue) => {
    setShowPicker(Platform.OS === 'ios' ? true : false);
    if (event.type === 'set') {
      const currentValue = selectedValue || (pickerMode === 'date' ? new Date(date) : new Date(time));
      if (pickerMode === 'date') {
        setDate(currentValue.toISOString());
      } else {
        setTime(currentValue.toISOString());
      }
    }
  };

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };
  // @ts-ignore
  const onChangeDate = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate || date;
      setDate(currentDate);
      if (Platform.OS === "android") {
        toggleDatePicker();
      }
    } else {
      toggleDatePicker();
    }
  };

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
    if (!user?.isPremium) {
      Alert.alert("Abonnement Premium Requis", "Seuls les membres Premium peuvent créer des événements.", [{ text: "Annuler", style: "cancel" }, { text: "Voir Premium", onPress: () => navigation.navigate(Routes.M5) }]);
      return;
    }

    if (!eventName.trim() || !address.trim() || !description.trim() || !imageUri || !maxParticipants.trim()) {
      Alert.alert("Formulaire Incomplet", "Veuillez remplir tous les champs et ajouter une photo.");
      return;
    }

    addEvent({
      title: eventName,
      description: description,
      date: new Date(date).toLocaleDateString('fr-FR'),
      time: new Date(time).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      location: address,
      maxParticipants: parseInt(maxParticipants, 10) || 50,
      price: `${price} DA`,
      image: imageUri,
      category: category,
      artistId: user.id,
      participants: 0,
      // @ts-ignore
      rating: 4.0,
    });

    Alert.alert("Succès!", "Votre événement a été créé.");
    clearForm(); // --- CLEAR THE PERSISTED FORM DATA AFTER SUBMISSION ---
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      {/* --- The single, reusable DateTimePicker component --- */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1, backgroundColor: COLORS.white }}
          keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
        >
          <ScrollView style={{ flex: 1 }} bounces={false} contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
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

              {/* --- Date and Time Pickers --- */}
              <View style={styles.row}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.label}>Date *</Text>
                  <DateTimePicker
                    mode={pickerMode}
                    display="default"
                    value={pickerMode === 'date' ? new Date(date) : new Date(time)}
                    onChange={onChange}
                    style={{ backgroundColor: '#f0f0f7', borderRadius: 10, height: 50 }}
                  />
                </View>
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.label}>Heure *</Text>
                  <Pressable onPress={() => togglePicker('time')}>
                    <TextInput style={[styles.input, { paddingVertical: 8 }]} value={time} editable={false} />
                  </Pressable>
                </View>
              </View>

              <Text style={styles.label}>Adresse *</Text>
              <TextInput placeholder="Ex: Centre culturel, Oran" style={styles.input} value={address} onChangeText={setAddress} />

              <Text style={styles.label}>Catégorie *</Text>
              <TextInput placeholder="Ex: Musique, Art Visuel" style={styles.input} value={category} onChangeText={setCategory} />

              <Text style={styles.label}>Description *</Text>
              <TextInput placeholder="Décrivez votre événement..." style={styles.textArea} value={description} onChangeText={setDescription} multiline numberOfLines={4} />
            </View>

            {/* --- UPDATED Pricing & Capacity Section --- */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Tarif et Capacité</Text>
              <View style={[styles.row, { gap: 10 }]}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.label}>Prix par participant (DA)</Text>
                  <TextInput style={styles.input} value={price} onChangeText={setPrice} keyboardType="numeric" />
                </View>
                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                  <Text style={styles.label}>Places max *</Text>
                  <TextInput style={styles.input} value={maxParticipants} onChangeText={setMaxParticipants} keyboardType="numeric" />
                </View>
              </View>
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
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
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
  row: { flexDirection: 'row', justifyContent: 'space-between' },

});

export default CreateEventScreen;