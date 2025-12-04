import React, { useState } from 'react';
import { FlatList, RefreshControl, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../../context/AuthContext';
import { useTheme } from '../../../context/ThemeContext';
import ItemUnique from '../components/ItemUnique';
import { BenefitData } from '../types/benefits.types';

// Datos mock de beneficios
const mockBenefits: BenefitData[] = [
  {
    id: '1',
    procedimiento: 'Limpieza Facial Profunda',
    descripcion: 'Tratamiento completo de limpieza facial con extracción de puntos negros y mascarilla hidratante',
    descuento: 30,
    estado: 'disponible',
    valor: 150000,
    fechaExpiracion: '2025-03-31'
  },
  {
    id: '2', 
    procedimiento: 'Masaje Relajante',
    descripcion: 'Masaje corporal completo de 60 minutos para aliviar el estrés y la tensión muscular',
    descuento: 25,
    estado: 'disponible',
    valor: 120000,
    fechaExpiracion: '2025-02-28'
  },
  {
    id: '3',
    procedimiento: 'Tratamiento Capilar',
    descripcion: 'Hidratación profunda del cabello con productos premium',
    descuento: 20,
    estado: 'usado',
    valor: 80000,
    fechaExpiracion: '2025-01-31'
  },
  {
    id: '4',
    procedimiento: 'Manicure y Pedicure',
    descripcion: 'Servicio completo de cuidado de uñas con esmaltado semi-permanente',
    descuento: 15,
    estado: 'expirado',
    valor: 60000,
    fechaExpiracion: '2024-12-01'
  }
];

export default function BeneficiosScreen() {
  const { membership, refreshUserData, loading } = useAuth();
  const { colors } = useTheme();
  const [refreshing, setRefreshing] = useState(false);

  if (!membership) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16, backgroundColor: colors.background }}>
        <Text style={{ color: colors.text }}>Cargando información de membresía...</Text>
      </SafeAreaView>
    );
  }

  const { color1: dark, color2: light, color3: transparent } = membership.colors;

  const benefits = mockBenefits;

  const onRefresh = async () => {
    setRefreshing(true);
    await refreshUserData();
    setRefreshing(false);
  };

  const handleBenefitPress = (benefit: BenefitData) => {
    if (benefit.estado === 'disponible') {
      console.log('Aplicando beneficio pa', benefit.procedimiento);

    }
  };

  if (!benefits || benefits.length === 0) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16, backgroundColor: colors.background }}>
        <Text style={{ color: colors.text }}>No hay beneficios disponibles.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <FlatList
        data={benefits}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <ItemUnique
            index={index}
            dark={dark}
            light={light}
            transparent={transparent}
            data={item}
            loading={loading}
            onPress={handleBenefitPress}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        ListEmptyComponent={
          <View style={{ padding: 32, alignItems: 'center' }}>
            <Text style={{ fontSize: 16, color: colors.textLight, textAlign: 'center' }}>
              No cuentas con beneficios disponibles
            </Text>
          </View>
        }
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh} 
            colors={[colors.primary]} 
            tintColor={colors.primary}
          />
        }
        contentContainerStyle={{ paddingVertical: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}