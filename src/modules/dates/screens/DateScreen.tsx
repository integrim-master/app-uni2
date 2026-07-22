import { Screen } from "@/src/components/shared/Screen";
import { parseDateString } from "@/src/utils/dateUtils";
import { router } from "expo-router";
import { AnimatePresence, MotiView } from "moti";
import React, { useMemo } from "react";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../../context/ThemeContext";
import CitaCard from "../components/CitaCard";
import CitaCardSkeleton from "../components/CitaCardSkeleton";
import EmptyDates from "../components/EmptyDates";
import { MOCK_CITAS } from "../mocks/mockCitas";

const USE_MOCK_CITAS = true;

interface DatesScreenProps {
  dates?: any[];
  isLoading?: boolean;
  isError?: boolean;
  error?: any;
  onRefresh?: () => void;
  refreshing?: boolean;
}

export default function DatesScreen({
  dates = [],
  isLoading,
  isError,
  error,
  onRefresh,
  refreshing,
}: DatesScreenProps) {
  const { colors } = useTheme();

  const sourceDates = useMemo(() => {
    if (USE_MOCK_CITAS && (!dates || dates.length === 0)) {
      return MOCK_CITAS;
    }
    return dates;
  }, [dates]);

  const processedDates = useMemo(() => {
    return sourceDates
      .map((cita) => ({
        ...cita,
        _parsedDate: parseDateString(cita?.fecha_cita),
      }))
      .filter((cita) => cita._parsedDate !== null);
  }, [sourceDates]);

  // Con mocks no mostramos loading vacío de la API.
  const showLoading = isLoading && !USE_MOCK_CITAS;

  return (
    <Screen fullWidth={true}>
      <View style={styles.container}>
        <View style={styles.content}>
          {showLoading && <CitaCardSkeleton />}

          {!showLoading && isError && !USE_MOCK_CITAS && (
            <View style={styles.center}>
              <Text style={{ color: colors.text, marginBottom: 8 }}>
                Error cargando citas
              </Text>
              <Text style={{ color: colors.textMuted }}>
                {String(error?.message ?? error ?? "")}
              </Text>
            </View>
          )}

          {!showLoading && (!isError || USE_MOCK_CITAS) && (
            <AnimatePresence>
              <MotiView
                from={{ opacity: 0, translateY: 10 }}
                animate={{ opacity: 1, translateY: 0 }}
                style={styles.flex1}
              >
                <FlatList
                  data={processedDates}
                  keyExtractor={(item, index) => `cita-${item.id ?? index}`}
                  ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                  renderItem={({ item }) => (
                    <CitaCard
                      cita={item}
                      onPress={() => router.push(`/dates/${item.id}`)}
                    />
                  )}
                  ListEmptyComponent={
                    <EmptyDates
                      title="No hay citas"
                      subtitle="Programa tu próxima cita"
                    />
                  }
                  contentContainerStyle={[
                    styles.listContent,
                    processedDates.length === 0 && styles.flex1,
                  ]}
                  showsVerticalScrollIndicator={false}
                  refreshControl={
                    <RefreshControl
                      refreshing={!!refreshing && !USE_MOCK_CITAS}
                      onRefresh={onRefresh}
                      tintColor={colors.primary}
                      colors={[colors.primary]}
                    />
                  }
                />
              </MotiView>
            </AnimatePresence>
          )}
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  flex1: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
