import CustomPicker from "@/src/components/shared/CustomPicker";
import React, { useState } from "react";
import { TYPE_ID_ITEMS } from "../../constants/identification";
import { getProfileTextValue } from "../../utils/getProfileFieldInitial";
import {
  getFieldTitle,
  validateProfileField,
} from "../../utils/validateProfileField";
import { EditFieldLayout } from "./EditFieldLayout";
import type { BaseFieldEditorProps } from "./types";

export function SelectFieldEditor({
  user,
  isPending,
  onSave,
}: BaseFieldEditorProps) {
  const [value, setValue] = useState(() =>
    getProfileTextValue(user, "type_id"),
  );
  const [error, setError] = useState<string | null>(null);

  const handleSave = () => {
    const validationError = validateProfileField({
      field: "type_id",
      value,
    });
    if (validationError) {
      setError(validationError);
      return;
    }
    onSave({ type_id: value });
  };

  return (
    <EditFieldLayout
      title={getFieldTitle("type_id")}
      error={error}
      isPending={isPending}
      saveDisabled={isPending || !value}
      onSave={handleSave}
    >
      <CustomPicker
        label="Tipo de identificación"
        selectedValue={value}
        onValueChange={(itemValue: string) => {
          setValue(itemValue);
          if (error) setError(null);
        }}
        items={TYPE_ID_ITEMS}
      />
    </EditFieldLayout>
  );
}
