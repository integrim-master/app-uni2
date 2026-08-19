import { BackButton } from "@/src/components/shared/BackButton";
import { Screen } from "@/src/components/shared/Screen";
import ThemedText from "@/src/components/shared/themed-text";
import { CountryFieldEditor } from "@/src/modules/profile/components/edit-field/CountryFieldEditor";
import { DateFieldEditor } from "@/src/modules/profile/components/edit-field/DateFieldEditor";
import { LocationFieldEditor } from "@/src/modules/profile/components/edit-field/LocationFieldEditor";
import { SelectFieldEditor } from "@/src/modules/profile/components/edit-field/SelectFieldEditor";
import { TextFieldEditor } from "@/src/modules/profile/components/edit-field/TextFieldEditor";
import { useInfoProfile } from "@/src/modules/profile/hooks/useMeProfile";
import { useSaveProfileField } from "@/src/modules/profile/hooks/useSaveProfileField";
import type { UserProfile } from "@/src/modules/profile/types/profile.types";
import {
  isProfileField,
  type ProfileField,
} from "@/src/modules/profile/utils/validateProfileField";
import { useTheme } from "@/src/context/ThemeContext";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export function EditProfileFieldScreen() {
  const { field: fieldParam } = useLocalSearchParams<{ field: string }>();
  const rawField = Array.isArray(fieldParam) ? fieldParam[0] : fieldParam;
  const field = rawField && isProfileField(rawField) ? rawField : null;
  const { colors } = useTheme();
  const { data: user, isLoading } = useInfoProfile();

  if (!field) {
    return (
      <Screen safeArea leftButton={<BackButton />}>
        <View style={styles.centered}>
          <ThemedText type="body" tone="secondary">
            Este campo no se puede editar.
          </ThemedText>
        </View>
      </Screen>
    );
  }

  if (isLoading || !user) {
    return (
      <Screen safeArea leftButton={<BackButton />}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </Screen>
    );
  }

  return <EditProfileFieldForm field={field} user={user} />;
}

function EditProfileFieldForm({
  field,
  user,
}: {
  field: ProfileField;
  user: UserProfile;
}) {
  const { save, isPending } = useSaveProfileField();

  switch (field) {
    case "fnacimiento":
      return (
        <DateFieldEditor user={user} isPending={isPending} onSave={save} />
      );
    case "type_id":
      return (
        <SelectFieldEditor user={user} isPending={isPending} onSave={save} />
      );
    case "pais_origen":
    case "pais_residencia":
      return (
        <CountryFieldEditor
          field={field}
          user={user}
          isPending={isPending}
          onSave={save}
        />
      );
    case "localizacion":
      return (
        <LocationFieldEditor user={user} isPending={isPending} onSave={save} />
      );
    default:
      return (
        <TextFieldEditor
          field={field}
          user={user}
          isPending={isPending}
          onSave={save}
        />
      );
  }
}

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});
