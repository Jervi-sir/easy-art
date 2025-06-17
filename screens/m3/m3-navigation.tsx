import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const M3Navigation = () => {
  return (
    <>
      {/* Top */}
      <View style={{ backgroundColor: 'purple', padding: 20, paddingBottom: 50 }}>
        <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold', }}>Evenements Artistiques</Text>
        <Text style={{ color: 'white' }}>Découvre et participez aux evenements creatifs</Text>
      </View>
      {/* Button */}
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <View style={{
          marginTop: -30, width: 'auto',
          flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 20,
          backgroundColor: 'orange',
          paddingHorizontal: 20, paddingVertical: 16,
          borderRadius: 7
        }}>
          <Text>+ Creer un evenement</Text>
        </View>
      </View>
      {/* Categories */}
      <View style={{ flexDirection: 'row', gap: 10, }}>
        {[
          { name: 'Tout' },
          { name: 'Musique' },
          { name: 'Art Visel' },
          { name: 'Photographie' },
        ].map((item, index) => (
          <View key={index} style={{ 
            backgroundColor: 'grey', flexDirection: 'row', alignItems: 'center', gap: 7,
            paddingHorizontal: 10, paddingVertical: 7, borderRadius: 100 
          }}>
            <View style={{ width: 20, height: 20, backgroundColor: 'white' }} />
            <Text >{item.name}</Text>
          </View>
        ))}
      </View>
      {/* Results */}
      <View>
        <Text>4 evenements disponibles</Text>
        <View style={{ gap: 10 }}>
          {[
            { name: '' },
            { name: '' }
          ].map((item, index) => (
            <React.Fragment key={index}>
              <View style={{ padding: 20 }}>
                <View style={{ backgroundColor: 'red', width: 200, height: 200 }}></View>
                <View>
                  <View>
                    <Text>Galerie d'art, Alger Center</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                      <Text>45/80 participants</Text>
                    </View>
                    <Text>500 DA</Text>
                  </View>
                </View>
              </View>
            </React.Fragment>
          ))}
          
        </View>
      </View>
    </>
  );
};

export default M3Navigation;