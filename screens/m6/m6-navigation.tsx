import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, FlatList, SafeAreaView, StyleSheet, Alert } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '@utils/constants/colors';
import { Routes } from '@utils/constants/Routes';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from 'zustand/auth.store';
import { useDataStore } from 'zustand/data.store';

const M6Navigation = () => {
    const navigation: any = useNavigation();
    // Get state and actions from the stores
    const { user, logout } = useAuthStore();
    const { creations } = useDataStore();

    // --- Memoize stat calculations for performance ---
    const totalLikes = useMemo(() => {
        return creations.reduce((sum, item) => sum + item.likes, 0);
    }, [creations]);

    // --- Functional Logout Handler ---
    const handleLogout = () => {
        Alert.alert(
            "Déconnexion",
            "Êtes-vous sûr de vouloir vous déconnecter ?",
            [
                { text: "Annuler", style: "cancel" },
                { text: "Oui", onPress: () => logout() }
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                <Text style={styles.screenTitle}>Mon Profil</Text>

                {/* --- DYNAMIC Profile Card --- */}
                <View style={styles.card}>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&q=80' }}
                        style={styles.profileImage}
                    />
                    <View style={styles.nameContainer}>
                        <Text style={styles.userName}>{user?.fullName}</Text>
                        {/* Show upgrade button only if user is not premium */}
                        {!user?.isPremium && (
                            <TouchableOpacity
                                style={styles.upgradeButton}
                                onPress={() => navigation.navigate(Routes.M5)}
                            >
                                <MaterialCommunityIcons name="diamond-stone" size={14} color={COLORS.primary} />
                                <Text style={styles.upgradeText}>Upgrade</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={styles.tag}>
                        <Text style={styles.tagText}>Artiste - Dessin</Text>
                    </View>
                    <View style={styles.contactInfo}>
                        <Text style={styles.contactText}><Ionicons name="mail-outline" size={14} /> {user?.email}</Text>
                        <Text style={styles.contactText}><Ionicons name="call-outline" size={14} /> {user?.phoneNumber}</Text>
                        <Text style={styles.contactText}><Ionicons name="location-outline" size={14} /> {user?.address}</Text>
                    </View>
                </View>

                {/* --- DYNAMIC Stats Section --- */}
                <View style={styles.statsContainer}>
                    <View style={styles.statBox}>
                        <Text style={styles.statNumber}>{creations.length}</Text>
                        <Text style={styles.statLabel}>Œuvres</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statNumber}>{totalLikes}</Text>
                        <Text style={styles.statLabel}>Likes</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statNumber}>4.9</Text>
                        <Text style={styles.statLabel}>Note</Text>
                    </View>
                </View>

                {/* --- DYNAMIC Creations Section --- */}
                <View style={{ marginTop: 30 }}>
                    <View style={styles.creationsHeader}>
                        <Text style={styles.sectionTitle}>Mes dernières créations</Text>
                        <TouchableOpacity>
                            <Text style={styles.viewAllText}>Voir tout</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={creations} // Use data from the store
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.creationCard}>
                                <Image source={{ uri: item.image }} style={styles.creationImage} />
                                <Text style={styles.creationTitle}>{item.title}</Text>
                                <View style={styles.creationFooter}>
                                    <Text style={styles.creationDate}>{item.date}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Ionicons name="star" size={14} color="#FFC700" />
                                        <Text style={styles.creationLikes}>{item.likes}</Text>
                                    </View>
                                </View>
                            </View>
                        )}
                        ListEmptyComponent={<Text style={{marginLeft: 20, color: COLORS.darkGray}}>Aucune création à afficher.</Text>}
                    />
                </View>

                {/* --- Menu Section --- */}
                <View style={styles.menuContainer}>
                    <TouchableOpacity style={styles.menuRow} onPress={() => Alert.alert("Prochainement", "La modification du profil sera bientôt disponible.")}>
                        <MaterialCommunityIcons name="pencil-outline" size={24} color={COLORS.primary} />
                        <Text style={styles.menuText}>Modifier le profil</Text>
                        <Ionicons name="chevron-forward" size={22} color={COLORS.primary} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuRow} onPress={() => navigation.navigate(Routes.SettingsScreen)}>
                        <Ionicons name="settings-outline" size={24} color={COLORS.primary} />
                        <Text style={styles.menuText}>Paramètres</Text>
                        <Ionicons name="chevron-forward" size={22} color={COLORS.primary} />
                    </TouchableOpacity>
                </View>

                {/* --- FUNCTIONAL Logout Button --- */}
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Ionicons name="log-out-outline" size={22} color={COLORS.red} />
                    <Text style={styles.logoutText}>Déconnexion</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    screenTitle: { fontSize: 24, fontWeight: 'bold', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10 },
    card: { backgroundColor: COLORS.white, marginHorizontal: 20, borderRadius: 20, padding: 20, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 },
    profileImage: { width: 80, height: 80, borderRadius: 40 },
    nameContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
    userName: { fontSize: 22, fontWeight: 'bold', marginRight: 10 },
    upgradeButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.lightPurple, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 15 },
    upgradeText: { color: COLORS.primary, fontWeight: 'bold', marginLeft: 5 },
    tag: { backgroundColor: COLORS.lightPurple, paddingHorizontal: 15, paddingVertical: 5, borderRadius: 15, marginTop: 10 },
    tagText: { color: COLORS.primary, fontWeight: 'bold' },
    contactInfo: { marginTop: 15, alignItems: 'center' },
    contactText: { color: COLORS.darkGray, fontSize: 14, marginBottom: 8 },
    statsContainer: { flexDirection: 'row', justifyContent: 'space-around', marginHorizontal: 20, marginTop: 15, gap: 10 },
    statBox: { backgroundColor: COLORS.white, flex: 1, alignItems: 'center', padding: 20, borderRadius: 15, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 },
    statNumber: { fontSize: 22, fontWeight: 'bold', color: COLORS.primary },
    statLabel: { fontSize: 14, color: COLORS.darkGray, marginTop: 5 },
    creationsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 15 },
    sectionTitle: { fontSize: 20, fontWeight: 'bold' },
    viewAllText: { color: COLORS.primary, fontWeight: '600' },
    creationCard: { backgroundColor: COLORS.white, borderRadius: 15, marginLeft: 20, width: 160, overflow: 'hidden', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 },
    creationImage: { width: '100%', height: 120 },
    creationTitle: { fontWeight: 'bold', fontSize: 15, paddingHorizontal: 10, paddingTop: 10 },
    creationFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 },
    creationDate: { fontSize: 12, color: COLORS.darkGray },
    creationLikes: { fontSize: 12, color: COLORS.darkGray, marginLeft: 4, fontWeight: 'bold' },
    menuContainer: { marginTop: 30, marginHorizontal: 20, backgroundColor: COLORS.white, borderRadius: 15, padding: 10 },
    menuRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 10 },
    menuText: { flex: 1, marginLeft: 15, fontSize: 16, fontWeight: '500' },
    logoutButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginHorizontal: 20, marginTop: 20, backgroundColor: '#FFE5E5', padding: 15, borderRadius: 15 },
    logoutText: { color: COLORS.red, fontSize: 16, fontWeight: 'bold', marginLeft: 10 },
});

export default M6Navigation;