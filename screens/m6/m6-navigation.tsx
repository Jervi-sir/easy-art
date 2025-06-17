import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, FlatList, SafeAreaView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '@utils/constants/colors';
import { Routes } from '@utils/constants/Routes';
import { useNavigation } from '@react-navigation/native';

const CREATIONS = [
  { id: '1', title: 'Portrait au fusain', date: '15 Jan 2025', likes: 24, image: 'https://images.unsplash.com/photo-1599749001385-e753366a15ec?w=500&q=80' },
  { id: '2', title: 'Paysage urbain', date: '12 Jan 2025', likes: 18, image: 'https://images.unsplash.com/photo-1519923834699-ef0b78f43147?w=500&q=80' },
  { id: '3', title: 'Nature morte', date: '10 Jan 2025', likes: 31, image: 'https://images.unsplash.com/photo-1579803815617-165b42828699?w=500&q=80' },
];

const M6Navigation = () => {
  const navigation: any = useNavigation();
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Header */}
        <Text style={{ fontSize: 24, fontWeight: 'bold', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10 }}>
          Mon Profil
        </Text>

        {/* Profile Card */}
        <View style={{
          backgroundColor: COLORS.white,
          marginHorizontal: 20,
          borderRadius: 20,
          padding: 20,
          alignItems: 'center',
          shadowColor: '#000',
          shadowOpacity: 0.05,
          shadowRadius: 10,
          elevation: 3
        }}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&q=80' }}
            style={{ width: 80, height: 80, borderRadius: 40 }}
          />
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', marginRight: 10 }}>Dada Narimane</Text>
            <TouchableOpacity style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: COLORS.lightPurple,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 15
            }}>
              <MaterialCommunityIcons name="diamond-stone" size={14} color={COLORS.primary} />
              <Text style={{ color: COLORS.primary, fontWeight: 'bold', marginLeft: 5 }}>Upgrade</Text>
            </TouchableOpacity>
          </View>
          <View style={{
            backgroundColor: COLORS.lightPurple,
            paddingHorizontal: 15,
            paddingVertical: 5,
            borderRadius: 15,
            marginTop: 10
          }}>
            <Text style={{ color: COLORS.primary, fontWeight: 'bold' }}>Artiste - Dessin</Text>
          </View>
          <View style={{ marginTop: 15, alignItems: 'center' }}>
            <Text style={{ color: COLORS.darkGray, fontSize: 14, marginBottom: 8 }}>
              - dada.narimane@email.com
            </Text>
            <Text style={{ color: COLORS.darkGray, fontSize: 14, marginBottom: 8 }}>
              <Ionicons name="call-outline" size={14} /> +213 555 739 123
            </Text>
            <Text style={{ color: COLORS.darkGray, fontSize: 14, marginBottom: 8 }}>
              <Ionicons name="location-outline" size={14} /> Alger, Algérie
            </Text>
          </View>
        </View>

        {/* Stats Section */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginHorizontal: 20,
          marginTop: 15
        }}>
          <View style={{
            backgroundColor: COLORS.white,
            flex: 1,
            alignItems: 'center',
            padding: 20,
            borderRadius: 15,
            marginHorizontal: 5,
            shadowColor: '#000',
            shadowOpacity: 0.05,
            shadowRadius: 10,
            elevation: 3
          }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: COLORS.primary }}>15</Text>
            <Text style={{ fontSize: 14, color: COLORS.darkGray, marginTop: 5 }}>Œuvres</Text>
          </View>
          <View style={{
            backgroundColor: COLORS.white,
            flex: 1,
            alignItems: 'center',
            padding: 20,
            borderRadius: 15,
            marginHorizontal: 5,
            shadowColor: '#000',
            shadowOpacity: 0.05,
            shadowRadius: 10,
            elevation: 3
          }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: COLORS.primary }}>73</Text>
            <Text style={{ fontSize: 14, color: COLORS.darkGray, marginTop: 5 }}>Likes</Text>
          </View>
          <View style={{
            backgroundColor: COLORS.white,
            flex: 1,
            alignItems: 'center',
            padding: 20,
            borderRadius: 15,
            marginHorizontal: 5,
            shadowColor: '#000',
            shadowOpacity: 0.05,
            shadowRadius: 10,
            elevation: 3
          }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: COLORS.primary }}>4.9</Text>
            <Text style={{ fontSize: 14, color: COLORS.darkGray, marginTop: 5 }}>Note</Text>
          </View>
        </View>

        {/* Creations Section */}
        <View style={{ marginTop: 30 }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
            marginBottom: 15
          }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Mes dernières créations</Text>
            <TouchableOpacity>
              <Text style={{ color: COLORS.primary, fontWeight: '600' }}>Voir tout</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={CREATIONS}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={{
                backgroundColor: COLORS.white,
                borderRadius: 15,
                marginLeft: 20,
                width: 160,
                overflow: 'hidden',
                shadowColor: '#000',
                shadowOpacity: 0.05,
                shadowRadius: 10,
                elevation: 3
              }}>
                <Image source={{ uri: item.image }} style={{ width: '100%', height: 120 }} />
                <Text style={{ fontWeight: 'bold', fontSize: 15, paddingHorizontal: 10, paddingTop: 10 }}>
                  {item.title}
                </Text>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 10
                }}>
                  <Text style={{ fontSize: 12, color: COLORS.darkGray }}>{item.date}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name="star" size={14} color="#FFC700" />
                    <Text style={{ fontSize: 12, color: COLORS.darkGray, marginLeft: 4, fontWeight: 'bold' }}>
                      {item.likes}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          />
        </View>

        {/* Menu Section */}
        <View style={{
          marginTop: 30,
          marginHorizontal: 20,
          backgroundColor: COLORS.white,
          borderRadius: 15,
          padding: 10
        }}>
          <TouchableOpacity style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 15,
            paddingHorizontal: 10
          }}>
            <MaterialCommunityIcons name="pencil-outline" size={24} color={COLORS.primary} />
            <Text style={{ flex: 1, marginLeft: 15, fontSize: 16, fontWeight: '500' }}>
              Modifier le profil
            </Text>
            <Ionicons name="chevron-forward" size={22} color={COLORS.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 15,
            paddingHorizontal: 10
          }}>
            <MaterialCommunityIcons name="palette-swatch-outline" size={24} color={COLORS.primary} />
            <Text style={{ flex: 1, marginLeft: 15, fontSize: 16, fontWeight: '500' }}>
              Mes créations
            </Text>
            <Ionicons name="chevron-forward" size={22} color={COLORS.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 15,
            paddingHorizontal: 10
          }}
            onPress={() => navigation.navigate(Routes.SettingsScreen)}
          >
            <Ionicons name="settings-outline" size={24} color={COLORS.primary} />
            <Text style={{ flex: 1, marginLeft: 15, fontSize: 16, fontWeight: '500' }}>
              Paramètres
            </Text>
            <Ionicons name="chevron-forward" size={22} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        {/* Logout & Footer */}
        <TouchableOpacity style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: 20,
          marginTop: 20,
          backgroundColor: '#FFE5E5',
          padding: 15,
          borderRadius: 15
        }}>
          <Ionicons name="log-out-outline" size={22} color={COLORS.red} />
          <Text style={{ color: COLORS.red, fontSize: 16, fontWeight: 'bold', marginLeft: 10 }}>
            Déconnexion
          </Text>
        </TouchableOpacity>

        <View style={{ alignItems: 'center', marginTop: 30, paddingBottom: 20 }}>
          <Text style={{ color: COLORS.darkGray, fontSize: 12 }}>EasyArt v1.0.0</Text>
          <Text style={{ color: COLORS.darkGray, fontSize: 12 }}>
            © 2025 EasyArt. Tous droits réservés.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default M6Navigation;