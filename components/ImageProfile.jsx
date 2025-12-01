import { View, Text, Image } from 'react-native'
import React from 'react'
import ImageAvatar from "../assets/images/icon-careme.png"

export function ImageProfile(props) {
  return (
    <View>
        <Image source={ImageAvatar}  resizeMode='cover' {...props}/>
    </View>
  )
} 