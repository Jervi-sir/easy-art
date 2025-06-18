import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '@utils/constants/colors';
import { Routes } from '@utils/constants/Routes';
import React from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useDataStore } from 'zustand/data.store';

export const CardHorizontal1 = ({ artist, deleteFunction = undefined }: any) => {
  const { favorites, toggleFavorite } = useDataStore();
  const navigation: any = useNavigation();
  const isFavorite = favorites.includes(artist.id);

  return (
    <TouchableOpacity
      key={artist.id}
      style={styles.cardContainer}
      onPress={() => navigation.navigate(Routes.ArtistProfileScreen, { artist })}
    >
      <Image source={{ uri: artist.image }} style={styles.artistImage} />
      <View style={{ flex: 1 }}>
        <Text style={styles.artistName}>{artist.name}</Text>
        <Text style={styles.artistJob}>{artist.job}</Text>
        <View style={styles.infoRow}>
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={12} color={COLORS.gold} />
            <Text style={styles.ratingText}>{artist.rating}</Text>
          </View>
          <Text style={styles.locationText}>
            <Ionicons name="location-sharp" size={14} /> {artist.location}
          </Text>
        </View>
        <Text style={styles.priceText}>{artist.price}</Text>
        {artist.added_at && (
          <Text style={styles.dateText}>Ajouté le {artist.added_at}</Text>
        )}
      </View>

      <View>
        {/* --- FAVORITE BUTTON (HEART ICON) --- */}
        {!deleteFunction && (
          <View style={{ flexDirection: 'column', justifyContent: 'space-between', gap: 30 }}>
            <TouchableOpacity
              onPress={() => toggleFavorite(artist.id)}
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            >
              <Ionicons
                name={isFavorite ? 'heart' : 'heart-outline'}
                size={26}
                color={isFavorite ? COLORS.red : COLORS.darkGray}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate(Routes.ChatScreen, { artist })}>
              <Ionicons name="chatbubble-ellipses-outline" size={26} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        )}
        {/* --- DELETE BUTTON --- */}
        {deleteFunction && (
          <TouchableOpacity
            onPress={deleteFunction}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          >
            <Feather name="trash-2" size={24} color={COLORS.red} />
          </TouchableOpacity>
        )}


      </View>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: { position: 'relative', flexDirection: 'row', backgroundColor: COLORS.white, padding: 15, borderRadius: 15, marginTop: 15, gap: 15, alignItems: 'flex-start', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05 },
  artistImage: { width: 70, height: 70, borderRadius: 16 },
  artistName: { fontSize: 16, fontWeight: 'bold' },
  artistJob: { fontSize: 14, color: COLORS.darkGray },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  ratingBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFBEA', paddingHorizontal: 6, paddingVertical: 3, borderRadius: 10 },
  ratingText: { marginLeft: 4, fontWeight: 'bold', fontSize: 12 },
  locationText: { fontSize: 14, color: COLORS.darkGray, marginLeft: 8 },
  priceText: { marginTop: 8, fontWeight: 'bold', color: COLORS.primary },
  dateText: { marginTop: 4, fontSize: 13, color: COLORS.darkGray },
});