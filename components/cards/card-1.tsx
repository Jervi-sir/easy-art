import React from 'react';
import { Text, View } from 'react-native';

export const Card1 = () => {
  return (
    <View style={{ flexDirection: 'row', gap: 20, padding: 20, backgroundColor: 'beige', borderRadius: 10, overflow: 'hidden' }}>
      <View style={{ backgroundColor: 'grey', width: 50, height: 50, borderRadius: 10 }}>
      </View>
      <View style={{}}>
        <Text>Anina Bekacem</Text>
        <Text>Peinture abstraite</Text>
        <View style={{ flexDirection: 'row' }}>
          <View>
            <Text>4.9</Text>
          </View>
          <View>
            <Text>Alger</Text>
          </View>
        </View>
        <Text>2,500 DA/h</Text>
      </View>
    </View>
  );
};