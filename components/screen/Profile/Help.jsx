import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { TextMix, TextTitles } from '../../TextCustom'
import { DocIcon, EscudoIcon, HelpIcon, RightPacIcon } from '../../Icons'

export default function Help({icon: Icon, label, url}) {
  return (
        <Pressable
            onPress={()=>console.log(url)}
        >
            {({pressed}) =>(
                <View className={`bg-white p-5 rounded-xl gap-5 flex-row items-center justify-between ${pressed ? 'opacity-50' : 'opacity-100'} `}>
                    <View className='flex-row gap-5 items-center'>     
                        <Icon size={18}/>
                        <TextTitles>{label}</TextTitles>
                    </View>
                    <RightPacIcon size={18}/>
                </View>
            )}
        </Pressable>
  )
}