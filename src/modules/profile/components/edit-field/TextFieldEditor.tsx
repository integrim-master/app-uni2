import { useTheme } from "@/src/context/ThemeContext";
import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  type KeyboardTypeOptions,
} from "react-native";
import { getProfileTextValue } from "../../utils/getProfileFieldInitial";
import {
  buildProfileFieldValue,
  getFieldTitle,
  validateProfileField,
} from "../../utils/validateProfileField";
import { EditFieldLayout } from "./EditFieldLayout";
import type { BaseFieldEditorProps, TextProfileField } from "./types";

type Props = BaseFieldEditorProps & {
  field: TextProfileField;
};

function keyboardForField(field: TextProfileField): KeyboardTypeOptions {
  if (field === "telefono") return "phone-pad";
  if (field === "postal") return "numbers-and-punctuation";
  return "default";
}

export function TextFieldEditor({ user, field, isPending, onSave }: Props) {
  const { colors } = useTheme();
  const title = getFieldTitle(field);
  const [value, setValue] = useState(() => getProfileTextValue(user, field));
  const [error, setError] = useState<string | null>(null);

  const handleSave = () => {
    const validationError = validateProfileField({ field, value });
    if (validationError) {
      setError(validationError);
      return;
    }
    onSave({
      [field]: buildProfileFieldValue({ field, value }),
    });
  };

  return (
    <EditFieldLayout
      title={title}
      error={error}
      isPending={isPending}
      saveDisabled={isPending || !value.trim()}
      onSave={handleSave}
    >
      <TextInput
        placeholder="Escribe aquí..."
        value={value}
        onChangeText={(text) => {
          setValue(text);
          if (error) setError(null);
        }}
        autoFocus
        autoCapitalize={field === "nombre" ? "words" : "none"}
        keyboardType={keyboardForField(field)}
        returnKeyType="done"
        onSubmitEditing={handleSave}
        accessibilityLabel={title}
        placeholderTextColor={colors.textSecondary}
        style={[
          styles.textInput,
          {
            borderColor: value.length > 0 ? colors.primary : colors.border,
            color: colors.text,
          },
        ]}
      />
    </EditFieldLayout>
  );
}

const styles = StyleSheet.create({
  textInput: { fontSize: 24, paddingVertical: 12, borderBottomWidth: 2 },
});
