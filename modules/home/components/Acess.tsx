import { Link } from 'expo-router'
import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { useTheme } from '../../../context/ThemeContext'
import { AccesoDirectoProps } from '../types/home.types'

export function AccesoDirecto({
  item, 
  icon: Icon, 
  routPage, 
  dark, 
  light, 
  colorFondo
}: AccesoDirectoProps) {
  const { colors } = useTheme();
  
  return (
    <Link asChild href={`/(tabs)/${routPage}`}>
      <Pressable>
        {({ pressed }) => (
          <View style={{ 
            backgroundColor: colors.card, 
            borderWidth: 1, 
            borderColor: colors.border,
            opacity: pressed ? 0.5 : 1 
          }} className="gap-2 flex flex-row p-10 w-48 h-24 justify-center items-center py-2 rounded-xl">
            <View className="rounded-full justify-center items-center">
              <Icon color={colors.primary} />
            </View>
            <Text style={{ color: colors.text }} className="text-lg text-center font-medium">{item}</Text>
          </View>
        )}
      </Pressable>
    </Link>
  )
}