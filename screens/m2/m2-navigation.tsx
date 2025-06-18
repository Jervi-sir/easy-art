import React, { useState, useMemo } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '@utils/constants/colors';
import { CardHorizontal1 } from '@components/cards/card-hotizontal-1';
import { useDataStore } from 'zustand/data.store';

const FILTERS = ['Tout', 'Musique', 'Art Visuel', 'Photographie', 'Cuisine', 'Cinéma'];

const M2Navigation = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('Tout');
  const { artists } = useDataStore(); 

  const filteredArtists = useMemo(() => {
    return artists.filter(artist => {
      const matchesCategory = activeFilter === 'Tout' || artist.category === activeFilter;
      const matchesSearch = artist.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [artists, searchQuery, activeFilter]);

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        {/* --- Header --- */}
        <View style={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10 }}>
          <Text style={{ fontSize: 26, fontWeight: 'bold', color: COLORS.black }}>Rechercher des talents</Text>
          <Text style={{ fontSize: 16, color: COLORS.darkGray, marginTop: 5 }}>Trouvez l'artiste parfait pour votre projet</Text>
        </View>

        {/* --- Search Bar & Filter Button --- */}
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginTop: 15 }}>
          <TextInput
            style={{ flex: 1, backgroundColor: COLORS.gray, padding: 15, borderRadius: 12, fontSize: 16, marginRight: 10 }}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Rechercher par nom..."
          />
          <TouchableOpacity style={{ backgroundColor: COLORS.gray, padding: 13, borderRadius: 12 }}>
            <Feather name="filter" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        {/* --- Filter Chips --- */}
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 15 }}>
            {FILTERS.map((filter) => (
              <TouchableOpacity
                key={filter}
                onPress={() => setActiveFilter(filter)}
                style={[{ backgroundColor: COLORS.gray, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, marginRight: 10 }, activeFilter === filter && { backgroundColor: COLORS.primary }]}>
                <Text style={[{ fontWeight: '600', color: COLORS.darkGray }, activeFilter === filter && { color: COLORS.white }]}>
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* --- Results List --- */}
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={{ color: COLORS.darkGray, marginBottom: 15, fontSize: 14 }}>
            {filteredArtists.length} {filteredArtists.length > 1 ? 'résultats trouvés' : 'résultat trouvé'}
          </Text>
          {filteredArtists.length > 0 ? (
            filteredArtists.map(artist => <CardHorizontal1 key={artist.id} artist={artist} />)
          ) : (
            <Text style={{ textAlign: 'center', marginTop: 40, color: COLORS.darkGray }}>Aucun artiste trouvé.</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default M2Navigation;