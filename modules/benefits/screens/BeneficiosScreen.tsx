import { Screen } from '@/components/shared/Screen';
import TabBar from '@/modules/home/components/TabBar';
import { Benefits } from '@/types/shared/Benefits.type';
import { Ionicons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { router } from 'expo-router';
import { AnimatePresence, MotiView } from 'moti';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../../context/AuthContext';
import { useTheme } from '../../../context/ThemeContext';
import ItemUnique from '../components/ItemUnique';




export default function BeneficiosScreen() {
  const { membership, loading } = useAuth();
  const { colors } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'todos' | 'canjeados'>('todos');

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
      <Screen>
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16, backgroundColor: 'transparent' }}>
          <Text style={{ color: colors.text }}>Cargando información de membresía...</Text>
        </SafeAreaView>
      </Screen>
    );
  }



  const benefits = membership.benefits;

  const anyCanjeados = benefits.some((b) => (b.used || 0) > 0);

  const onRefresh = async () => {
    setRefreshing(true);
    setRefreshing(false);
  };

  const handleBenefitPress = (benefit: Benefits) => {
    router.push(`/benefits/${benefit.id}`);
  };

  if (!benefits) {
    return (
      <Screen>
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16, backgroundColor: 'transparent' }}>
          <Text style={{ color: colors.text }}>No hay beneficios disponibles.</Text>
        </SafeAreaView>
      </Screen>
    );
  }

  return (
    <Screen>
      <View style={styles.container}>
        <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
          <TabBar
            options={[{ key: 'todos', label: 'Todos' }, { key: 'canjeados', label: 'Canjeados' }]}
            activeTab={activeTab}
            setActiveTab={(tab) => setActiveTab(tab as any)}
          />
        </View>

        <View style={{ flex: 1, position: 'relative' }}>
          <AnimatePresence exitBeforeEnter>
            {activeTab === 'todos' && (
              <MotiView
                key="todos"
                from={{ opacity: 0, translateX: 25 }}
                animate={{ opacity: 1, translateX: 0 }}
                exit={{ opacity: 0, translateX: -25 }}
                transition={{ type: 'timing', duration: 150 }}
                style={styles.absoluteFill}
              >
                <FlatList
                  data={benefits}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <ItemUnique data={item} loading={loading} onPress={() => handleBenefitPress(item)} />
                  )}
                  ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
                  ListEmptyComponent={
                    <View style={{ padding: 32, alignItems: 'center' }}>
                      <Text style={{ fontSize: 16, color: colors.textLight, textAlign: 'center' }}>
                        No cuentas con beneficios disponibles
                      </Text>
                    </View>
                  }
                  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primary]} tintColor={colors.primary} />}
                  contentContainerStyle={{ paddingVertical: 16 }}
                  showsVerticalScrollIndicator={false}
                />
              </MotiView>
            )}

            {activeTab === 'canjeados' && (
              <MotiView
                key="canjeados"
                from={{ opacity: 0, translateX: 25 }}
                animate={{ opacity: 1, translateX: 0 }}
                exit={{ opacity: 0, translateX: -25 }}
                transition={{ type: 'timing', duration: 150 }}
                style={[styles.absoluteFill, { paddingHorizontal: 16 }]}
              >
                {!anyCanjeados ? (
                  <View style={styles.emptyContainer}>
                    <Ionicons name="gift" size={36} color={colors.textLight} />
                    <Text style={[styles.noCitasText, { color: colors.primaryLight, marginTop: 10 }]}>No hay beneficios canjeados</Text>
                  </View>
                ) : (
                 <View>
                  <Text>
                    Lista de beneficios canjeados
                  </Text>
                 </View>
                )}
              </MotiView>
            )}
          </AnimatePresence>
        </View>

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
              contenido de los filtros
            </Text>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
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

  absoluteFill: {
    position: 'absolute',
    inset: 0,
    flex: 1,
    width: '100%',
    marginTop: 10,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  noCitasText: {
    fontSize: 16,
    textAlign: 'center',
  },
});