// M6Navigation.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, FlatList, SafeAreaView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

// Mock data for the creations list
const CREATIONS = [
  { id: '1', title: 'Portrait au fusain', date: '15 Jan 2025', likes: 24, image: 'https://images.unsplash.com/photo-1599749001385-e753366a15ec?w=500&q=80' },
  { id: '2', title: 'Paysage urbain', date: '12 Jan 2025', likes: 18, image: 'https://images.unsplash.com/photo-1519923834699-ef0b78f43147?w=500&q=80' },
  { id: '3', title: 'Nature morte', date: '10 Jan 2025', likes: 31, image: 'https://images.unsplash.com/photo-1579803815617-165b42828699?w=500&q=80' },
];

const COLORS = {
  primary: '#7B42F6', // Main purple
  lightPurple: '#E9E4F8',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#F4F5F7',
  darkGray: '#6C757D',
  lightGray: '#E9ECEF',
  red: '#DC3545',
};

const M6Navigation = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
                {/* --- Header --- */}
                <Text style={styles.headerTitle}>Mon Profil</Text>

                {/* --- Profile Card --- */}
                <View style={styles.card}>
                    <Image source={{ uri: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&q=80' }} style={styles.profileImage} />
                    <View style={styles.profileInfo}>
                        <Text style={styles.profileName}>Dada Narimane</Text>
                        <TouchableOpacity style={styles.upgradeButton}>
                            <MaterialCommunityIcons name="diamond-stone" size={14} color={COLORS.primary} />
                            <Text style={styles.upgradeText}>Upgrade</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.tag}>
                        <Text style={styles.tagText}>Artiste - Dessin</Text>
                    </View>
                    <View style={styles.contactDetails}>
                        <Text style={styles.emailText}>- dada.narimane@email.com</Text>
                        <Text style={styles.contactText}><Ionicons name="call-outline" size={14} /> +213 555 739 123</Text>
                        <Text style={styles.contactText}><Ionicons name="location-outline" size={14} /> Alger, Algérie</Text>
                    </View>
                </View>

                {/* --- Stats Section --- */}
                <View style={styles.statsContainer}>
                    <View style={styles.stat}><Text style={styles.statNumber}>15</Text><Text style={styles.statLabel}>Œuvres</Text></View>
                    <View style={styles.stat}><Text style={styles.statNumber}>73</Text><Text style={styles.statLabel}>Likes</Text></View>
                    <View style={styles.stat}><Text style={styles.statNumber}>4.9</Text><Text style={styles.statLabel}>Note</Text></View>
                </View>
                
                {/* --- Creations Section --- */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Mes dernières créations</Text>
                        <TouchableOpacity><Text style={styles.seeAllText}>Voir tout</Text></TouchableOpacity>
                    </View>
                    <FlatList
                        data={CREATIONS}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.creationCard}>
                                <Image source={{ uri: item.image }} style={styles.creationImage} />
                                <Text style={styles.creationTitle}>{item.title}</Text>
                                <View style={styles.creationFooter}>
                                    <Text style={styles.creationDate}>{item.date}</Text>
                                    <View style={styles.creationLikes}>
                                        <Ionicons name="star" size={14} color="#FFC700" />
                                        <Text style={styles.creationLikesText}>{item.likes}</Text>
                                    </View>
                                </View>
                            </View>
                        )}
                    />
                </View>

                {/* --- Menu Section --- */}
                <View style={styles.menuSection}>
                    <TouchableOpacity style={styles.menuItem}>
                        <MaterialCommunityIcons name="pencil-outline" size={24} color={COLORS.darkGray} />
                        <Text style={styles.menuItemText}>Modifier le profil</Text>
                        <Ionicons name="chevron-forward" size={22} color={COLORS.darkGray} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem}>
                        <MaterialCommunityIcons name="palette-swatch-outline" size={24} color={COLORS.darkGray} />
                        <Text style={styles.menuItemText}>Mes créations</Text>
                        <Ionicons name="chevron-forward" size={22} color={COLORS.darkGray} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem}>
                        <Ionicons name="settings-outline" size={24} color={COLORS.darkGray} />
                        <Text style={styles.menuItemText}>Paramètres</Text>
                        <Ionicons name="chevron-forward" size={22} color={COLORS.darkGray} />
                    </TouchableOpacity>
                </View>

                {/* --- Logout & Footer --- */}
                <TouchableOpacity style={styles.logoutButton}>
                    <Ionicons name="log-out-outline" size={22} color={COLORS.red} />
                    <Text style={styles.logoutButtonText}>Déconnexion</Text>
                </TouchableOpacity>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>EasyArt v1.0.0</Text>
                    <Text style={styles.footerText}>© 2025 EasyArt. Tous droits réservés.</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: COLORS.gray },
    container: { flex: 1 },
    headerTitle: { fontSize: 24, fontWeight: 'bold', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10 },
    card: { backgroundColor: COLORS.white, marginHorizontal: 20, borderRadius: 20, padding: 20, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 },
    profileImage: { width: 80, height: 80, borderRadius: 40 },
    profileInfo: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
    profileName: { fontSize: 22, fontWeight: 'bold', marginRight: 10 },
    upgradeButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.lightPurple, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 15 },
    upgradeText: { color: COLORS.primary, fontWeight: 'bold', marginLeft: 5 },
    tag: { backgroundColor: COLORS.lightPurple, paddingHorizontal: 15, paddingVertical: 5, borderRadius: 15, marginTop: 10 },
    tagText: { color: COLORS.primary, fontWeight: 'bold' },
    contactDetails: { marginTop: 15, alignItems: 'center' },
    emailText: { color: COLORS.darkGray, fontSize: 14, marginBottom: 8 },
    contactText: { color: COLORS.darkGray, fontSize: 14, marginBottom: 8, textAlign: 'center' },
    statsContainer: { flexDirection: 'row', justifyContent: 'space-around', marginHorizontal: 20, marginTop: 15 },
    stat: { backgroundColor: COLORS.white, flex: 1, alignItems: 'center', padding: 20, borderRadius: 15, marginHorizontal: 5, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 },
    statNumber: { fontSize: 22, fontWeight: 'bold', color: COLORS.primary },
    statLabel: { fontSize: 14, color: COLORS.darkGray, marginTop: 5 },
    section: { marginTop: 30 },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 15 },
    sectionTitle: { fontSize: 20, fontWeight: 'bold' },
    seeAllText: { color: COLORS.primary, fontWeight: '600' },
    creationCard: { backgroundColor: COLORS.white, borderRadius: 15, marginLeft: 20, width: 160, overflow: 'hidden', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 },
    creationImage: { width: '100%', height: 120 },
    creationTitle: { fontWeight: 'bold', fontSize: 15, paddingHorizontal: 10, paddingTop: 10 },
    creationFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 },
    creationDate: { fontSize: 12, color: COLORS.darkGray },
    creationLikes: { flexDirection: 'row', alignItems: 'center' },
    creationLikesText: { fontSize: 12, color: COLORS.darkGray, marginLeft: 4, fontWeight: 'bold' },
    menuSection: { marginTop: 30, marginHorizontal: 20, backgroundColor: COLORS.white, borderRadius: 15, padding: 10 },
    menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 10 },
    menuItemText: { flex: 1, marginLeft: 15, fontSize: 16, fontWeight: '500' },
    logoutButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginHorizontal: 20, marginTop: 20, backgroundColor: '#FFE5E5', padding: 15, borderRadius: 15 },
    logoutButtonText: { color: COLORS.red, fontSize: 16, fontWeight: 'bold', marginLeft: 10 },
    footer: { alignItems: 'center', marginTop: 30, paddingBottom: 20 },
    footerText: { color: COLORS.darkGray, fontSize: 12 },
});

export default M6Navigation;