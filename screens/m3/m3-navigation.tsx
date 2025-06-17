import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Platform, } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { COLORS } from '@utils/constants/colors';
import { CardEvent } from '@components/cards/card-event';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '@utils/constants/Routes';
import { LinearGradient } from 'expo-linear-gradient';
const FILTERS = ['Tout', 'Art Visuel', 'Musique', 'Cinéma', 'Théâtre'];
const eventData = {
  id: '1',
  title: 'Exposition de Peinture Moderne',
  description: 'Découvrez les œuvres d\'artistes contemporains algériens',
  rating: 4.8,
  date: '25 Janvier 2025',
  time: '14:00',
  location: 'Galerie d\'Art, Alger Centre',
  participants: 45,
  maxParticipants: 80,
  price: '500 DA',
  image: 'https://place.abh.ai/s3fs-public/placeholder/DSC_0219_400x400.JPG',
};



const M3Navigation = () => {
  const [activeFilter, setActiveFilter] = useState('Tout');
  const navigation: any = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
      }}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={[COLORS.primary, COLORS.primaryLight]}
          style={{
            paddingTop: 20,
            paddingBottom: 40,
            paddingHorizontal: 40,
          }}
        >

          <Text style={{
            fontSize: 28,
            fontWeight: 'bold',
            color: COLORS.white,
            textAlign: 'center'
          }}>
            Événements Artistiques
          </Text>
          <Text style={{
            fontSize: 16,
            color: 'rgba(255, 255, 255, 0.8)',
            textAlign: 'center',
          }}>
            Découvrez et participez aux événements créatifs
          </Text>
        </LinearGradient>
        {/* Create Event Button */}
        <View style={{
          alignItems: 'center',
          marginTop: -28,
        }}>
          <TouchableOpacity
            onPress={() => navigation.navigate(Routes.CreateEventScreen)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: COLORS.orange,
              paddingVertical: 15,
              paddingHorizontal: 30,
              borderRadius: 16,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 5,
              elevation: 8,
            }}>
            <Feather name="plus" size={20} color={COLORS.white} />
            <Text style={{
              color: COLORS.white,
              fontSize: 18,
              fontWeight: 'bold',
              marginLeft: 8
            }}>
              Créer un événement
            </Text>
          </TouchableOpacity>
        </View>

        {/* Main Content */}
        <View style={{ paddingHorizontal: 20 }}>
          {/* Filter Chips */}
          <View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 20 }}
            >
              {FILTERS.map((filter) => (
                <TouchableOpacity
                  key={filter}
                  onPress={() => setActiveFilter(filter)}
                  style={[{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: COLORS.white,
                    paddingHorizontal: 15,
                    paddingVertical: 8,
                    borderRadius: 20,
                    marginRight: 10,
                    borderWidth: 1,
                    borderColor: COLORS.lightGray
                  }, activeFilter === filter && {
                    backgroundColor: COLORS.primary,
                    borderWidth: 0,
                  }]}
                >
                  <Ionicons
                    name={
                      filter === 'Art Visuel' ? 'color-palette-outline' :
                        filter === 'Musique' ? 'musical-notes-outline' : 'ellipse-outline'
                    }
                    size={16}
                    color={activeFilter === filter ? COLORS.white : COLORS.darkGray}
                    style={{ marginRight: 6 }}
                  />
                  <Text style={[{
                    fontWeight: '600',
                    color: COLORS.darkGray,
                  }, activeFilter === filter && {
                    color: COLORS.white
                  }]}>
                    {filter}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Results */}
          <Text style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: COLORS.darkGray,
            marginBottom: 15
          }}>
            4 événements disponibles
          </Text>
          <CardEvent event={eventData} />
        </View>
      </ScrollView>
    </View>
  );
};

export default M3Navigation;