import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { TextContent } from '../../TextCustom'

export function AccesoDirecto({item, icon: Icon, routPage,dark, light, colorFondo}) {
  return (
    <Link asChild href={`/(tabs)/${routPage}`}>
      <Pressable>
        {({ pressed }) => (
          <View className={`gap-2 justify-center items-center w-32 py-2 bg-white rounded-3xl ${pressed ? "opacity-50" : "opacity-100"}`}>
            <View className="h-14 w-14 rounded-full justify-center items-center" style={{backgroundColor: colorFondo}}>
              <Icon color={dark}/>
            </View>
            <TextContent className="text-lg">{item}</TextContent>
          </View>
        )}
      </Pressable>
    </Link>
  )
}