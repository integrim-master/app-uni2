import { View, Text } from 'react-native'
import React from 'react'
import { CalendarIcon, TimeIcon } from '../../Icons'
import { TextContent, TextSubTitles } from '../../TextCustom'

export function ItemsHistory({buttons, dark, light, transparent, procedimiento, fecha, hora, medico, estado}, props) {
  return (
    <View className="bg-white px-8 py-6 rounded-3xl gap-4" {...props}>
        <View className="gap-2">
            <TextSubTitles className="text-2xl">{procedimiento}</TextSubTitles>
            <TextContent className="text-xl text-gray-500">{medico}</TextContent>
            <View className="flex-row justify-between items-center">
                <View className="flex-row items-center gap-3">
                    <CalendarIcon size={18} color={dark}/>
                    <TextContent className="text-lg">{fecha}</TextContent>
                </View>
                <View className="flex-row items-center gap-3">
                    <TimeIcon size={18} color={dark}/>
                    <TextContent className="text-lg">{hora}</TextContent>
                </View>
                <View className='flex-row items-center'>
                    <Text
                        style={{
                        fontWeight: "bold",
                        color:
                            estado == "Cancelada"
                            ? "red"
                            : estado == "Pendiente"
                            ? "orange"
                            : "green",
                        }}
                    >
                        {estado}
                    </Text>
                </View>
            </View>
        </View>
        {
            buttons === "Activo"?(
                <View className="flex-row justify-between gap-2">
                    <Text className="bg-gray-200 text-gray-600 font-semibold w-6/12 py-2 rounded-xl text-center">Reagendar</Text>
                    <Text className="bg-red-200 text-red-600 font-semibold w-6/12 py-2 rounded-xl text-center">Cancelar</Text>
                </View>
            ) : (
               ''
            )
        }
    </View>
  )
}