import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { ImageProfile } from '../../ImageProfile'
import { Membresia } from '../../Membresia'
import { Colors, useColors } from '../../Colors'
import { useAuth } from '../../../context/AuthContext'

export function ProfileElement({dark, membresia, fullName, ...props}) {
  return (
    <View {...props}>
      <View>
        <ImageProfile className="w-28 h-28 rounded-full border-2" style={{borderWidth: 4, borderColor: dark}}/>
      </View>
      <View>
        <Text className="text-3xl font-semibold capitalize">{fullName}</Text>
        <View className="flex-row items-center gap-5">
          <Membresia nameMembresia={membresia} color={dark}/>
          <Text className="text-xl">Desde 2023</Text>
        </View>
      </View>
    </View>
  )
}