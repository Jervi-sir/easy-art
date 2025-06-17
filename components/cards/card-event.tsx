import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '@utils/constants/colors';
import { Routes } from '@utils/constants/Routes';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

export const CardEvent = ({ event }: any) => {
  const navigation: any = useNavigation();
  return (
    <View style={{
      backgroundColor: COLORS.white,
      borderRadius: 20,
      overflow: 'hidden',
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
    }}>
      <Image source={{ uri: event.image }} style={{ width: '100%', height: 180 }} />
      <View style={{ padding: 20 }}>
        <View style={{ 
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start' 
        }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', flex: 1 }}>{event.title}</Text>
          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center', 
            backgroundColor: '#FFFBEA', 
            paddingHorizontal: 8, 
            paddingVertical: 4, 
            borderRadius: 12 
          }}>
            <Feather name="star" size={16} color="#FFC700" />
            <Text style={{ marginLeft: 5, fontWeight: 'bold' }}>{event.rating}</Text>
          </View>
        </View>
        <Text style={{ 
          fontSize: 14, 
          color: COLORS.darkGray, 
          marginTop: 8, 
          lineHeight: 20 
        }}>{event.description}</Text>
        <View style={{ 
          marginTop: 20, 
          borderTopWidth: 1, 
          borderTopColor: COLORS.lightGray, 
          paddingTop: 15 
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <Ionicons name="calendar-outline" size={18} color={COLORS.darkGray} />
            <Text style={{ marginLeft: 10, fontSize: 14, color: COLORS.darkGray }}>{event.date}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <Ionicons name="time-outline" size={18} color={COLORS.darkGray} />
            <Text style={{ marginLeft: 10, fontSize: 14, color: COLORS.darkGray }}>{event.time}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <Ionicons name="location-outline" size={18} color={COLORS.darkGray} />
            <Text style={{ marginLeft: 10, fontSize: 14, color: COLORS.darkGray }}>{event.location}</Text>
          </View>
        </View>
        <View style={{ 
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginTop: 10 
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="people-outline" size={20} color={COLORS.primary} />
            <Text style={{ marginLeft: 8, fontSize: 14, fontWeight: '500', color: COLORS.primary }}>
              {event.participants}/{event.maxParticipants} participants
            </Text>
          </View>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.orange }}>
            {event.price}
          </Text>
        </View>
        <TouchableOpacity style={{ 
          backgroundColor: COLORS.primary, 
          padding: 15, 
          borderRadius: 15, 
          alignItems: 'center', 
          marginTop: 20 
        }}
          onPress={() => navigation.navigate(Routes.JoinEvent)}
        >
          <Text style={{ color: COLORS.white, fontSize: 16, fontWeight: 'bold' }}>
            S'inscrire
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};