import { Tabs } from 'expo-router'
import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import { CalendarIcon, CameraIcon, GiftIcon, HomeIcon, UserICon } from '../../components/Icons'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'

export default function TabsLayout() {
  const { loading, token, user } = useAuth();
  const { colors } = useTheme();
  
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!token || !user) {
    return null; 
  }
  

  
  return (

      <Tabs
          screenOptions={{
        headerShown: true,         
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        headerTitleAlign: 'left',
        headerTintColor: colors.text,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
        },
        headerStyle: {
          backgroundColor: colors.backgroundLight, 
        },
      }}>
        <Tabs.Screen
          name="index"
          options={{
            title: "Inicio",
            tabBarIcon: ({color}) => <HomeIcon color={color}/>
          }}
        />
        <Tabs.Screen
          name="dates"
          options={{
            title: "Citas",
            tabBarIcon: ({color}) => <CalendarIcon color={color}/>
          }}
        />
        <Tabs.Screen
          name="diagnostics"
          options={{
            title: "Diagnostico",
            tabBarIcon: ({color}) => <CameraIcon color={color}/>
          }}
        />
        <Tabs.Screen
          name="benefits"
          options={{
            title: "Beneficios",
            tabBarIcon: ({color}) => <GiftIcon color={color}/>
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Perfil",
            tabBarIcon: ({color}) => <UserICon color={color}/>,
          }}
        />
      </Tabs>

  )
}