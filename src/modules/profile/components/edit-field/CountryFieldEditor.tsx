import CustomPicker from "@/src/components/shared/CustomPicker";
import ThemedText from "@/src/components/shared/themed-text";
import { useTheme } from "@/src/context/ThemeContext";
import { ui } from "@/src/themes/ui";
import React, { useMemo, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useCountries } from "../../hooks/useCountries";
import { toPickerItems } from "../../types/country.types";
import { getProfileTextValue } from "../../utils/getProfileFieldInitial";
import { getFieldTitle } from "../../utils/validateProfileField";
import { EditFieldLayout } from "./EditFieldLayout";
import type { BaseFieldEditorProps, CountryProfileField } from "./types";

type Props = BaseFieldEditorProps & {
  field: CountryProfileField;
};

export function CountryFieldEditor({
  user,
  field,
  isPending,
  onSave,
}: Props) {
  const { colors } = useTheme();
  const { countries, isLoading, error: loadError } = useCountries();
  const [value, setValue] = useState(() => getProfileTextValue(user, field));
  const [error, setError] = useState<string | null>(null);
  const items = useMemo(() => toPickerItems(countries), [countries]);

  const handleSave = () => {
    if (!value) {
      setError("Selecciona un país.");
      return;
    }
    onSave({ [field]: value });
  };

  return (
    <EditFieldLayout
      title={getFieldTitle(field)}
      error={error}
      isPending={isPending}
      saveDisabled={isPending || !value || isLoading}
      onSave={handleSave}
    >
      {isLoading ? (
        <View style={styles.loading} accessibilityLabel="Cargando países">
          <ActivityIndicator color={colors.primary} />
          <ThemedText type="caption" tone="secondary">
            Cargando países…
          </ThemedText>
        </View>
      ) : loadError ? (
        <ThemedText type="caption" tone="danger">
          No se pudieron cargar los países. Intenta de nuevo.
        </ThemedText>
      ) : (
        <View accessibilityLabel="Selector de país">
          <CustomPicker
            label="País"
            selectedValue={value}
            onValueChange={(itemValue: string) => {
              setValue(itemValue);
              if (error) setError(null);
            }}
            items={items}
          />
        </View>
      )}
    </EditFieldLayout>
  );
}

const styles = StyleSheet.create({
  loading: {
    minHeight: ui.tapTarget,
    flexDirection: "row",
    alignItems: "center",
    gap: ui.spacing.sm,
  },
});
