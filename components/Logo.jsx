import { View, Text, Image } from 'react-native'
import React from 'react'
import LogoUri from "../assets/images/logo-careme-black.png"

export function Logo() {
  return (
    <View>
        <Image source={LogoUri} className="w-40 h-8" resizeMode='cover'/>
    </View>
  )
}