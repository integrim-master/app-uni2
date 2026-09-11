import ThemedText from "@/src/components/shared/themed-text";
import { useTheme } from "@/src/context/ThemeContext";
import { ui } from "@/src/themes/ui";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { parseProfileDate } from "../../utils/getProfileFieldInitial";
import {
  buildProfileFieldValue,
  getFieldTitle,
  validateProfileField,
} from "../../utils/validateProfileField";
import { EditFieldLayout } from "./EditFieldLayout";
import type { BaseFieldEditorProps } from "./types";

export function DateFieldEditor({
  user,
  isPending,
  onSave,
}: BaseFieldEditorProps) {
  const { colors } = useTheme();
  const [date, setDate] = useState(() => parseProfileDate(user.fnacimiento));
  const [pendingDate, setPendingDate] = useState(() =>
    parseProfileDate(user.fnacimiento),
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = () => {
    const validationError = validateProfileField({
      field: "fnacimiento",
      value: "",
      date,
    });
    if (validationError) {
      setError(validationError);
      return;
    }
    onSave({
      fnacimiento: buildProfileFieldValue({
        field: "fnacimiento",
        value: "",
        date,
      }),
    });
  };

  const confirmDate = () => {
    setDate(pendingDate);
    setShowDatePicker(false);
    setError(null);
  };

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
      if (event.type === "set" && selectedDate) {
        setDate(selectedDate);
        setPendingDate(selectedDate);
        setError(null);
      }
      return;
    }
    if (selectedDate) setPendingDate(selectedDate);
  };

  return (
    <EditFieldLayout
      title={getFieldTitle("fnacimiento")}
      error={error}
      isPending={isPending}
      saveDisabled={isPending}
      onSave={handleSave}
    >
      <TouchableOpacity
        onPress={() => {
          setPendingDate(date);
          setShowDatePicker(true);
        }}
        accessibilityRole="button"
        accessibilityLabel="Seleccionar fecha de nacimiento"
        accessibilityHint="Abre el selector de fecha"
        style={[styles.inputBorder, { borderColor: colors.primary }]}
      >
        <ThemedText type="titleSm">{date.toLocaleDateString()}</ThemedText>
      </TouchableOpacity>

      {showDatePicker ? (
        <View style={styles.datePickerWrap}>
          {Platform.OS === "ios" ? (
            <View style={styles.dateToolbar}>
              <TouchableOpacity
                onPress={() => {
                  setPendingDate(date);
                  setShowDatePicker(false);
                }}
                accessibilityRole="button"
                accessibilityLabel="Cancelar fecha"
              >
                <ThemedText type="body" tone="secondary">
                  Cancelar
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={confirmDate}
                accessibilityRole="button"
                accessibilityLabel="Confirmar fecha"
              >
                <ThemedText type="body" color={colors.primary} weight="bold">
                  Confirmar
                </ThemedText>
              </TouchableOpacity>
            </View>
          ) : null}
          <DateTimePicker
            value={Platform.OS === "ios" ? pendingDate : date}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={onDateChange}
            maximumDate={new Date()}
            accessibilityLabel="Selector de fecha de nacimiento"
          />
        </View>
      ) : null}
    </EditFieldLayout>
  );
}

const styles = StyleSheet.create({
  inputBorder: {
    borderBottomWidth: ui.borders.width,
    marginBottom: ui.spacing.xl,
    paddingVertical: ui.spacing.lg,
  },
  datePickerWrap: { marginTop: ui.spacing.sm },
  dateToolbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: ui.spacing.sm,
  },
});
