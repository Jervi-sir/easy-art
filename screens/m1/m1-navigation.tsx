import React from 'react';
import { View, Text, ScrollView, FlatList, Image, Platform, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../utils/constants/colors';
import { CardHorizontal1 } from '@components/cards/card-hotizontal-1';
import { LinearGradient } from 'expo-linear-gradient';

const CATEGORIES = [
  { id: '1', name: 'Musique', icon: 'musical-notes', count: 143, color: '#F06060' },
  { id: '2', name: 'Art Visuel', icon: 'color-palette', count: 89, color: '#9C75F6' },
  { id: '3', name: 'Photographie', icon: 'camera', count: 67, color: '#39C596' },
  { id: '4', name: 'Cinéma', icon: 'film', count: 45, color: '#7B3ED2' },
];

const ARTISTS = [
  { id: '1', name: 'Amina Belkacem', job: 'Artiste peintre', rating: 4.8, location: 'Alger', price: '2,500 DA/h', image: 'https://i.pravatar.cc/150?img=25' },
  { id: '2', name: 'Yacine Messaoudi', job: 'Photographe mariage', rating: 4.8, location: 'Oran', price: '15,000 DA/event', image: 'https://i.pravatar.cc/150?img=1' },
  { id: '3', name: 'Fatima Zerouki', job: 'Chef pâtissière', rating: 4.9, location: 'Constantine', price: '3,000 DA/h', image: 'https://i.pravatar.cc/150?img=32' },
];

const M1Navigation = () => {
  return (
    <ScrollView bounces={false} showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: COLORS.gray }}>

      <LinearGradient
        colors={[COLORS.primary, COLORS.primaryLight]}
        style={{
          paddingTop: 20,
          paddingBottom: 50,
          paddingHorizontal: 30,
        }}
      >
        <Text style={{ fontSize: 20, color: COLORS.white, }}>Bienvenue sur</Text>
        <Text style={{ fontSize: 28, color: COLORS.white, fontWeight: 'bold' }}>EASYART</Text>
        <Text style={{ fontSize: 16, color: COLORS.white, opacity: 0.8, marginTop: 5 }}>Découvrez des talents extraordinaires</Text>
      </LinearGradient>

      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <View style={{
          flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 20, paddingVertical: 16, paddingHorizontal: 20,
          marginTop: -30,
          backgroundColor: COLORS.white, borderRadius: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,

        }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 20, color: COLORS.black, fontWeight: 'bold' }}>500+</Text>
            <Text style={{ fontSize: 14, color: COLORS.black, opacity: 0.8 }}>Artistes</Text>
          </View>
          <View style={{ width: 1, height: 40, backgroundColor: COLORS.primaryLight, opacity: 0.6 }} />
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 20, color: COLORS.black, fontWeight: 'bold' }}>8</Text>
            <Text style={{ fontSize: 14, color: COLORS.black, opacity: 0.8 }}>Catégories</Text>
          </View>
          <View style={{ width: 1, height: 40, backgroundColor: COLORS.primaryLight, opacity: 0.6 }} />
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 20, color: COLORS.black, fontWeight: 'bold' }}>1200+</Text>
            <Text style={{ fontSize: 14, color: COLORS.black, opacity: 0.8 }}>Projets</Text>
          </View>
        </View>
      </View>


      <View style={{ marginTop: 25, paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.black }}>Catégories artistiques</Text>
        <FlatList
          data={CATEGORIES}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={{
              padding: 15,
              borderRadius: 15,
              alignItems: 'center',
              marginRight: 15,
              marginTop: 10,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 5,
              elevation: 2
            }}>
              <View style={{ width: 50, height: 50, borderRadius: 8, justifyContent: 'center', alignItems: 'center', backgroundColor: item.color }}>
                <Ionicons name={item.icon as any} size={24} color={COLORS.white} />
              </View>
              <Text style={{ fontWeight: 'bold', marginTop: 10 }}>{item.name}</Text>
              <Text style={{ fontSize: 12, color: COLORS.darkGray, marginTop: 2 }}>{item.count} artistes</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={{ marginTop: 25, paddingHorizontal: 20 }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.black }}>Artistes recommandés</Text>
          <TouchableOpacity>
            <Text style={{ color: COLORS.primary, fontSize: 14, fontWeight: '600' }}>Voir tout</Text>
          </TouchableOpacity>
        </View>
        {ARTISTS.map(artist => (
          <React.Fragment key={artist.id}>
            <CardHorizontal1 artist={artist} />
          </React.Fragment>
        ))}
      </View>

      <View style={{
        backgroundColor: COLORS.primaryLight,
        margin: 20,
        padding: 20,
        borderRadius: 20,
        alignItems: 'center'
      }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLORS.white }}>Prêt à découvrir plus ?</Text>
        <Text style={{ color: COLORS.white, textAlign: 'center', opacity: 0.9, marginVertical: 10 }}>
          Accédez à tous les profils d'artistes avec notre abonnement premium.
        </Text>
        <TouchableOpacity style={{
          backgroundColor: COLORS.white,
          paddingVertical: 12,
          paddingHorizontal: 25,
          borderRadius: 25,
          marginTop: 10
        }}>
          <Text style={{ color: COLORS.primary, fontWeight: 'bold' }}>Découvrir Premium - 150 DA</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default M1Navigation;