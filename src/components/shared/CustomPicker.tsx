import ThemedText from "@/src/components/shared/themed-text";
import { useTheme } from "@/src/context/ThemeContext";
import { Picker } from "@react-native-picker/picker";
import { MotiView } from "moti";
import React from "react";
import { StyleSheet } from "react-native";

type Item = { l: string; v: string };

interface Props {
  label: string;
  selectedValue: any;
  onValueChange: (value: any, index?: number) => void;
  items: Item[];
  visible?: boolean;
  style?: any;
}

export default function CustomPicker({
  label,
  selectedValue,
  onValueChange,
  items,
  visible = true,
  style,
}: Props) {
  const { colors } = useTheme();

  if (!visible) return null;

  return (
    <MotiView
      from={{ opacity: 0, translateY: 10 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 400 }}
      style={[
        styles.container,
        style,
        { borderColor: selectedValue ? colors.primary : colors.border },
      ]}
    >
      <ThemedText
        type="caption"
        style={{ color: colors.textSecondary, marginBottom: -10 }}
      >
        {label}
      </ThemedText>

      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={{ color: colors.text, marginLeft: -8 }}
        dropdownIconColor={colors.primary}
      >
        <Picker.Item
          label={`Selecciona ${label.toLowerCase()}...`}
          value=""
          color={colors.textSecondary}
        />
        {items.map((item) => (
          <Picker.Item
            key={item.v}
            label={item.l}
            value={item.v}
            color={colors.text}
          />
        ))}
      </Picker>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 20, borderBottomWidth: 2, paddingBottom: 4 },
});
