import { View } from 'react-native'
import React from 'react'
import { ItemsHistory } from '../History/ItemsHistory'
import { Line } from '../../ElementsAux'

export function HistorialCitas({ citas, dark }) {
  const citasFilter = citas.slice(0, 2);
  return (
    <View>
      {citasFilter.map((item, index) => (
        <View key={item.id || index}>
          <ItemsHistory
            dark={dark}
            procedimiento={item.procedimiento}
            fecha={item.fecha}
            hora={item.hora}
            medico={item.especialista}
            estado={item.estado}
          />
          {index < citasFilter.length - 1 && (
            <Line className="border-b-2 border-b-gray-100 h-1 w-full" />
          )}
        </View>
      ))}
    </View>
  )
}
