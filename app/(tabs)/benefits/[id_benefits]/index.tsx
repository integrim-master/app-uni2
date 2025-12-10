import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

export default function Index() {
  const { id_benefits } = useLocalSearchParams();
  console.log(id_benefits);
  return(
    <View>
        <Stack.Screen
      options={{

        title: `Beneficio ${id_benefits}`,
        headerShadowVisible: false,
      }}
    />  
        <Text>Detalle del beneficio con ID: {id_benefits}</Text>
    </View>
  )
}