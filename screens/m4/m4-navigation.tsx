import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../utils/constants/colors';
import { CardHorizontal1 } from '@components/cards/card-hotizontal-1';
import { CardEvent } from '@components/cards/card-event'; // --- IMPORT CardEvent
import { Ionicons } from '@expo/vector-icons';
import { useDataStore } from 'zustand/data.store';

const M4Navigation = () => {
  // --- 1. State to manage the active tab ---
  const [activeTab, setActiveTab] = useState('artists'); // 'artists' or 'events'

  // --- 2. Get ALL required data from the store ---
  const {
    artists, favorites, toggleFavorite,
    events, favoriteEvents, toggleEventFavorite
  } = useDataStore();

  // --- 3. Filter data for BOTH lists ---
  const favoriteArtists = artists.filter(artist => favorites.includes(artist.id));
  const favoriteEventsData = events.filter(event => favoriteEvents.includes(event.id));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mes Favoris</Text>
        {/* Dynamic subtitle based on the active tab */}
        <Text style={styles.headerSubtitle}>
          {activeTab === 'artists'
            ? `${favoriteArtists.length} ${favoriteArtists.length !== 1 ? 'artistes sauvegardés' : 'artiste sauvegardé'}`
            : `${favoriteEventsData.length} ${favoriteEventsData.length !== 1 ? 'événements sauvegardés' : 'événement sauvegardé'}`
          }
        </Text>
      </View>

      {/* --- 4. Tab Switcher UI --- */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'artists' && styles.activeTab]}
          onPress={() => setActiveTab('artists')}
        >
          <Ionicons name="people-outline" size={20} color={activeTab === 'artists' ? COLORS.primary : COLORS.darkGray} />
          <Text style={[styles.tabText, activeTab === 'artists' && styles.activeTabText]}>Artistes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'events' && styles.activeTab]}
          onPress={() => setActiveTab('events')}
        >
          <Ionicons name="calendar-outline" size={20} color={activeTab === 'events' ? COLORS.primary : COLORS.darkGray} />
          <Text style={[styles.tabText, activeTab === 'events' && styles.activeTabText]}>Événements</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, flexGrow: 1 }}>
        {/* --- 5. Conditional Rendering based on active tab --- */}
        {activeTab === 'artists' ? (
          // --- Favorite Artists List ---
          favoriteArtists.length > 0 ? (
            favoriteArtists.map(artist => (
              <CardHorizontal1
                key={artist.id}
                artist={artist}
                deleteFunction={() => toggleFavorite(artist.id)}
              />
            ))
          ) : (
            <View style={styles.emptyView}>
              <Text style={styles.emptyText}>Aucun artiste en favori</Text>
            </View>
          )
        ) : (
          // --- Favorite Events List ---
          favoriteEventsData.length > 0 ? (
            favoriteEventsData.map(event => (
              <CardEvent key={event.id} event={event} />
            ))
          ) : (
            <View style={styles.emptyView}>
              <Text style={styles.emptyText}>Aucun événement en favori</Text>
              <Text style={styles.emptySubtext}>Appuyez sur l'icône ❤️ sur un événement pour l'ajouter.</Text>
            </View>
          )
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: COLORS.lightGray },
  headerTitle: { fontSize: 24, fontWeight: 'bold' },
  headerSubtitle: { fontSize: 16, color: COLORS.darkGray, marginTop: 5 },
  tabContainer: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: COLORS.white, paddingVertical: 5, paddingHorizontal: 20, borderBottomColor: COLORS.lightGray, borderBottomWidth: 1 },
  tab: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20, gap: 8 },
  activeTab: { backgroundColor: COLORS.lightPurple },
  tabText: { fontSize: 16, fontWeight: '600', color: COLORS.darkGray },
  activeTabText: { color: COLORS.primary },
  emptyView: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 18, fontWeight: 'bold', color: COLORS.darkGray },
  emptySubtext: { fontSize: 14, color: COLORS.darkGray, marginTop: 10, textAlign: 'center', paddingHorizontal: 20 },
});

export default M4Navigation;