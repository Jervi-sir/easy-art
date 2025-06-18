import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, FlatList,
  StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@utils/constants/colors';
import { useDataStore } from 'zustand/data.store';

const ChatScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  // @ts-ignore
  const { artist } = route.params;

  const { chats, sendMessage } = useDataStore();
  const messages = chats[artist.id] || [];
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim().length > 0) {
      sendMessage(artist.id, text.trim());
      setText('');
    }
  };

  // @ts-ignore
  const renderMessage = ({ item }) => {
    const isMyMessage = item.user._id === 'currentUser';
    return (
      <View style={[styles.messageRow, isMyMessage ? styles.myMessageRow : styles.theirMessageRow]}>
        <View style={[styles.messageBubble, isMyMessage ? styles.myMessageBubble : styles.theirMessageBubble]}>
          <Text style={isMyMessage ? styles.myMessageText : styles.theirMessageText}>{item.text}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* --- Wrap the entire screen in KeyboardAvoidingView --- */}
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{artist.name}</Text>
        </View>

        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item._id.toString()}
          inverted
          style={styles.messageList}
          contentContainerStyle={{ paddingHorizontal: 10 }}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            placeholder="Écrivez votre message..."
            placeholderTextColor={COLORS.darkGray}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Ionicons name="send" size={22} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 15, borderBottomWidth: 1, borderBottomColor: COLORS.lightGray, backgroundColor: COLORS.background },
  headerTitle: { fontSize: 18, fontWeight: 'bold', marginLeft: 15 },
  messageList: { flex: 1, },
  inputContainer: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, borderTopWidth: 1, borderTopColor: COLORS.lightGray, backgroundColor: COLORS.white },
  input: { flex: 1, height: 44, backgroundColor: COLORS.gray, borderRadius: 22, paddingHorizontal: 18, fontSize: 16, },
  sendButton: { marginLeft: 10, backgroundColor: COLORS.primary, width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  messageRow: { flexDirection: 'row', marginVertical: 4, },
  myMessageRow: { justifyContent: 'flex-end', },
  theirMessageRow: { justifyContent: 'flex-start' },
  messageBubble: { paddingVertical: 10, paddingHorizontal: 15, borderRadius: 20, maxWidth: '75%', },
  myMessageBubble: { backgroundColor: COLORS.primary, borderBottomRightRadius: 5, },
  theirMessageBubble: { backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.lightGray, borderBottomLeftRadius: 5, },
  myMessageText: { color: COLORS.white, fontSize: 16, },
  theirMessageText: { color: COLORS.black, fontSize: 16, },
});

export default ChatScreen;