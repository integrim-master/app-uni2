import { View, Text } from 'react-native'
import React from 'react'
import { TextContent, TextMix, TextTitles } from '../../TextCustom'

export default function PersonalInfo({icon: Icon, label, value}) {
  return (
    <View className='flex-row items-center gap-5'>
        <Icon size={18}/>
        <View>
            <TextContent className="text-gray-500">{label}</TextContent>
            <TextMix className="text-xl">{value}</TextMix>
        </View>
    </View>
  )
}