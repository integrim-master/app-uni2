import { useTheme } from "@/src/context/ThemeContext";
import { ui } from "@/src/themes/ui";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface Chip {
  key: string;
  label: string;
}

interface ChipsListProps {
  chips: Chip[];
}

export default function ChipsList({ chips }: ChipsListProps) {
  const { colors } = useTheme();
  return (
    <View style={styles.chipsWrap}>
      {chips.map((c) => (
        <View
          key={c.key}
          style={[
            styles.chip,
            {
              backgroundColor: colors.card,
              borderColor: colors.primary + "30",
            },
          ]}
        >
          <MaterialIcons name="spa" size={16} color={colors.primary} />
          <Text style={[styles.chipText, { color: colors.textSecondary }]}> {c.label} </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  chipsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 24,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: ui.radii.lg,
    borderWidth: ui.borders.width,
    gap: 8,
  },
  chipText: {
    fontSize: 14,
  },
});
