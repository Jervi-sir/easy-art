import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '@utils/constants/colors';
import { Routes } from '@utils/constants/Routes';
import React from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useDataStore } from 'zustand/data.store';

export const CardEvent = ({ event }: any) => {
  const navigation: any = useNavigation();
  const { favoriteEvents, toggleEventFavorite } = useDataStore();
  const isFavorite = favoriteEvents.includes(event.id);

  const handleCardPress = () => {
    navigation.navigate(Routes.EventDetailScreen, { event });
  };

  const handleJoinPress = () => {
    navigation.navigate(Routes.JoinEvent, { event: event });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handleCardPress}>
      {/* --- Image Container --- */}
      <View>
        <Image source={{ uri: event.image }} style={styles.image} />
        {/* --- FAVORITE BUTTON --- */}
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => toggleEventFavorite(event.id)}
        >
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={28}
            color={isFavorite ? COLORS.red : COLORS.white}
          />
        </TouchableOpacity>
      </View>

      {/* --- Card Content --- */}
      <View style={{ padding: 20 }}>
        <View style={styles.header}>
          <Text style={styles.title}>{event.title}</Text>
          <View style={styles.ratingBadge}>
            <Feather name="star" size={16} color="#FFC700" />
            <Text style={styles.ratingText}>{event.rating}</Text>
          </View>
        </View>
        <Text style={styles.description}>{event.description}</Text>

        {/* Details Section */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}><Ionicons name="calendar-outline" size={18} color={COLORS.darkGray} /><Text style={styles.detailText}>{event.date}</Text></View>
          <View style={styles.detailRow}><Ionicons name="time-outline" size={18} color={COLORS.darkGray} /><Text style={styles.detailText}>{event.time}</Text></View>
          <View style={styles.detailRow}><Ionicons name="location-outline" size={18} color={COLORS.darkGray} /><Text style={styles.detailText}>{event.location}</Text></View>
        </View>

        {/* Footer Section */}
        <View style={styles.footer}>
          <View style={styles.detailRow}><Ionicons name="people-outline" size={20} color={COLORS.primary} /><Text style={styles.participantsText}>{event.participants}/{event.maxParticipants} participants</Text></View>
          <Text style={styles.priceText}>{event.price}</Text>
        </View>

        <TouchableOpacity style={styles.joinButton} onPress={handleJoinPress}>
          <Text style={styles.joinButtonText}>S'inscrire</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: COLORS.white, borderRadius: 20, overflow: 'hidden', marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 5 },
  image: { width: '100%', height: 180 },
  favoriteButton: { position: 'absolute', top: 12, right: 12, backgroundColor: 'rgba(0,0,0,0.3)', padding: 6, borderRadius: 30 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  title: { fontSize: 20, fontWeight: 'bold', flex: 1, marginRight: 10 },
  ratingBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFBEA', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  ratingText: { marginLeft: 5, fontWeight: 'bold' },
  description: { fontSize: 14, color: COLORS.darkGray, marginTop: 8, lineHeight: 20 },
  detailsContainer: { marginTop: 20, borderTopWidth: 1, borderTopColor: COLORS.lightGray, paddingTop: 15 },
  detailRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  detailText: { marginLeft: 10, fontSize: 14, color: COLORS.darkGray },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  participantsText: { marginLeft: 8, fontSize: 14, fontWeight: '500', color: COLORS.primary },
  priceText: { fontSize: 20, fontWeight: 'bold', color: COLORS.orange },
  joinButton: { backgroundColor: COLORS.primary, padding: 15, borderRadius: 15, alignItems: 'center', marginTop: 20 },
  joinButtonText: { color: COLORS.white, fontSize: 16, fontWeight: 'bold' },
});