import React from 'react';
import { View } from 'react-native';
import { HistoryByDatesProps } from '../types/home.types';
import { ItemsHistory } from './ItemsHistory';

export function HistoryByDates({ citas, dark }: HistoryByDatesProps) {
  const citasFilter = citas.slice(0, 2);
  return (
    <View>
      {citasFilter.map((item, index) => (
        <View key={item.id || index}>
          <ItemsHistory
            dark={dark}
            light=""
            transparent=""
            buttons="Inactivo"
            procedimiento={item.procedimiento}
            fecha={item.fecha}
            hora={item.hora}
            medico={item.especialista}
            estado={item.estado as "Cancelada" | "Pendiente" | "Completada"}
          />
       
        </View>
      ))}
    </View>
  )
}
