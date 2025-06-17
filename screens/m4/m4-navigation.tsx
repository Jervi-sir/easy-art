import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../utils/constants/colors';
import { CardHorizontal1 } from '@components/cards/card-hotizontal-1';

const M4Navigation = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
            <View style={{ 
                padding: 20, 
                borderBottomWidth: 1, 
                borderBottomColor: COLORS.lightGray 
            }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Mes Favoris</Text>
                <Text style={{ fontSize: 16, color: COLORS.darkGray, marginTop: 5 }}>
                    4 artistes sauvegardés
                </Text>
            </View>
            
            <ScrollView contentContainerStyle={{ padding: 20 }}>
                <CardHorizontal1 
                    artist={{ 
                        id: '1', 
                        name: 'Yacine Messaoudi', 
                        job: 'Photographe mariage', 
                        rating: 4.8, 
                        price: '15,000 DA/event', 
                        date: '12 Juin 2025', 
                        image: 'https://i.pravatar.cc/150?img=1' ,
                        added_at: '12 Jan 2025'
                    }} 
                    deleteFunction={() => {}}
                />
            </ScrollView>
            
            <View style={{ 
                padding: 20, 
                borderTopWidth: 1, 
                borderTopColor: COLORS.lightGray 
            }}>
                <TouchableOpacity style={{ 
                    backgroundColor: COLORS.primary, 
                    padding: 18, 
                    borderRadius: 12, 
                    alignItems: 'center' 
                }}>
                    <Text style={{ color: COLORS.white, fontSize: 16, fontWeight: 'bold' }}>
                        Contacter tous
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ 
                    borderWidth: 1.5, 
                    borderColor: COLORS.primary, 
                    padding: 18, 
                    borderRadius: 12, 
                    alignItems: 'center', 
                    marginTop: 10 
                }}>
                    <Text style={{ color: COLORS.primary, fontSize: 16, fontWeight: 'bold' }}>
                        Comparer les profils
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default M4Navigation;