import { ActivityIndicator, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { Stack, Tabs, usePathname, useRouter } from 'expo-router'
import { AddIcon, CalendarIcon, CameraIcon, GiftIcon, HomeIcon, UserICon } from '../../components/Icons'
import { useAuth } from '../../context/AuthContext'
import { TabBar } from '../../components/TabBar'

export default function _layout() {
  const { membership, loading, token, user } = useAuth();
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!token || !user) {
    return null; // Evita que se intente acceder a membership
  }
  
  const { color1:dark, color2:light, color3:transparent } = membership.colors;
  return (
    //Other format
      // <Tabs
      //   tabBar={props => <TabBar {...props}/>}
      // >
      <Tabs
        screenOptions={{
          tabBarStyle: { backgroundColor: "white"},
          tabBarActiveTintColor: dark,
          tabBarLabelStyle:{fontSize: 13}
      }}>
        <Tabs.Screen
          name="index"
          options={{
            title: "Inicio",
            tabBarIcon: ({color}) => <HomeIcon color={color}/>
          }}
        />
        <Tabs.Screen
          name="citas"
          options={{
            title: "Citas",
            tabBarIcon: ({color}) => <CalendarIcon color={color}/>
          }}
        />
        <Tabs.Screen
          name="diagnostico"
          options={{
            title: "Diagnostico",
            tabBarIcon: ({color}) => <CameraIcon color={color}/>
          }}
        />
        <Tabs.Screen
          name="beneficios"
          options={{
            title: "Beneficios",
            tabBarIcon: ({color}) => <GiftIcon color={color}/>
          }}
        />
        <Tabs.Screen
          name="perfil"
          options={{
            title: "Perfil",
            tabBarIcon: ({color}) => <UserICon color={color}/>,
          }}
        />
      </Tabs>
  )
}