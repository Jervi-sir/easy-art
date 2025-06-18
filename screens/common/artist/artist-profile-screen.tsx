import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, SafeAreaView, ImageBackground } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@utils/constants/colors';
import { Routes } from '@utils/constants/Routes';
import { useDataStore } from 'zustand/data.store';

const ArtistProfileScreen = () => {
  const navigation: any = useNavigation();
  const route = useRoute();
  // @ts-ignore
  const { artist } = route.params;

  const { events, creations, favorites, toggleFavorite } = useDataStore();

  const isFavorite = favorites.includes(artist.id);
  const artistCreations = creations.filter(c => c.artistId === artist.id);
  const artistEvents = events.filter(e => e.artistId === artist.id);

  return (
    <View style={styles.container}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <ImageBackground source={{ uri: artist.image }} style={styles.headerBackground} blurRadius={10}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={COLORS.white} />
          </TouchableOpacity>
          <Image source={{ uri: artist.image }} style={styles.profileImage} />
          <Text style={styles.artistName}>{artist.name}</Text>
          <Text style={styles.artistJob}>{artist.job}</Text>
        </ImageBackground>

        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={() => toggleFavorite(artist.id)}>
            <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={24} color={isFavorite ? COLORS.red : COLORS.primary} />
            <Text style={styles.actionText}>Favori</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate(Routes.ChatScreen, { artist })}>
            <Ionicons name="chatbubble-ellipses-outline" size={24} color={COLORS.primary} />
            <Text style={styles.actionText}>Message</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>À Propos</Text>
          <Text style={styles.bioText}>{artist.bio || "Aucune biographie disponible."}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Portfolio</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {artistCreations.map(item => (
              <View key={item.id} style={styles.creationCard}>
                <Image source={{ uri: item.image }} style={styles.creationImage} />
                <Text style={styles.creationTitle}>{item.title}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Événements</Text>
          {artistEvents.length > 0 ? artistEvents.map(event => (
            <TouchableOpacity key={event.id} style={styles.eventCard}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.eventDate}>{event.date} - {event.location}</Text>
            </TouchableOpacity>
          )) : <Text>Aucun événement à venir.</Text>}
        </View>
      </ScrollView>
    </View>
  );
};

// Add comprehensive styles for the new screen
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  headerBackground: { padding: 20, paddingTop: 50, alignItems: 'center' },
  backButton: { position: 'absolute', top: 40, left: 15, backgroundColor: 'rgba(0,0,0,0.3)', padding: 8, borderRadius: 20 },
  profileImage: { width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: COLORS.white, marginTop: 20 },
  artistName: { fontSize: 24, fontWeight: 'bold', color: COLORS.white, marginTop: 10, textShadowColor: 'rgba(0, 0, 0, 0.75)', textShadowOffset: { width: -1, height: 1 }, textShadowRadius: 10 },
  artistJob: { fontSize: 16, color: COLORS.white, textShadowColor: 'rgba(0, 0, 0, 0.75)', textShadowOffset: { width: -1, height: 1 }, textShadowRadius: 10 },
  actionsContainer: { flexDirection: 'row', justifyContent: 'space-evenly', paddingVertical: 10, backgroundColor: COLORS.white, borderBottomWidth: 1, borderBottomColor: COLORS.lightGray },
  actionButton: { alignItems: 'center' },
  actionText: { color: COLORS.primary, marginTop: 4, fontWeight: '600' },
  section: { marginTop: 20, paddingHorizontal: 20 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  bioText: { fontSize: 15, color: COLORS.darkGray, lineHeight: 22 },
  creationCard: { marginRight: 15, width: 150 },
  creationImage: { width: 150, height: 100, borderRadius: 10 },
  creationTitle: { fontWeight: '600', marginTop: 5 },
  eventCard: { backgroundColor: COLORS.white, padding: 15, borderRadius: 10, marginBottom: 10 },
  eventTitle: { fontWeight: 'bold', fontSize: 16 },
  eventDate: { color: COLORS.darkGray, marginTop: 4 },
});

export default ArtistProfileScreen;