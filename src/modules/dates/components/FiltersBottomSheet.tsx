import ThemedText from "@/src/components/shared/themed-text";
import { ui } from "@/src/themes/ui";
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
      <View style={styles.section}>
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
                <ThemedText type="semiBold" tone="inverse">
                  {item}
                </ThemedText>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View style={styles.section}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  sheetContent: {
    padding: ui.spacing.lg,
    gap: ui.spacing.lg,
  },
  section: {
    gap: ui.spacing.sm,
  },
  filterButton: {
    paddingHorizontal: ui.spacing.md,
    paddingVertical: ui.spacing.md,
    marginRight: ui.spacing.sm,
    borderRadius: ui.radii.sm,
    minWidth: 80,
    minHeight: ui.tapTarget,
    alignItems: "center",
    justifyContent: "center",
  },
});
