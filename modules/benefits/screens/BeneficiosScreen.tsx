import React, { useState, useRef, useMemo, useCallback } from 'react';
import { FlatList, RefreshControl, Text, View, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { useAuth } from '../../../context/AuthContext';
import { useTheme } from '../../../context/ThemeContext';
import ItemUnique from '../components/ItemUnique';
import { BenefitData } from '../types/benefits.types';


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
  

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['50%', '75%'], []);

  const handleOpenBottomSheet = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(0);
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
        pressBehavior="close"
      />
    ),
    []
  );

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

      <View style={[styles.headerContainer, { backgroundColor: colors.background }]}>
        <View style={styles.searchFilterRow}>
          <View style={[styles.searchContainer, { backgroundColor: colors.card || '#f0f0f0' }]}>
            <Text style={[styles.searchIcon, { color: colors.textLight }]}>⌕</Text>
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              placeholder="Buscar beneficios..."
              placeholderTextColor={colors.textLight}
            />
          </View>
          
          <TouchableOpacity
            style={[styles.filterButton, { backgroundColor: colors.primary }]}
            onPress={handleOpenBottomSheet}
            activeOpacity={0.8}
          >
            <Text style={styles.filterIcon}>⚙</Text>
          </TouchableOpacity>
        </View>
      </View>

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

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: colors.background }}
        handleIndicatorStyle={{ backgroundColor: colors.textLight }}
      >
        <BottomSheetView style={[styles.bottomSheetContent, { backgroundColor: colors.background }]}>
          <Text style={[styles.bottomSheetTitle, { color: colors.text }]}>
            Filtros
          </Text>
      
          <Text style={{ color: colors.text, textAlign: 'center', marginTop: 20 }}>
      contenido de los filtros pa 
          </Text>
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  searchFilterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  searchIcon: {
    fontSize: 20,
    fontWeight: '400',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    padding: 0,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterIcon: {
    fontSize: 20,
    color: '#fff',
  },
  bottomSheetContent: {
    flex: 1,
    padding: 20,
  },
  bottomSheetTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});