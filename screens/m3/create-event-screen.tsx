import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@utils/constants/colors';
import { useNavigation } from '@react-navigation/native';

const CreateEventScreen = () => {
  const navigation: any = useNavigation();

  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('100');
  const [image, setImage] = useState(null);

  const handlePickImage = () => {
    console.log('Pick image');
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 20,
          paddingHorizontal: 20,
          paddingTop: 20,
          paddingBottom: 20,
          backgroundColor: COLORS.primary,
        }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.white} />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.white }}>Créer un événement</Text>
        </View>

        {/* Photo Section */}
        <View style={{
          backgroundColor: '#fff',
          marginHorizontal: 20,
          marginTop: 20,
          padding: 20,
          borderRadius: 15,
        }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 }}>
            Photo de l'événement *
          </Text>
          <TouchableOpacity 
            style={{
              height: 150,
              borderWidth: 2,
              borderColor: '#e0e0e0',
              borderStyle: 'dashed',
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#fafafa',
            }} 
            onPress={handlePickImage}
          >
            {image ? (
              <Image 
                source={{ uri: image }} 
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 13,
                }} 
              />
            ) : (
              <>
                <Ionicons name="camera-outline" size={32} color={COLORS.primary} />
                <Text style={{ fontSize: 16, color: '#333', marginTop: 10 }}>
                  Ajouter une photo
                </Text>
                <Text style={{ fontSize: 12, color: '#888', marginTop: 4 }}>
                  Recommandé: 1200x800px
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Basic Info Section */}
        <View style={{
          backgroundColor: '#fff',
          marginHorizontal: 20,
          marginTop: 20,
          padding: 20,
          borderRadius: 15,
        }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 }}>
            Informations de base
          </Text>
          
          <Text style={{ fontSize: 14, color: '#666', marginBottom: 8, marginTop: 10 }}>
            Nom de l'événement *
          </Text>
          <TextInput
            placeholder="Ex: Exposition de peinture moderne"
            style={{
              backgroundColor: '#f0f0f7',
              padding: 15,
              borderRadius: 10,
              fontSize: 16,
            }}
            value={eventName}
            onChangeText={setEventName}
          />

          <Text style={{ fontSize: 14, color: '#666', marginBottom: 8, marginTop: 10 }}>
            Date de l'événement
          </Text>
          <View style={{ position: 'relative', justifyContent: 'center' }}>
            <TextInput
              placeholder="jj/mm/aaaa"
              style={{
                backgroundColor: '#f0f0f7',
                padding: 15,
                borderRadius: 10,
                fontSize: 16,
              }}
              value={eventDate}
              onChangeText={setEventDate}
            />
            <Ionicons 
              name="calendar-outline" 
              size={24} 
              color="#888" 
              style={{ position: 'absolute', right: 15 }} 
            />
          </View>

          <Text style={{ fontSize: 14, color: '#666', marginBottom: 8, marginTop: 10 }}>
            Adresse
          </Text>
          <TextInput
            placeholder="Ex: Centre culturel, Oran"
            style={{
              backgroundColor: '#f0f0f7',
              padding: 15,
              borderRadius: 10,
              fontSize: 16,
            }}
            value={address}
            onChangeText={setAddress}
          />

          <Text style={{ fontSize: 14, color: '#666', marginBottom: 8, marginTop: 10 }}>
            Catégorie
          </Text>
          <TextInput
            placeholder="Sélectionnez une catégorie"
            style={{
              backgroundColor: '#f0f0f7',
              padding: 15,
              borderRadius: 10,
              fontSize: 16,
            }}
            value={category}
            onChangeText={setCategory}
          />

          <Text style={{ fontSize: 14, color: '#666', marginBottom: 8, marginTop: 10 }}>
            Description
          </Text>
          <TextInput
            placeholder="Décrivez votre événement..."
            style={{
              backgroundColor: '#f0f0f7',
              padding: 15,
              borderRadius: 10,
              fontSize: 16,
              height: 100,
              textAlignVertical: 'top',
            }}
            multiline
            numberOfLines={4}
            value={description}
            onChangeText={setDescription}
          />
        </View>

        {/* Pricing Section */}
        <View style={{
          backgroundColor: '#fff',
          marginHorizontal: 20,
          marginTop: 20,
          padding: 20,
          borderRadius: 15,
        }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 }}>
            Tarification
          </Text>
          <Text style={{ fontSize: 14, color: '#666', marginBottom: 8, marginTop: 10 }}>
            Prix d'inscription par participant (DA)
          </Text>
          <TextInput
            style={{
              backgroundColor: '#f0f0f7',
              padding: 15,
              borderRadius: 10,
              fontSize: 16,
            }}
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />
          <View style={{
            backgroundColor: '#f0f0f7',
            borderRadius: 10,
            padding: 15,
            marginTop: 15,
          }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#333', marginBottom: 8 }}>
              Prix suggérés par catégorie:
            </Text>
            <Text style={{ fontSize: 13, color: '#555', lineHeight: 20 }}>
              • Ateliers (Cuisine, Dessin): 200-500 DA
            </Text>
            <Text style={{ fontSize: 13, color: '#555', lineHeight: 20 }}>
              • Concerts, Spectacles: 800-800 DA
            </Text>
            <Text style={{ fontSize: 13, color: '#555', lineHeight: 20 }}>
              • Expositions: 100-300 DA
            </Text>
            <Text style={{ fontSize: 13, color: '#555', lineHeight: 20 }}>
              • Formations: 500-1500 DA
            </Text>
          </View>
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
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>
            Créer l'événement (Abonnement requis: 150 DA)
          </Text>
        </TouchableOpacity>
      </View>

      </ScrollView>


    </View>
  );
};

export default CreateEventScreen;