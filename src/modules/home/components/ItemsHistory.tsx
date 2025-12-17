import { Colors } from '@/themes/colors';
import React from 'react';
import { Text, View } from 'react-native';
import { CalendarIcon, TimeIcon } from '../../../components/Icons';
import { ItemsHistoryProps } from '../types/home.types';



export function ItemsHistory({
  buttons,
  dark,
  light,
  transparent,
  procedimiento,
  fecha,
  hora,
  medico,
  estado,
  ...props
}: ItemsHistoryProps) {
  return (
    <View className="bg-white  py-6 rounded-3xl gap-4" {...props}>
        <View 
            className="gap-2 px-2 border-l-4 flex flex-col"
            style={{ borderLeftColor: Colors.primary }}
        >
            <Text className="text-2xl">{procedimiento}</Text>
            <Text className="text-xl text-gray-500">{medico}</Text>
            <View className="flex-row justify-between items-center">
                <View className="flex-row items-center gap-3">
                    <CalendarIcon size={18} color={Colors.primary }/>
                    <Text className="text-lg">{fecha}</Text>
                </View>
                <View className="flex-row items-center gap-3">
                    <TimeIcon size={18} color={dark}/>
                    <Text className="text-lg">{hora}</Text>
                </View>
                <View className='flex-row rounded-full p-2 items-center'
                
                style={{ backgroundColor:
                    estado === "Cancelada"
                        ? "#FEE2E2"
                        : estado === "Pendiente"
                            ? "#FEF3C7"
                            : "#D1FAE5",
                }}
                >
                    <Text
                        style={{
                            fontWeight: "bold" as const,
                            color:
                                estado === "Cancelada"
                                    ? "red"
                                    : estado === "Pendiente"
                                        ? "orange"
                                        : "green",
                        }}
                    >
                        {estado}
                    </Text>
                </View>
            </View>
        </View>
        {buttons === "Activo" ? (
            <View className="flex-row justify-between gap-2">
                <Text className="bg-gray-200 text-gray-600 font-semibold w-6/12 py-2 rounded-xl text-center">
                    Reagendar
                </Text>
                <Text className="bg-red-200 text-red-600 font-semibold w-6/12 py-2 rounded-xl text-center">
                    Cancelar
                </Text>
            </View>
        ) : null}
    </View>
  )
}