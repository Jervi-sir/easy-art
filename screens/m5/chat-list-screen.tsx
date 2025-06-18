import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '@utils/constants/colors';
import { Routes } from '@utils/constants/Routes';
import { useDataStore } from 'zustand/data.store';

const ChatListScreen = () => {
  const navigation: any = useNavigation();
  const { artists, chats } = useDataStore();
  const chatPartners = Object.keys(chats).map(artistId => {
    const artist = artists.find(a => a.id === artistId);
    const lastMessage = chats[artistId]?.[0];
    return { artist, lastMessage };
  }).filter(p => p.artist);

  const renderChatItem = ({ item }: any) => (
    <TouchableOpacity style={styles.chatItem} onPress={() => navigation.navigate(Routes.ChatScreen, { artist: item.artist })}>
      <Image source={{ uri: item.artist.image }} style={styles.avatar} />
      <View style={styles.chatPreview}>
        <Text style={styles.artistName}>{item.artist.name}</Text>
        <Text style={styles.lastMessage} numberOfLines={1}>{item.lastMessage?.text || '...'}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
      </View>
      <FlatList
        data={chatPartners}
        renderItem={renderChatItem}
        keyExtractor={(item: any) => item.artist.id}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { padding: 20, borderBottomWidth: 1, borderBottomColor: COLORS.lightGray },
  headerTitle: { fontSize: 24, fontWeight: 'bold' },
  chatItem: { flexDirection: 'row', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderBottomColor: COLORS.lightGray },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 15 },
  chatPreview: { flex: 1 },
  artistName: { fontSize: 16, fontWeight: 'bold' },
  lastMessage: { color: COLORS.darkGray, marginTop: 4 },
});

export default ChatListScreen;