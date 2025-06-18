import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, SafeAreaView, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@utils/constants/colors';
import { Routes } from '@utils/constants/Routes';
import { useDataStore } from 'zustand/data.store';

const EventDetailScreen = () => {
  const navigation: any = useNavigation();
  const route = useRoute();
  // @ts-ignore
  const { event } = route.params;

  const { artists, favoriteEvents, toggleEventFavorite } = useDataStore();
  const artist = artists.find(a => a.id === event.artistId);
  const isFavorite = favoriteEvents.includes(event.id);

  // --- 1. Calculate Available Seats & Progress ---
  const seatsLeft = event.maxParticipants - event.participants;
  const progressPercentage = (event.participants / event.maxParticipants) * 100;


  return (
    <View style={styles.container}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: event.image }} style={styles.image} />
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={COLORS.white} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleEventFavorite(event.id)} style={styles.favoriteButton}>
            <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={28} color={isFavorite ? COLORS.red : COLORS.white} />
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.title}>{event.title}</Text>

          {artist && (
            <TouchableOpacity style={styles.organizerContainer} onPress={() => navigation.navigate(Routes.ArtistProfileScreen, { artist })}>
              <Image source={{ uri: artist.image }} style={styles.organizerAvatar} />
              <View>
                <Text style={styles.organizerLabel}>Organisé par</Text>
                <Text style={styles.organizerName}>{artist.name}</Text>
              </View>
            </TouchableOpacity>
          )}

          <View style={styles.detailsGrid}>
            <InfoPill icon="calendar-outline" text={event.date} />
            <InfoPill icon="time-outline" text={event.time} />
            <InfoPill icon="location-outline" text={event.location} />
            <InfoPill icon="cash-outline" text={event.price} />
          </View>

          {/* --- 2. NEW: Participants Progress Bar --- */}
          <View style={styles.progressSection}>
            <View style={styles.progressLabels}>
              <Text style={styles.progressText}>{event.participants} Participants</Text>
              <Text style={styles.progressText}>Capacité: {event.maxParticipants}</Text>
            </View>
            <View style={styles.progressBarBackground}>
              <View style={[styles.progressBarFill, { width: `${progressPercentage}%` }]} />
            </View>
          </View>

          {/* --- 3. UPDATED: Details Grid with Seat Info --- */}
          <View style={styles.detailsGrid}>
            <InfoPill icon="calendar-outline" text={event.date} />
            <InfoPill icon="time-outline" text={event.time} />
            <InfoPill icon="people-circle-outline" text={`${event.maxParticipants} places`} />
            <InfoPill icon="checkmark-circle-outline" text={`${seatsLeft} restantes`} />
          </View>

          <Text style={styles.sectionTitle}>À propos de l'événement</Text>
          <Text style={styles.description}>{event.description}</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.joinButton} onPress={() => navigation.navigate(Routes.JoinEvent, { event })}>
          <Text style={styles.joinButtonText}>S'inscrire</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// @ts-ignore
const InfoPill = ({ icon, text }) => (
  <View style={styles.pill}>
    <Ionicons name={icon} size={20} color={COLORS.primary} />
    <Text style={styles.pillText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  imageContainer: { width: '100%', height: 280 },
  image: { width: '100%', height: '100%' },
  backButton: { position: 'absolute', top: 20, left: 15, backgroundColor: 'rgba(0,0,0,0.4)', padding: 8, borderRadius: 25 },
  favoriteButton: { position: 'absolute', top: 20, right: 15, backgroundColor: 'rgba(0,0,0,0.4)', padding: 8, borderRadius: 25 },
  contentContainer: { padding: 20 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 15 },
  organizerContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, padding: 10, borderRadius: 12, marginBottom: 20 },
  organizerAvatar: { width: 45, height: 45, borderRadius: 22.5, marginRight: 12 },
  organizerLabel: { fontSize: 13, color: COLORS.darkGray },
  organizerName: { fontSize: 15, fontWeight: 'bold' },
  detailsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 20 },
  pill: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20, marginBottom: 10, width: '48%' },
  pillText: { marginLeft: 8, fontSize: 13, flexShrink: 1 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  description: { fontSize: 15, color: COLORS.darkGray, lineHeight: 23 },
  footer: { padding: 20, backgroundColor: COLORS.background, borderTopWidth: 1, borderTopColor: COLORS.lightGray },
  joinButton: { backgroundColor: COLORS.primary, padding: 18, borderRadius: 15, alignItems: 'center' },
  joinButtonText: { color: COLORS.white, fontSize: 16, fontWeight: 'bold' },

  // --- Styles for Progress Bar ---
  progressSection: { marginBottom: 20 },
  progressLabels: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  progressText: { fontSize: 14, fontWeight: '500', color: COLORS.darkGray },
  progressBarBackground: { height: 8, backgroundColor: COLORS.lightGray, borderRadius: 4, overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: COLORS.primary, borderRadius: 4 },


});

export default EventDetailScreen;