import { View, Text } from 'react-native'
import React from 'react'

export function Membresia({color, nameMembresia}) {
  return (
    <View>
        <Text style={{backgroundColor: color}} className="text-xl py-1 px-6 rounded-full text-sky-50 capitalize">{nameMembresia}</Text>
    </View>
  )
}