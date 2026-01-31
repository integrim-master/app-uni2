import { useTheme } from "@/src/context/ThemeContext";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import EmptyDates from "../components/EmptyDates";
import HistoryCard from "../components/HistoryCard";

interface HistoryScreenProps {
  dates?: any[];
}

export default function HistoryScreen({ dates }: HistoryScreenProps) {
  const { colors } = useTheme();
  const citas = Array.isArray(dates) ? dates : [];

  return (
    <View style={styles.container}>
      {citas.length === 0 ? (
        <EmptyDates
          title="Aún no hay historial"
          subtitle="Cuando completes citas aparecerán aquí"
        />
      ) : (
        <FlatList
          data={citas}
          keyExtractor={(i) => `hist-${i.id}`}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 64 }}
          renderItem={({ item }) => <HistoryCard cita={item} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
