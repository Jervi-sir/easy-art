import React, { useState, useMemo } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { COLORS } from '@utils/constants/colors';
import { CardEvent } from '@components/cards/card-event';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '@utils/constants/Routes';
import { LinearGradient } from 'expo-linear-gradient';
import { useDataStore } from 'zustand/data.store';

const FILTERS = ['Tout', 'Art Visuel', 'Musique', 'Cinéma', 'Théâtre'];

const M3Navigation = () => {
  const [activeFilter, setActiveFilter] = useState('Tout');
  const navigation: any = useNavigation();
  const { events } = useDataStore(); // Get events from the store

  // Memoize the filtered list for better performance
  const filteredEvents = useMemo(() => {
    if (activeFilter === 'Tout') {
      return events;
    }
    return events.filter(event => event.category === activeFilter);
  }, [events, activeFilter]);

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={[COLORS.primary, COLORS.primaryLight]}
          style={{ paddingTop: 20, paddingBottom: 40, paddingHorizontal: 40 }}
        >
          <Text style={{ fontSize: 28, fontWeight: 'bold', color: COLORS.white, textAlign: 'center' }}>
            Événements Artistiques
          </Text>
          <Text style={{ fontSize: 16, color: 'rgba(255, 255, 255, 0.8)', textAlign: 'center' }}>
            Découvrez et participez aux événements créatifs
          </Text>
        </LinearGradient>

        <View style={{ alignItems: 'center', marginTop: -28 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate(Routes.CreateEventScreen)}
            style={{
              flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.orange,
              paddingVertical: 15, paddingHorizontal: 30, borderRadius: 16,
              shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3, shadowRadius: 5, elevation: 8,
            }}
          >
            <Feather name="plus" size={20} color={COLORS.white} />
            <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: 'bold', marginLeft: 8 }}>
              Créer un événement
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ paddingHorizontal: 20 }}>
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
                    flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white,
                    paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20,
                    marginRight: 10, borderWidth: 1, borderColor: COLORS.lightGray
                  }, activeFilter === filter && { backgroundColor: COLORS.primary, borderWidth: 0 }]}
                >
                  <Text style={[{ fontWeight: '600', color: COLORS.darkGray }, activeFilter === filter && { color: COLORS.white }]}>
                    {filter}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.darkGray, marginBottom: 15 }}>
            {filteredEvents.length} {filteredEvents.length !== 1 ? 'événements disponibles' : 'événement disponible'}
          </Text>

          {filteredEvents.length > 0 ? (
            filteredEvents.map(event => <CardEvent key={event.id} event={event} />)
          ) : (
            <Text style={{ textAlign: 'center', color: COLORS.darkGray, marginTop: 40 }}>
              Aucun événement dans cette catégorie pour le moment.
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default M3Navigation;