// M4Navigation.js
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../utils/constants/colors';

const FavoriteCard = ({ item }) => (
    <View style={styles.favCard}>
        <Image source={{ uri: item.image }} style={styles.favImage} />
        <View style={styles.favInfo}>
            <Text style={styles.favName}>{item.name}</Text>
            <Text style={styles.favJob}>{item.job}</Text>
            <View style={styles.favRatingPrice}>
                <View style={styles.rating}>
                    <Ionicons name="star" size={14} color="#FFD700" />
                    <Text style={styles.ratingText}>{item.rating}</Text>
                </View>
                <Text style={styles.favPrice}>{item.price}</Text>
            </View>
        </View>
        <Text style={styles.favDate}>Ajouté le {item.date}</Text>
    </View>
);

const M4Navigation = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Mes Favoris</Text>
                <Text style={styles.subtitle}>4 artistes sauvegardés</Text>
            </View>
            <ScrollView contentContainerStyle={styles.list}>
                <FavoriteCard item={{ id: '1', name: 'Yacine Messaoudi', job: 'Photographe mariage', rating: 4.8, price: '15,000 DA/event', date: '12 Juin 2025', image: 'https://i.pravatar.cc/150?img=1' }}/>
                {/* ... Add more FavoriteCard components */}
            </ScrollView>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.primaryButton}>
                    <Text style={styles.primaryButtonText}>Contacter tous</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.secondaryButton}>
                    <Text style={styles.secondaryButtonText}>Comparer les profils</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};
// ... Add StyleSheet below
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.white },
    header: { padding: 20, borderBottomWidth: 1, borderBottomColor: COLORS.lightGray },
    title: { fontSize: 24, fontWeight: 'bold' },
    subtitle: { fontSize: 16, color: COLORS.darkGray, marginTop: 5 },
    list: { padding: 20 },
    favCard: { backgroundColor: COLORS.white, borderRadius: 15, padding: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 3, },
    favImage: { width: '100%', height: 150, borderRadius: 10 },
    favInfo: { paddingVertical: 15 },
    favName: { fontSize: 18, fontWeight: 'bold' },
    favJob: { fontSize: 14, color: COLORS.darkGray, marginTop: 4 },
    favRatingPrice: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
    rating: { flexDirection: 'row', alignItems: 'center' },
    ratingText: { marginLeft: 5, fontWeight: 'bold' },
    favPrice: { fontWeight: 'bold', fontSize: 16, color: COLORS.primary },
    favDate: { fontSize: 12, color: COLORS.darkGray, borderTopWidth: 1, borderTopColor: COLORS.lightGray, paddingTop: 10, textAlign: 'right' },
    footer: { padding: 20, borderTopWidth: 1, borderTopColor: COLORS.lightGray },
    primaryButton: { backgroundColor: COLORS.primary, padding: 18, borderRadius: 12, alignItems: 'center' },
    primaryButtonText: { color: COLORS.white, fontSize: 16, fontWeight: 'bold' },
    secondaryButton: { borderWidth: 1.5, borderColor: COLORS.primary, padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 10 },
    secondaryButtonText: { color: COLORS.primary, fontSize: 16, fontWeight: 'bold' },
});

export default M4Navigation;