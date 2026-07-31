import ThemedText from "@/src/components/shared/themed-text";
import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { AppThemeColors as ThemeColors } from "../../../themes/colors";

interface FiltersBottomSheetProps {
  procedimientos: string[];
  estados: string[];
  selectedProcedimiento: string | null;
  selectedEstado: string | null;
  setSelectedProcedimiento: (p: string | null) => void;
  setSelectedEstado: (e: string | null) => void;
  colors: ThemeColors;
}

export default function FiltersBottomSheet({
  procedimientos,
  estados,
  selectedProcedimiento,
  selectedEstado,
  setSelectedProcedimiento,
  setSelectedEstado,
  colors,
}: FiltersBottomSheetProps) {
  return (
    <View style={styles.sheetContent}>
      <ThemedText type="semiBold" tone="primary">
        Filtrar por procedimiento
      </ThemedText>
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
                {
                  backgroundColor: selected
                    ? colors.primary
                    : colors.gradientCard[1],
                },
              ]}
            >
              <ThemedText
                type="semiBold"
                tone="inverse"
                weight={selected ? "semibold" : "bold"}
              >
                {item}
              </ThemedText>
            </TouchableOpacity>
          );
        }}
      />
      <ThemedText type="semiBold" tone="primary">
        Filtrar por estado
      </ThemedText>
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
                {
                  backgroundColor: selected
                    ? colors.success
                    : colors.gradientCard[1],
                },
              ]}
            >
              <ThemedText type="semiBold" tone="inverse">
                {item}
              </ThemedText>
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
    gap: 8,
  },
  filterButton: {
    padding: 12,
    marginRight: 8,
    borderRadius: 8,
    minWidth: 80,
    alignItems: "center",
  },
});
