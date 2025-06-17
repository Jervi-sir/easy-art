import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { COLORS } from '@utils/constants/colors';
import { useNavigation } from '@react-navigation/native';

const JoinEventScreen = () => {
  const navigation: any = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [audioFile, setAudioFile] = useState(null);

  const handleSelectFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['audio/mpeg', 'audio/wav', 'audio/x-m4a'],
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
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={{
          gap: 30,
          paddingHorizontal: 20,
          backgroundColor: COLORS.primary,
          paddingTop: 20,
          paddingBottom: 20,
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ width: 40, height: 40, backgroundColor: COLORS.primaryLight, borderRadius: 100, alignItems: 'center', justifyContent: 'center' }}
            >
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={{ color: COLORS.white, fontSize: 20, fontWeight: 'bold' }}>Inscription à l'événement</Text>
          </View>

          {/* Event Details Card */}
          <View style={{
            backgroundColor: COLORS.primaryLight,
            padding: 20,
            borderRadius: 15,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 5,
            gap: 10
          }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#fff', marginBottom: 10 }}>
              Concert de Musique Traditionnelle
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Ionicons name="calendar-outline" size={18} color={COLORS.white} />
              <Text style={{ fontSize: 16, color: '#fff', marginBottom: 5 }}>20/12/2025</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Ionicons name="location-outline" size={18} color={COLORS.white} />
              <Text style={{ fontSize: 16, color: '#fff' }}>Théâtre National, Alger</Text>
            </View>
          </View>
        </View>

        {/* Personal Information Section */}
        <View style={{
          backgroundColor: '#fff',
          marginHorizontal: 20,
          marginTop: 20,
          padding: 20,
          borderRadius: 15,
        }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 }}>
            Informations personnelles
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
            <TextInput
              placeholder="Prénom"
              style={{
                backgroundColor: '#f0f0f7',
                padding: 15,
                borderRadius: 10,
                fontSize: 16,
                flex: 1,
                marginRight: 8,
              }}
              value={firstName}
              onChangeText={setFirstName}
            />
            <TextInput
              placeholder="Nom"
              style={{
                backgroundColor: '#f0f0f7',
                padding: 15,
                borderRadius: 10,
                fontSize: 16,
                flex: 1,
                marginLeft: 8,
              }}
              value={lastName}
              onChangeText={setLastName}
            />
          </View>
          <View style={{ position: 'relative', justifyContent: 'center' }}>
            <TextInput
              placeholder="jj/mm/aaaa"
              style={{
                backgroundColor: '#f0f0f7',
                padding: 15,
                borderRadius: 10,
                fontSize: 16,
              }}
              value={birthDate}
              onChangeText={setBirthDate}
              keyboardType="numeric"
            />
            <Ionicons
              name="calendar-outline"
              size={24}
              color="#888"
              style={{ position: 'absolute', right: 15 }}
            />
          </View>
        </View>

        {/* Portfolio Section */}
        <View style={{
          backgroundColor: '#fff',
          marginHorizontal: 20,
          marginTop: 20,
          padding: 20,
          borderRadius: 15,
        }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 }}>
            Portfolio
          </Text>
          <TouchableOpacity
            style={{
              borderWidth: 2,
              borderColor: '#e0e0e0',
              borderStyle: 'dashed',
              borderRadius: 15,
              padding: 20,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#fafafa',
            }}
            onPress={handleSelectFile}
          >
            <Ionicons name="musical-notes-outline" size={48} color={COLORS.primary} />
            <Text style={{ fontSize: 16, color: '#333', marginTop: 10, fontWeight: 'bold' }}>
              Ajoutez vos enregistrements audio
            </Text>
            <Text style={{ fontSize: 14, color: '#888', marginTop: 5, marginBottom: 15 }}>
              MP3, WAV, M4A
            </Text>
            {audioFile ? (
              <Text style={{ fontSize: 14, color: '#007BFF', marginTop: 10 }}>
                Fichier: {audioFile.name}
              </Text>
            ) : (
              <Text style={{
                backgroundColor: '#e0e0e0',
                color: '#333',
                paddingVertical: 8,
                paddingHorizontal: 20,
                borderRadius: 20,
                overflow: 'hidden',
              }}>
                Sélect. fichiers
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Important Info Card */}
        <View style={{
          backgroundColor: '#FFF8DC',
          padding: 20,
          marginHorizontal: 20,
          marginTop: 20,
          borderRadius: 15,
          borderLeftWidth: 5,
          borderLeftColor: '#FFD700',
        }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 10 }}>
            Informations importantes
          </Text>
          <Text style={{ fontSize: 14, color: '#555', lineHeight: 22 }}>
            • Prix d'inscription: 500 DA
          </Text>
          <Text style={{ fontSize: 14, color: '#555', lineHeight: 22 }}>
            • Organisé par: Association Culturelle
          </Text>
          <Text style={{ fontSize: 14, color: '#555', lineHeight: 22 }}>
            • Catégorie: Musique
          </Text>
          <Text style={{ fontSize: 14, color: '#555', lineHeight: 22 }}>
            • Inscription soumise à validation
          </Text>
        </View>

        {/* Footer Button */}
        <View style={{
          padding: 20,
        }}>
          <TouchableOpacity style={{
            backgroundColor: COLORS.primary,
            padding: 18,
            borderRadius: 15,
            alignItems: 'center',
          }}>
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
              S'inscrire à l'événement (150 DA)
            </Text>
          </TouchableOpacity>
        </View>

      </ScrollView>


    </View>
  );
};

export default JoinEventScreen;