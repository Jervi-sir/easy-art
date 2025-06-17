// M3Navigation.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Define a consistent color palette
const COLORS = {
  primary: '#7B42F6', // Main purple
  orange: '#F9A825',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#F4F5F7',
  darkGray: '#6C757D',
  lightGray: '#E9ECEF',
};

// Data for the filter chips
const FILTERS = ['Tout', 'Art Visuel', 'Musique', 'Cinéma', 'Théâtre'];

// Mock data for the event card
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
  image: 'https://images.unsplash.com/photo-1599749001385-e753366a15ec?w=800&q=80',
};

// A reusable component for the event card
const EventCard = ({ event }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: event.image }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{event.title}</Text>
          <View style={styles.rating}>
            <Ionicons name="star" size={16} color="#FFC700" />
            <Text style={styles.ratingText}>{event.rating}</Text>
          </View>
        </View>
        <Text style={styles.cardDescription}>{event.description}</Text>
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Ionicons name="calendar-outline" size={18} color={COLORS.darkGray} />
            <Text style={styles.detailText}>{event.date}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="time-outline" size={18} color={COLORS.darkGray} />
            <Text style={styles.detailText}>{event.time}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="location-outline" size={18} color={COLORS.darkGray} />
            <Text style={styles.detailText}>{event.location}</Text>
          </View>
        </View>
        <View style={styles.cardFooter}>
          <View style={styles.participants}>
            <Ionicons name="people-outline" size={20} color={COLORS.primary} />
            <Text style={styles.participantsText}>
              {event.participants}/{event.maxParticipants} participants
            </Text>
          </View>
          <Text style={styles.priceText}>{event.price}</Text>
        </View>
        <TouchableOpacity style={styles.registerButton}>
          <Text style={styles.registerButtonText}>S'inscrire</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const M3Navigation = () => {
  const [activeFilter, setActiveFilter] = useState('Tout');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* --- Header --- */}
        <View style={styles.header}>
          <Text style={styles.title}>Événements Artistiques</Text>
          <Text style={styles.subtitle}>Découvrez et participez aux événements créatifs</Text>
        </View>

        {/* --- Create Event Button (overlaps header) --- */}
        <View style={styles.createButtonContainer}>
          <TouchableOpacity style={styles.createButton}>
            <Ionicons name="add-circle-outline" size={24} color={COLORS.white} />
            <Text style={styles.createButtonText}>Créer un événement</Text>
          </TouchableOpacity>
        </View>
        
        {/* --- Main Content Area --- */}
        <View style={styles.contentArea}>
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
                        <Ionicons 
                            name={
                                filter === 'Art Visuel' ? 'color-palette-outline' :
                                filter === 'Musique' ? 'musical-notes-outline' : 'ellipse-outline'
                            } 
                            size={16}
                            color={activeFilter === filter ? COLORS.white : COLORS.darkGray}
                            style={{ marginRight: 6 }}
                        />
                        <Text style={[styles.chipText, activeFilter === filter && styles.activeChipText]}>
                        {filter}
                        </Text>
                    </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
            
            {/* --- Results --- */}
            <Text style={styles.resultsCount}>4 événements disponibles</Text>
            <EventCard event={eventData} />
            {/* You can add more <EventCard /> components here */}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 60, // Extra padding to make space for the button
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginTop: 5,
  },
  createButtonContainer: {
    alignItems: 'center',
    marginTop: -28, // Pulls the button up to overlap the header
    zIndex: 1,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.orange,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  createButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  contentArea: {
    paddingHorizontal: 20,
  },
  filterContainer: {
    paddingVertical: 20,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: COLORS.lightGray
  },
  activeChip: {
    backgroundColor: COLORS.primary,
    borderWidth: 0,
  },
  chipText: {
    fontWeight: '600',
    color: COLORS.darkGray,
  },
  activeChipText: {
    color: COLORS.white,
  },
  resultsCount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 15,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: 180,
  },
  cardContent: {
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEA',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    marginLeft: 5,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 14,
    color: COLORS.darkGray,
    marginTop: 8,
    lineHeight: 20,
  },
  detailsContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
    paddingTop: 15,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailText: {
    marginLeft: 10,
    fontSize: 14,
    color: COLORS.darkGray,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  participants: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  participantsText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  priceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  registerButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  registerButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default M3Navigation;