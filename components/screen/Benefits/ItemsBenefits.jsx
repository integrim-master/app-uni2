import { View, Text, Pressable, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React, { useContext, useState } from 'react'
import { DiamondIcon, RightIcon } from '../../Icons'
import { Colors } from '../../Colors'
import { ProcedimientoIcon } from '../../GeneratorPicture';
import { AuthContext, useAuth } from '../../../context/AuthContext';
import Toast from 'react-native-toast-message';
import { TextContent, TextSubTitles, TextTitles } from '../../TextCustom';
import { useActionSheet } from '../../../provider/ActionSheetProvider';
import { useLoading } from '../../../context/LoadingContext';

export function ItemsBenefits({dark, light, transparent, data, loading}) {
  const {applicationBenefit} = useAuth();
  const { showActionSheet, hideActionSheet } = useActionSheet();
  const { runWithLoading } = useLoading();

  const solicitarProcedimiento = async (procedimiento) => {
    try{
      const response = await runWithLoading(
        () => applicationBenefit(procedimiento),
        'Enviando solicitud'
      )
      hideActionSheet();
      if(response === "success") {
        Toast.show({
          type: 'success',
          text1: 'Procedimiento solicitado',
          text2: 'En minutos un asesor te contactara para agendar tu cita',
          position: 'bottom',
          visibilityTime: 3000,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error al solicitar',
          text2: response?.message || 'Intenta de nuevo',
            position: 'bottom',
           visibilityTime: 3000,
        });
      }
    } catch {
      hideActionSheet();
      Toast.show({
        type: "error",
        text1: "Error inesperado",
        text2: err.message || "Intenta más tarde",
      });
    }
  }

  const openSheet=()=>{
    showActionSheet(
      <View className="items-center justify-end">
        <View className="bg-white p-5 rounded-s-xl w-full">
          <Text className="text-lg font-semibold mb-4 uppercase">
            {data.procedimientoLabel}
          </Text>
          <Text className="text-md font-semibold mb-4">
            {data.descripcion}
          </Text>

          <View className="flex-row justify-end">
            <TouchableOpacity
              className="px-4 py-2 mr-2 rounded-lg bg-gray-300"
              onPress={hideActionSheet}
            >
              <Text>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="px-4 py-2 rounded-lg bg-blue-500"
              onPress={()=>solicitarProcedimiento(data.procedimientoLabel, data.procedimiento)}
              disabled={loading}
            >
              <Text className="text-white">
                {loading ? "Enviando..." : "Sí"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
  return (
    <Pressable onPress={openSheet}>
      {({pressed})=>(
        <View className={`bg-white border-hairline w-11/12 pl-8 rounded-3xl ${pressed?"opacity-50":"opacity-100"}`} style={{borderColor: light}}>
          <View className="gap-4 flex-row justify-between">
            <View className="justify-end pb-4">
              <TextSubTitles className="font-semibold">{data.procedimientoLabel}</TextSubTitles>
              <View className="flex-row gap-2">
                  <TextContent className="text-gray-500">Bonos a usar:</TextContent>
                  <TextContent className="text-gray-500">{data.cantidad}</TextContent>
              </View>
            </View>
            <View className="items-end justify-end h-28 rounded-full" style={{backgroundColor: transparent}}>
                <ProcedimientoIcon iconUri={data.icono} size={90} color={light} />
            </View>
          </View>
        </View>
      )}

    </Pressable>
  )
}