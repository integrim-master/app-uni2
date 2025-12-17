import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../../context/ThemeContext";
import CitaCard, { Cita } from "./CitaCard";

export default function CitasList({ citas }: { citas: Cita[] }) {
  const { colors } = useTheme();

  if (citas.length === 0) {
    return (
      <Text style={[styles.noCitasText, { color: colors.textLight }]}>No tienes citas</Text>
    );
  }

  return (
    <View style={styles.citasContainer}>
      <Text style={[styles.citasTitle, { color: colors.text }]}>Tus citas ({citas.length})</Text>
      <FlatList
        data={citas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <CitaCard cita={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.citasList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  noCitasText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  citasContainer: {
    flex: 1,
  },
  citasTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  citasList: {
    paddingBottom: 20,
  },
});