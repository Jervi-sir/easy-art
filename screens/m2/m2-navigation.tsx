import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, TextInput, Platform, } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { COLORS } from '@utils/constants/colors';
import { CardHorizontal1 } from '@components/cards/card-hotizontal-1';

const FILTERS = ['Tout', 'Musique', 'Art Visuel', 'Photographie'];

const M2Navigation = () => {
  const [searchQuery, setSearchQuery] = useState('c');
  const [activeFilter, setActiveFilter] = useState('Musique');

  // Mock data for the search result
  const searchResult = {
    id: '1',
    name: 'Salim Mehenni',
    job: 'Guitariste & Compositeur',
    rating: 4.9,
    location: 'Alger',
    price: '3,500 DA/h',
    image: 'https://i.pravatar.cc/150?img=25',
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        {/* --- Header --- */}
        <View style={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10 }}>
          <Text style={{ fontSize: 26, fontWeight: 'bold', color: COLORS.black }}>Rechercher des talents</Text>
          <Text style={{ fontSize: 16, color: COLORS.darkGray, marginTop: 5 }}>Trouvez l'artiste parfait pour votre projet</Text>
        </View>

        {/* --- Search Bar & Filter Button --- */}
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginTop: 15 }}>
          <TextInput
            style={{
              flex: 1,
              backgroundColor: COLORS.gray,
              padding: 15,
              borderRadius: 12,
              fontSize: 16,
              marginRight: 10,
            }}
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
                style={[{
                  backgroundColor: COLORS.gray,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 20,
                  marginRight: 10,
                }, activeFilter === filter && { backgroundColor: COLORS.primary }]}>
                <Text style={[{
                  fontWeight: '600',
                  color: COLORS.darkGray,
                }, activeFilter === filter && { color: COLORS.white }]}>
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* --- Results List --- */}
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={{ color: COLORS.darkGray, marginBottom: 15, fontSize: 14 }}>1 résultat trouvé</Text>
          <CardHorizontal1 artist={searchResult} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default M2Navigation;