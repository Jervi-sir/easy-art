// M2Navigation.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../utils/constants/colors';

const FILTERS = ['Tout', 'Art Visuel', 'Photographie', 'Musique'];
const SearchResult = ({item}) => (
    <TouchableOpacity style={styles.resultCard}>
        <Image source={{ uri: item.image }} style={styles.resultImage} />
        <View style={styles.resultInfo}>
            <Text style={styles.resultName}>{item.name}</Text>
            <Text style={styles.resultJob}>{item.job}</Text>
             <Text style={styles.resultLocation}><Ionicons name="location-sharp" size={14} /> {item.location}</Text>
        </View>
        <View style={styles.resultRight}>
            <View style={styles.rating}><Ionicons name="star" size={12} color="#FFD700"/><Text style={styles.ratingText}>{item.rating}</Text></View>
            <Text style={styles.resultPrice}>{item.price}</Text>
        </View>
    </TouchableOpacity>
);

const M2Navigation = () => {
    const [activeFilter, setActiveFilter] = useState('Tout');
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.title}>Rechercher des talents</Text>
                    <Text style={styles.subtitle}>Trouvez l'artiste parfait pour votre projet</Text>
                </View>
                <View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterContainer}>
                        {FILTERS.map(filter => (
                            <TouchableOpacity key={filter} onPress={() => setActiveFilter(filter)} style={[styles.chip, activeFilter === filter && styles.activeChip]}>
                                <Text style={[styles.chipText, activeFilter === filter && styles.activeChipText]}>{filter}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
                <Text style={styles.resultCount}>1 résultat trouvé</Text>
                <View style={styles.resultsList}>
                    <SearchResult item={{ id: '1', name: 'Salim Meharzi', job: 'Guitariste & Compositeur', rating: 4.9, location: 'Alger', price: '3,500 DA/h', image: 'https://i.pravatar.cc/150?img=12' }}/>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
// ... Add StyleSheet below
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.white },
    header: { padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold' },
    subtitle: { fontSize: 16, color: COLORS.darkGray, marginTop: 5 },
    filterContainer: { paddingHorizontal: 20, paddingVertical: 10 },
    chip: { backgroundColor: COLORS.gray, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, marginRight: 10 },
    activeChip: { backgroundColor: COLORS.primary },
    chipText: { fontWeight: '600' },
    activeChipText: { color: COLORS.white },
    resultCount: { paddingHorizontal: 20, color: COLORS.darkGray, marginTop: 10 },
    resultsList: { padding: 20 },
    resultCard: { flexDirection: 'row', backgroundColor: COLORS.gray, padding: 15, borderRadius: 15, alignItems: 'center' },
    resultImage: { width: 60, height: 60, borderRadius: 10 },
    resultInfo: { flex: 1, marginLeft: 15 },
    resultName: { fontSize: 16, fontWeight: 'bold' },
    resultJob: { fontSize: 14, color: COLORS.darkGray },
    resultLocation: { fontSize: 14, color: COLORS.darkGray, marginTop: 5 },
    resultRight: { alignItems: 'flex-end' },
    rating: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, paddingHorizontal: 6, paddingVertical: 3, borderRadius: 10, },
    ratingText: { marginLeft: 4, fontWeight: 'bold', fontSize: 12 },
    resultPrice: { marginTop: 8, fontWeight: 'bold', color: COLORS.primary },
});

export default M2Navigation;