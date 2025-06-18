import React from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../utils/constants/colors';
import { CardHorizontal1 } from '@components/cards/card-hotizontal-1';
import { LinearGradient } from 'expo-linear-gradient';
import { useDataStore } from 'zustand/data.store';
import { useAuthStore } from 'zustand/auth.store';
import { Routes } from '@utils/constants/Routes';
import { useNavigation } from '@react-navigation/native';

const M1Navigation = () => {
  const { categories, artists } = useDataStore();
  const { user } = useAuthStore();
  const recommendedArtists = artists.slice(0, 3);
  const navigation: any = useNavigation();
  return (
    <ScrollView bounces={false} showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: COLORS.gray }}>
      <LinearGradient
        colors={[COLORS.primary, COLORS.primaryLight]}
        style={{ paddingTop: 20, paddingBottom: 50, paddingHorizontal: 30 }}
      >
        <Text style={{ fontSize: 20, color: COLORS.white }}>Bienvenue sur</Text>
        <Text style={{ fontSize: 28, color: COLORS.white, fontWeight: 'bold' }}>EASYART</Text>
        <Text style={{ fontSize: 16, color: COLORS.white, opacity: 0.8, marginTop: 5 }}>Découvrez des talents extraordinaires</Text>
      </LinearGradient>

      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <View style={{
          flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 20, paddingVertical: 16, paddingHorizontal: 20,
          marginTop: -30, backgroundColor: COLORS.white, borderRadius: 16,
          shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05,
        }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 20, color: COLORS.black, fontWeight: 'bold' }}>{artists.length}+</Text>
            <Text style={{ fontSize: 14, color: COLORS.black, opacity: 0.8 }}>Artistes</Text>
          </View>
          <View style={{ width: 1, height: 40, backgroundColor: COLORS.primaryLight, opacity: 0.6 }} />
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 20, color: COLORS.black, fontWeight: 'bold' }}>{categories.length}</Text>
            <Text style={{ fontSize: 14, color: COLORS.black, opacity: 0.8 }}>Catégories</Text>
          </View>
          <View style={{ width: 1, height: 40, backgroundColor: COLORS.primaryLight, opacity: 0.6 }} />
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 20, color: COLORS.black, fontWeight: 'bold' }}>1200+</Text>
            <Text style={{ fontSize: 14, color: COLORS.black, opacity: 0.8 }}>Projets</Text>
          </View>
        </View>
      </View>

      <View style={{ marginTop: 25, }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', paddingHorizontal: 20 , color: COLORS.black }}>Catégories artistiques</Text>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                padding: 8, borderRadius: 15, alignItems: 'center', marginTop: 10,
                shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 5,
                elevation: 3, 
              }} 
              onPress={() => navigation.navigate(Routes.CategoryEventsScreen, { categoryName: item.name })}
            >
              <View style={{
                backgroundColor: item.color, width: 60, height: 60, borderRadius: 12,
                justifyContent: 'center', alignItems: 'center',
              }}>
                <Ionicons name={item.icon as any} size={24} color={COLORS.white} />
              </View>
              <Text style={{ fontWeight: 'bold', marginTop: 10, fontSize: 14, }}>{item.name}</Text>
              <Text style={{ fontSize: 12, color: COLORS.darkGray, marginTop: 2, }}>{item.count} artistes</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={{ marginTop: 25, paddingHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.black }}>Artistes recommandés</Text>
          <TouchableOpacity>
            <Text style={{ color: COLORS.primary, fontSize: 14, fontWeight: '600' }}>Voir tout</Text>
          </TouchableOpacity>
        </View>
        {recommendedArtists.map(artist => (
          <CardHorizontal1 key={artist.id} artist={artist} />
        ))}
      </View>

      {!user?.isPremium && (
        <View style={{ backgroundColor: COLORS.primaryLight, margin: 20, padding: 20, borderRadius: 20, alignItems: 'center' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLORS.white }}>Prêt à découvrir plus ?</Text>
          <Text style={{ color: COLORS.white, textAlign: 'center', opacity: 0.9, marginVertical: 10 }}>
            Accédez à tous les profils d'artistes avec notre abonnement premium.
          </Text>
          <TouchableOpacity style={{ backgroundColor: COLORS.white, paddingVertical: 12, paddingHorizontal: 25, borderRadius: 25, marginTop: 10 }}>
            <Text style={{ color: COLORS.primary, fontWeight: 'bold' }}>Découvrir Premium - 150 DA</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

export default M1Navigation;