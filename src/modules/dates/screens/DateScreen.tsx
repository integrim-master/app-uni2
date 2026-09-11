import { Screen } from "@/src/components/shared/Screen";
import ThemedText from "@/src/components/shared/themed-text";
import { ui } from "@/src/themes/ui";
import { parseDateString } from "@/src/utils/dateUtils";
import { router } from "expo-router";
import { AnimatePresence, MotiView } from "moti";
import React, { useMemo } from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { useTheme } from "../../../context/ThemeContext";
import CitaCard from "../components/CitaCard";
import CitaCardSkeleton from "../components/CitaCardSkeleton";
import EmptyDates from "../components/EmptyDates";
import type { Cita } from "../types/date.api.types";

interface DatesScreenProps {
  dates?: Cita[];
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

  const processedDates = useMemo(() => {
    return dates
      .map((cita) => ({
        ...cita,
        _parsedDate: parseDateString(cita?.fecha_cita),
      }))
      .filter((cita) => cita._parsedDate !== null);
  }, [dates]);

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.content}>
          {isLoading && <CitaCardSkeleton />}

          {!isLoading && isError && (
            <View style={styles.center}>
              <View style={styles.errorCopy}>
                <ThemedText type="subtitle">Error cargando citas</ThemedText>
                <ThemedText type="caption" tone="muted" align="center">
                  {String(error?.message ?? error ?? "")}
                </ThemedText>
              </View>
            </View>
          )}

          {!isLoading && !isError && (
            <AnimatePresence>
              <MotiView
                from={{ opacity: 0, translateY: 10 }}
                animate={{ opacity: 1, translateY: 0 }}
                style={styles.flex1}
              >
                <FlatList
                  data={processedDates}
                  keyExtractor={(item, index) => `cita-${item.id ?? index}`}
                  ItemSeparatorComponent={() => (
                    <View style={styles.separator} />
                  )}
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
                      refreshing={!!refreshing}
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
    paddingTop: ui.spacing.lg,
    paddingBottom: ui.spacing.xl,
  },
  separator: {
    height: ui.spacing.md,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: ui.spacing.lg,
  },
  errorCopy: {
    gap: ui.spacing.sm,
    alignItems: "center",
  },
});
