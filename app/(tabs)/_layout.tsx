import { Tabs } from 'expo-router';
import React from 'react';
import { CalendarIcon, CameraIcon, GiftIcon, HomeIcon, UserICon } from '../../components/Icons';
import { useTheme } from '../../context/ThemeContext';

export default function TabsLayout() {
  const { colors } = useTheme();
  
  return (
      <Tabs
          screenOptions={{
        headerShown: true,         
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        headerTitleAlign: 'left',
        headerTintColor: 'white',
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
        },
        headerStyle: {
          backgroundColor: colors.primaryLight, 
        },
      }}>
        <Tabs.Screen
          name="home"
          options={{
            title: "Inicio",
            tabBarIcon: ({color}) => <HomeIcon color={color}/>,
            headerShown: false
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