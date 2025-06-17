import { Feather, Ionicons } from '@expo/vector-icons';
import { COLORS } from '@utils/constants/colors';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

export const CardHorizontal1 = ({ artist, deleteFunction = undefined }: any) => {
  return (
    <>
      <TouchableOpacity key={artist.id} style={{
        position: 'relative',
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        padding: 15,
        borderRadius: 15,
        marginTop: 15,
        gap: 15,
        alignItems: 'flex-start',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
      }}>
        <View>
          <Image source={{ uri: artist.image }} style={{ width: 70, height: 70, borderRadius: 16 }} />
        </View>
        <View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{artist.name}</Text>
            <Text style={{ fontSize: 14, color: COLORS.darkGray }}>{artist.job}</Text>
          </View>
          <View style={{ alignItems: 'flex-end', flexDirection: 'row' }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#FFFBEA',
              paddingHorizontal: 6,
              paddingVertical: 3,
              borderRadius: 10
            }}>
              <Ionicons name="star" size={12} color={COLORS.gold} />
              <Text style={{ marginLeft: 4, fontWeight: 'bold', fontSize: 12 }}>{artist.rating}</Text>
            </View>
            <Text style={{ fontSize: 14, color: COLORS.darkGray, marginTop: 5 }}>
              <Ionicons name="location-sharp" size={14} /> {artist.location}
            </Text>
          </View>
          <Text style={{ marginTop: 8, fontWeight: 'bold', color: COLORS.primary }}>{artist.price}</Text>
          { artist.added_at
          && <Text style={{ marginTop: 4, fontSize: 13, fontWeight: 'semibold', color: COLORS.darkGray }}>Ajouté le {artist.added_at}</Text>
          }
        </View>
        {
          deleteFunction
          &&
            <TouchableOpacity 
            onPress={deleteFunction}
            style={{ 
              position: 'absolute',
              top: 16,
              right: 16
            }}
            hitSlop={{ bottom: 20, left: 20, right: 20, top: 20 }}
            >
              <Feather name="trash-2" size={24} color={COLORS.red} />
            </TouchableOpacity>
        }
      </TouchableOpacity>
    </>
  );
};