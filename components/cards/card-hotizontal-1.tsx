import { Feather, Ionicons } from '@expo/vector-icons';
import { COLORS } from '@utils/constants/colors';
import React from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useDataStore } from 'zustand/data.store';

export const CardHorizontal1 = ({ artist, deleteFunction = undefined }: any) => {
    // Get favorite state and the function to change it from the store
    const { favorites, toggleFavorite } = useDataStore();

    // Check if the current artist is in the favorites list
    const isFavorite = favorites.includes(artist.id);

    return (
        <TouchableOpacity key={artist.id} style={styles.cardContainer}>
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

            {/* --- FAVORITE BUTTON (HEART ICON) --- */}
            {!deleteFunction && ( // Only show the heart if the trash icon isn't present
                 <TouchableOpacity
                    onPress={() => toggleFavorite(artist.id)}
                    style={styles.iconButton}
                    hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                >
                    <Ionicons
                        name={isFavorite ? 'heart' : 'heart-outline'}
                        size={26}
                        color={isFavorite ? COLORS.red : COLORS.darkGray}
                    />
                </TouchableOpacity>
            )}

            {/* --- DELETE BUTTON (TRASH ICON) --- */}
            {deleteFunction && (
                <TouchableOpacity
                    onPress={deleteFunction}
                    style={styles.iconButton}
                    hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                >
                    <Feather name="trash-2" size={24} color={COLORS.red} />
                </TouchableOpacity>
            )}
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
    iconButton: { position: 'absolute', top: 16, right: 16 },
});