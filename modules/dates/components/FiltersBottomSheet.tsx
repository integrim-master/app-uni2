import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ThemeColors } from "../../../themes/colors";

interface FiltersBottomSheetProps {
  procedimientos: string[];
  estados: string[];
  selectedProcedimiento: string | null;
  selectedEstado: string | null;
  setSelectedProcedimiento: (p: string | null) => void;
  setSelectedEstado: (e: string | null) => void;
  colors: ThemeColors;
}

export default function FiltersBottomSheet({ procedimientos, estados, selectedProcedimiento, selectedEstado, setSelectedProcedimiento, setSelectedEstado, colors }: FiltersBottomSheetProps) {
  return (
    <View style={styles.sheetContent}>
      <Text style={[styles.filterTitle, { color: colors.text }]}>Filtrar por procedimiento</Text>
      <FlatList
        horizontal
        data={procedimientos}
        keyExtractor={(item, index) => `procedimiento-${index}`}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          const selected = selectedProcedimiento === item;
          return (
            <TouchableOpacity
              onPress={() => setSelectedProcedimiento(selected ? null : item)}
              style={[
                styles.filterButton,
                { backgroundColor: selected ? colors.primary : colors.backgroundSecondary }
              ]}
            >
              <Text style={[styles.filterButtonText, selected && { color: '#fff', fontWeight: '600' }]}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
      <Text style={[styles.filterTitle, { color: colors.text, marginTop: 18 }]}>Filtrar por estado</Text>
      <FlatList
        horizontal
        data={estados}
        keyExtractor={(item, index) => `estado-${index}`}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          const selected = selectedEstado === item;
          return (
            <TouchableOpacity
              onPress={() => setSelectedEstado(selected ? null : item)}
              style={[
                styles.filterButton,
                { backgroundColor: selected ? colors.success : colors.backgroundSecondary }
              ]}
            >
              <Text style={[styles.filterButtonText, selected && { color: '#fff', fontWeight: '600' }]}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sheetContent: {
    padding: 20,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  filterButton: {
    padding: 12,
    marginRight: 8,
    borderRadius: 8,
    minWidth: 80,
    alignItems: "center",
  },
  filterButtonText: {
    fontWeight: "500",
    color: "#222"
  },
});