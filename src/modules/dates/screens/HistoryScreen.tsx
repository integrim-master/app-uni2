import { useTheme } from "@/src/context/ThemeContext";
import React from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import EmptyDates from "../components/EmptyDates";
import HistoryCard from "../components/HistoryCard";

interface HistoryScreenProps {
  dates?: any[];
  onRefresh?: () => void;
  refreshing?: boolean;
}

export default function HistoryScreen({
  dates,
  onRefresh,
  refreshing,
}: HistoryScreenProps) {
  const { colors } = useTheme();
  const citas = Array.isArray(dates) ? dates : [];

  return (
    <View style={styles.container}>
      <FlatList
        data={citas}
        keyExtractor={(i) => `hist-${i.id}`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 64 }}
        renderItem={({ item }) => <HistoryCard cita={item} />}
        ListEmptyComponent={
          <EmptyDates
            title="Aún no hay historial"
            subtitle="Cuando completes citas aparecerán aquí"
          />
        }
        refreshControl={
          <RefreshControl
            refreshing={!!refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
