// M2Navigation.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Define a consistent color palette
const COLORS = {
  primary: '#7B42F6', // Main purple
  white: '#FFFFFF',
  black: '#000000',
  gray: '#F4F5F7',
  darkGray: '#6C757D',
};

// Data for the filter chips
const FILTERS = ['Tout', 'Musique', 'Art Visuel', 'Photographie'];

// A reusable component for the search result card
const SearchResultCard = ({ item }) => (
  <TouchableOpacity style={styles.resultCard}>
    <Image source={{ uri: item.image }} style={styles.resultImage} />
    <View style={styles.resultInfo}>
      <Text style={styles.resultName}>{item.name}</Text>
      <Text style={styles.resultJob}>{item.job}</Text>
      <View style={styles.resultDetails}>
        <View style={styles.rating}>
          <Ionicons name="star" size={14} color="#FFC700" />
          <Text style={styles.detailText}>{item.rating}</Text>
        </View>
        <View style={styles.location}>
          <Ionicons name="location-sharp" size={14} color={COLORS.darkGray} />
          <Text style={styles.detailText}>{item.location}</Text>
        </View>
      </View>
      <Text style={styles.resultPrice}>{item.price}</Text>
    </View>
  </TouchableOpacity>
);

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
    image: 'https://i.ibb.co/L5fJc9z/image.png', // A URL that matches the image
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* --- Header --- */}
        <View style={styles.header}>
          <Text style={styles.title}>Rechercher des talents</Text>
          <Text style={styles.subtitle}>Trouvez l'artiste parfait pour votre projet</Text>
        </View>

        {/* --- Search Bar & Filter Button --- */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Rechercher par nom..."
          />
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="filter" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        {/* --- Filter Chips --- */}
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterContainer}>
            {FILTERS.map((filter) => (
              <TouchableOpacity
                key={filter}
                onPress={() => setActiveFilter(filter)}
                style={[styles.chip, activeFilter === filter && styles.activeChip]}>
                <Text style={[styles.chipText, activeFilter === filter && styles.activeChipText]}>
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* --- Results List --- */}
        <View style={styles.resultsContainer}>
            <Text style={styles.resultCount}>1 résultat trouvé</Text>
            <SearchResultCard item={searchResult} />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.darkGray,
    marginTop: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 15,
  },
  searchInput: {
    flex: 1,
    backgroundColor: COLORS.gray,
    padding: 15,
    borderRadius: 12,
    fontSize: 16,
    marginRight: 10,
  },
  filterButton: {
    backgroundColor: COLORS.gray,
    padding: 15,
    borderRadius: 12,
  },
  filterContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  chip: {
    backgroundColor: COLORS.gray,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  activeChip: {
    backgroundColor: COLORS.primary,
  },
  chipText: {
    fontWeight: '600',
    color: COLORS.darkGray,
  },
  activeChipText: {
    color: COLORS.white,
  },
  resultsContainer: {
    paddingHorizontal: 20,
  },
  resultCount: {
    color: COLORS.darkGray,
    marginBottom: 15,
    fontSize: 14,
  },
  resultCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.gray,
    borderRadius: 15,
    padding: 15,
    alignItems: 'flex-start',
  },
  resultImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  resultInfo: {
    flex: 1,
    marginLeft: 15,
  },
  resultName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultJob: {
    fontSize: 14,
    color: COLORS.darkGray,
    marginTop: 4,
  },
  resultDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },
  detailText: {
    marginLeft: 5,
    color: COLORS.darkGray,
    fontWeight: '500',
  },
  resultPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: 8,
  },
});

export default M2Navigation;