import { View, Text, TouchableOpacity, ScrollView, Pressable } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Screen } from '../../components/Screen'
import { ProfileElement } from '../../components/screen/home/ProfileElement'
import wpService from '../../services/wordpress';
import { LogOut } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, Stack, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext, useAuth } from '../../context/AuthContext';
import SectionContainer from '../../components/SectionContainer';
import PersonalInfo from '../../components/screen/Profile/PersonalInfo';
import Help from '../../components/screen/Profile/Help';
import { TextTitles } from '../../components/TextCustom';
import { CallIcon, DocIcon, EscudoIcon, HelpIcon, MailIcon, MapIcon } from '../../components/Icons';

export default function perfil() {
  const { user, membership, loading, logout,updateUser } = useAuth();
  const fullName = `${user.first_name} ${user.last_name}`;
  const membresia = user.membresia;
  const { color1:dark, color2:light, color3:colorFondo } = membership.colors;
  const router = useRouter();

  const handleLogout = async () => {
    await logout();           // Llama a tu función del contexto
    router.replace('/login');
  };
  const data = [
    {icon: MailIcon, label: 'Email', value: user.email},
    {icon: CallIcon, label: 'Teléfono', value: user.telefono},
    {icon: MapIcon, label: 'Ciudad', value: user.ciudad}
  ]

  const options = [
    {icon: EscudoIcon, label: 'Privacidad y Seguridad', url: 'Privacidad'},
    {icon: HelpIcon, label: 'Ayuda y Soporte', url: 'Ayuda'},
    {icon: DocIcon, label: 'Terminos y Condiciones', url: 'Terminos'}
  ]
  return (
      <ScrollView
        className="flex-1" 
        showsVerticalScrollIndicator={false}
      >
          <Screen className="pt-5 gap-8">
            <Stack.Screen
            options={{
              headerShown: false
            }}/>
              <ProfileElement className="items-center gap-5" dark={dark} membresia={membresia} fullName={fullName}/>
              <View className='bg-white p-5 rounded-xl gap-3'>
                <View className='flex-row items-center justify-between'>
                    <TextTitles>Informacion personal</TextTitles>
                    <Pressable
                      onPress={()=>updateUser}
                    >

                    <Text>EDIT</Text>
                    </Pressable>
                </View>
                <View className='p-2 gap-5'>
                  {
                    data.map((item, index) => {
                      return (
                        <PersonalInfo
                          key={index}
                          icon={item.icon}
                          label={item.label}
                          value={item.value}
                        />
                      )
                    })
                  }
                </View>
              </View>
              <View className='gap-3'>
                  {
                    options.map((item, index) => (
                        <Help
                          key={index}
                          icon={item.icon}
                          label={item.label}
                          url={item.url}
                        />
                    ))
                  }
              </View>
                <Pressable
                  onPress={handleLogout}
                  >
                  <View className='flex-row gap-5 items-center'>
                    <LogOut size={20} color="#FF3B30" />
                    <TextTitles >Cerrar Sesion</TextTitles>
                  </View>
              </Pressable>
          </Screen>
        </ScrollView>
  )
}