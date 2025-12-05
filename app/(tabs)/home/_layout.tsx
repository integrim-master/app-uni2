import { Stack } from 'expo-router';
import React from 'react';
import { useTheme } from '../../../context/ThemeContext';

export default function HomeLayout() {
  const { colors } = useTheme();
  
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'left',
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: colors.primaryLight,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Inicio",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="support"
        options={{
          title: "Tus solicitudes",
            headerStyle: {
              backgroundColor: colors.primaryLight,
            },
            headerShadowVisible: false,
          
        }}
      />
    </Stack>
  );
}
