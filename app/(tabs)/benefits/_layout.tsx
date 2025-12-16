import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';

export default function HomeLayout() {
  const { colors } = useTheme();
  
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
        headerTintColor: 'white',
        headerBackground: () => (
          <LinearGradient
            colors={colors.gradientBackground}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.25 }}
            style={StyleSheet.absoluteFillObject}
          />
        ),
      }}
    >
    <Stack.Screen
  name="index"
  options={{
    title: "Beneficios",
    headerShown: true,
  }}
/>
<Stack.Screen
  name="[id_benefits]/index"
  options={{
    title: "Tus solicitudes",
    headerShadowVisible: false,
  }}
/>
    </Stack>
  );
}
