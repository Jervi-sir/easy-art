import React, { useMemo } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@utils/constants/colors';
import { CardEvent } from '@components/cards/card-event';
import { useDataStore } from 'zustand/data.store';

const CategoryEventsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  // @ts-ignore
  const { categoryName } = route.params;

  const { events } = useDataStore();

  // Filter events based on the category name passed through navigation
  const filteredEvents = useMemo(() => {
    return events.filter(event => event.category === categoryName);
  }, [events, categoryName]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{categoryName}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.resultText}>
          {filteredEvents.length} {filteredEvents.length !== 1 ? 'événements trouvés' : 'événement trouvé'}
        </Text>

        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => <CardEvent key={event.id} event={event} />)
        ) : (
          <View style={styles.emptyView}>
            <Text style={styles.emptyText}>
              Aucun événement dans la catégorie "{categoryName}" pour le moment.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    paddingTop: Platform.OS === 'android' ? 40 : 10,
  },
  backButton: { padding: 5 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', marginLeft: 15 },
  scrollContainer: { padding: 20 },
  resultText: { fontSize: 16, color: COLORS.darkGray, marginBottom: 15 },
  emptyView: { marginTop: 50, alignItems: 'center' },
  emptyText: { textAlign: 'center', color: COLORS.darkGray, fontSize: 16 },
});

export default CategoryEventsScreen;