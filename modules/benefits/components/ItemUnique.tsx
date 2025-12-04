import React from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { BenefitData } from '../types/benefits.types';

interface ItemUniqueProps {
  index: number;
  dark: string;
  light: string;
  transparent: string;
  data: BenefitData;
  loading: boolean;
  onPress?: (item: BenefitData) => void;
}

export default function ItemUnique({ 
  index, 
  dark, 
  light, 
  transparent, 
  data, 
  loading,
  onPress 
}: ItemUniqueProps) {
  
  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'disponible': return '#10b981'; 
      case 'usado': return '#6b7280'; 
      case 'expirado': return '#ef4444'
      default: return dark;
    }
  };

  const getEstadoTexto = (estado: string) => {
    switch (estado) {
      case 'disponible': return 'Disponible';
      case 'usado': return 'Usado';
      case 'expirado': return 'Expirado';
      default: return 'Desconocido';
    }
  };

  return (
    <Pressable
      onPress={() => onPress?.(data)}
      style={{
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderLeftWidth: 4,
        borderLeftColor: getEstadoColor(data.estado)
      }}
      disabled={loading || data.estado !== 'disponible'}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 4 }} numberOfLines={2}>
            {data.procedimiento}
          </Text>
          <Text style={{ color: '#666', marginBottom: 8, fontSize: 14 }} numberOfLines={3}>
            {data.descripcion}
          </Text>
        </View>
        
        <View style={{ 
          backgroundColor: getEstadoColor(data.estado), 
          paddingHorizontal: 8, 
          paddingVertical: 4, 
          borderRadius: 12,
          minWidth: 80,
          alignItems: 'center'
        }}>
          <Text style={{ color: 'white', fontSize: 12, fontWeight: '600' }}>
            {getEstadoTexto(data.estado)}
          </Text>
        </View>
      </View>
      
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View>
          {data.descuento && (
            <Text style={{ color: dark, fontWeight: 'bold', fontSize: 14, marginBottom: 2 }}>
              {data.descuento}% de descuento
            </Text>
          )}
          {data.valor && (
            <Text style={{ color: '#666', fontSize: 13 }}>
              Valor: ${data.valor.toLocaleString()}
            </Text>
          )}
          {data.fechaExpiracion && (
            <Text style={{ color: '#666', fontSize: 12 }}>
              Expira: {new Date(data.fechaExpiracion).toLocaleDateString()}
            </Text>
          )}
        </View>
        
        {loading ? (
          <ActivityIndicator size="small" color={dark} />
        ) : data.estado === 'disponible' ? (
          <View style={{ 
            backgroundColor: dark, 
            paddingHorizontal: 12, 
            paddingVertical: 6, 
            borderRadius: 8 
          }}>
            <Text style={{ color: 'white', fontSize: 12, fontWeight: '600' }}>
              Aplicar
            </Text>
          </View>
        ) : null}
      </View>
    </Pressable>
  );
}