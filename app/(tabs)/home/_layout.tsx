import { useTheme } from '@/src/context/ThemeContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, usePathname, useRouter } from 'expo-router';
import React from 'react';
import { Image, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
export default function HomeLayout() {
  const { colors, isDark } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  

  const HomeHeader = () => (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingHorizontal: 11 }}>
      <Image
        source={isDark
          ? require('../../../assets/images/logo-careme-white.png')
          : require('../../../assets/images/logo-careme-black.png')}
        style={{ width: 120, height: 40, resizeMode: 'contain' }}
      />
      {!pathname.includes('/notifications') && (
        <TouchableOpacity onPress={() => router.push('/home/notifications')}>
          <Ionicons name="notifications-outline" size={28} color={colors.primaryLight} />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'left',
        headerTintColor: 'white',
        headerTitle: () => <HomeHeader />,
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
          title: "",
          headerShown: true,
        }}
      />
      {/* <Stack.Screen
        name="support"
        options={{
          title: "Tus solicitudes",
          headerShadowVisible: false,
        }}
      /> */}
      <Stack.Screen
        name="notifications"
        options={{
          title: "Notificaciones",
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="suggest"
        options={{
          title: "",
          headerShadowVisible: false,
      
            presentation: Platform.OS === "ios" ? "pageSheet" : undefined,

          animation: Platform.OS === "android" ? "slide_from_right" : undefined,
        }}
      />
    </Stack>
  );
}
