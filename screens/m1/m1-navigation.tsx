import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, Image, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../utils/constants/colors';

const CATEGORIES = [
  { id: '1', name: 'Musique', icon: 'musical-notes', count: 143 },
  { id: '2', name: 'Art Visuel', icon: 'color-palette', count: 89 },
  { id: '3', name: 'Photographie', icon: 'camera', count: 67 },
  { id: '4', name: 'Cinéma', icon: 'film', count: 45 },
];

const ARTISTS = [
    { id: '1', name: 'Amina Belkacem', job: 'Artiste peintre', rating: 4.8, location: 'Alger', price: '2,500 DA/h', image: 'https://i.pravatar.cc/150?img=25' },
    { id: '2', name: 'Yacine Messaoudi', job: 'Photographe mariage', rating: 4.8, location: 'Oran', price: '15,000 DA/event', image: 'https://i.pravatar.cc/150?img=1' },
    { id: '3', name: 'Fatima Zerouki', job: 'Chef pâtissière', rating: 4.9, location: 'Constantine', price: '3,000 DA/h', image: 'https://i.pravatar.cc/150?img=32' },
];

const M1Navigation = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bienvenue sur{'\n'}EASYART</Text>
        <Text style={styles.headerSubtitle}>Découvrez des talents extraordinaires</Text>
        <View style={styles.statsContainer}>
            <View style={styles.statItem}><Text style={styles.statNumber}>500+</Text><Text style={styles.statLabel}>Artistes</Text></View>
            <View style={styles.statItem}><Text style={styles.statNumber}>8</Text><Text style={styles.statLabel}>Catégories</Text></View>
            <View style={styles.statItem}><Text style={styles.statNumber}>1200+</Text><Text style={styles.statLabel}>Projets</Text></View>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Catégories artistiques</Text>
        <FlatList
          data={CATEGORIES}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.categoryCard}>
              <Ionicons name={item.icon} size={24} color={COLORS.primary} />
              <Text style={styles.categoryName}>{item.name}</Text>
              <Text style={styles.categoryCount}>{item.count} artistes</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Artistes recommandés</Text>
            <TouchableOpacity><Text style={styles.seeAll}>Voir tout</Text></TouchableOpacity>
          </View>
          {ARTISTS.map(artist => (
            <TouchableOpacity key={artist.id} style={styles.artistCard}>
                <Image source={{ uri: artist.image }} style={styles.artistImage} />
                <View style={styles.artistInfo}>
                    <Text style={styles.artistName}>{artist.name}</Text>
                    <Text style={styles.artistJob}>{artist.job}</Text>
                    <Text style={styles.artistLocation}><Ionicons name="location-sharp" size={14} /> {artist.location}</Text>
                </View>
                <View style={styles.artistRight}>
                    <View style={styles.rating}><Ionicons name="star" size={12} color="#FFD700"/><Text style={styles.ratingText}>{artist.rating}</Text></View>
                    <Text style={styles.artistPrice}>{artist.price}</Text>
                </View>
            </TouchableOpacity>
          ))}
      </View>
      
      <View style={styles.promoCard}>
        <Text style={styles.promoTitle}>Prêt à découvrir plus ?</Text>
        <Text style={styles.promoText}>Accédez à tous les profils d'artistes avec notre abonnement premium.</Text>
        <TouchableOpacity style={styles.promoButton}><Text style={styles.promoButtonText}>Découvrir Premium - 150 DA</Text></TouchableOpacity>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.gray },
  header: { backgroundColor: COLORS.primary, padding: 20, paddingTop: Platform.OS === 'android' ? 50 : 70, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  headerTitle: { fontSize: 28, color: COLORS.white, fontWeight: 'bold' },
  headerSubtitle: { fontSize: 16, color: COLORS.white, opacity: 0.8, marginTop: 5 },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 },
  statItem: { alignItems: 'center' },
  statNumber: { fontSize: 20, color: COLORS.white, fontWeight: 'bold' },
  statLabel: { fontSize: 14, color: COLORS.white, opacity: 0.8 },
  section: { marginTop: 25, paddingHorizontal: 20 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.black },
  seeAll: { color: COLORS.primary, fontSize: 14, fontWeight: '600' },
  categoryCard: { backgroundColor: COLORS.white, padding: 15, borderRadius: 15, alignItems: 'center', marginRight: 15, width: 110, marginTop: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2, },
  categoryName: { fontWeight: 'bold', marginTop: 10 },
  categoryCount: { fontSize: 12, color: COLORS.darkGray, marginTop: 2 },
  artistCard: { flexDirection: 'row', backgroundColor: COLORS.white, padding: 15, borderRadius: 15, marginTop: 15, alignItems: 'center' },
  artistImage: { width: 60, height: 60, borderRadius: 30 },
  artistInfo: { flex: 1, marginLeft: 15 },
  artistName: { fontSize: 16, fontWeight: 'bold' },
  artistJob: { fontSize: 14, color: COLORS.darkGray },
  artistLocation: { fontSize: 14, color: COLORS.darkGray, marginTop: 5 },
  artistRight: { alignItems: 'flex-end' },
  rating: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFBEA', paddingHorizontal: 6, paddingVertical: 3, borderRadius: 10, },
  ratingText: { marginLeft: 4, fontWeight: 'bold', fontSize: 12 },
  artistPrice: { marginTop: 8, fontWeight: 'bold', color: COLORS.primary },
  promoCard: { backgroundColor: COLORS.primaryLight, margin: 20, padding: 20, borderRadius: 20, alignItems: 'center', },
  promoTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.white },
  promoText: { color: COLORS.white, textAlign: 'center', opacity: 0.9, marginVertical: 10 },
  promoButton: { backgroundColor: COLORS.white, paddingVertical: 12, paddingHorizontal: 25, borderRadius: 25, marginTop: 10 },
  promoButtonText: { color: COLORS.primary, fontWeight: 'bold' },
});

export default M1Navigation;