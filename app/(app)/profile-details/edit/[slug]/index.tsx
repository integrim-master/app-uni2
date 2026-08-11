import { BackButton } from "@/src/components/shared/BackButton";
import CustomPicker from "@/src/components/shared/CustomPicker";
import PrimaryButton from "@/src/components/shared/PrimaryButton";
import { Screen } from "@/src/components/shared/Screen";
import ThemedText from "@/src/components/shared/themed-text";
import { useTheme } from "@/src/context/ThemeContext";
import { useEditProfile } from "@/src/modules/profile/hooks/useEditProfile";
import {
  buildProfileFieldValue,
  getFieldTitle,
  ProfileField,
  validateProfileField,
} from "@/src/modules/profile/utils/validateProfileField";
import { FULL_PROFILE_KEY } from "@/src/modules/user/types/me.types";
import {
  getErrorMessage,
  showErrorToast,
} from "@/src/utils/showErrorToast";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

const TYPE_ID_ITEMS = [
  { l: "Cédula", v: "cc" },
  { l: "Pasaporte", v: "ppto" },
];

function parseInitialValue(slug?: string | string[]) {
  const raw = Array.isArray(slug) ? slug[0] : slug;
  if (!raw || raw === "vacio") return "";
  return raw;
}

function parseInitialDate(slug?: string | string[]) {
  const raw = parseInitialValue(slug);
  if (!raw) return new Date();
  const parsed = new Date(raw.includes("T") ? raw : `${raw}T12:00:00`);
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
}

const Index = () => {
  const { slug, name: nameParam } = useLocalSearchParams<{
    slug: string;
    name: string;
  }>();
  const field = (
    Array.isArray(nameParam) ? nameParam[0] : nameParam
  ) as ProfileField;
  const { colors } = useTheme();
  const router = useRouter();

  const initialValue = parseInitialValue(slug);
  const [value, setValue] = useState(initialValue);
  const [date, setDate] = useState(() => parseInitialDate(slug));
  const [pendingDate, setPendingDate] = useState(() => parseInitialDate(slug));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const queryClient = useQueryClient();
  const { mutate: updateProfile, isPending } = useEditProfile();

  const title = useMemo(() => getFieldTitle(field), [field]);

  const isSaveDisabled = useMemo(() => {
    if (isPending) return true;
    if (field === "localizacion") return !country || !state || !city;
    if (field === "fnacimiento") return false;
    if (field === "type_id") return !value;
    return !value.trim();
  }, [isPending, field, country, state, city, value]);

  const handleSave = () => {
    const error = validateProfileField({
      field,
      value,
      date,
      country,
      state,
      city,
    });
    if (error) {
      setValidationError(error);
      // showErrorToast("Revisa el campo", error);
      return;
    }

    setValidationError(null);

    const finalValue = buildProfileFieldValue({
      field,
      value,
      date,
      country,
      state,
      city,
    });
    console.log("finalValue", finalValue);

    updateProfile(
      
      { [field]: finalValue },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: FULL_PROFILE_KEY });
          Toast.show({
            type: "success",
            text1: "Perfil actualizado",
            text2: "Tus cambios se guardaron correctamente.",
          });
          router.back();
        },
        onError: (err) => {
          showErrorToast(
            "No se pudo guardar",
            getErrorMessage(err, "Intenta de nuevo en un momento."),
          );
        },
      },
    );
  };

  const openDatePicker = () => {
    setPendingDate(date);
    setShowDatePicker(true);
  };

  const confirmDate = () => {
    setDate(pendingDate);
    setValue(pendingDate.toLocaleDateString());
    setShowDatePicker(false);
    setValidationError(null);
  };

  const cancelDate = () => {
    setPendingDate(date);
    setShowDatePicker(false);
  };

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
      if (event.type === "set" && selectedDate) {
        setDate(selectedDate);
        setPendingDate(selectedDate);
        setValue(selectedDate.toLocaleDateString());
        setValidationError(null);
      }
      return;
    }

    if (selectedDate) {
      setPendingDate(selectedDate);
    }
  };

  const onChangeText = (text: string) => {
    setValue(text);
    if (validationError) setValidationError(null);
  };

  return (
    <Screen safeArea leftButton={<BackButton />}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
        keyboardVerticalOffset={70}
      >
        <View className="flex-1 mt-4 p-6">
          <View className="flex-1">
            <View style={styles.headerTitleWrap}>
              <ThemedText
                type="display"
                accessibilityRole="header"
              >
                {title}
              </ThemedText>
            </View>

            {field === "localizacion" ? (
              <View accessibilityLabel="Selector de ubicación">
                <CustomPicker
                  label="País"
                  selectedValue={country}
                  onValueChange={(v: string) => {
                    setCountry(v);
                    setState("");
                    setCity("");
                    setValidationError(null);
                  }}
                  items={[
                    { l: "Colombia", v: "CO" },
                    { l: "México", v: "MX" },
                  ]}
                />
                <CustomPicker
                  label="Estado / Departamento"
                  visible={!!country}
                  selectedValue={state}
                  onValueChange={(v: string) => {
                    setState(v);
                    setCity("");
                    setValidationError(null);
                  }}
                  items={[
                    { l: "Atlántico", v: "ATL" },
                    { l: "Antioquia", v: "ANT" },
                  ]}
                />
                <CustomPicker
                  label="Ciudad / Municipio"
                  visible={!!state}
                  selectedValue={city}
                  onValueChange={(v: string) => {
                    setCity(v);
                    setValidationError(null);
                  }}
                  items={[
                    { l: "Barranquilla", v: "BAQ" },
                    { l: "Medellín", v: "MED" },
                  ]}
                />
              </View>
            ) : field === "type_id" ? (
              <CustomPicker
                label="Tipo de identificación"
                selectedValue={value}
                onValueChange={(itemValue: string) => {
                  setValue(itemValue);
                  setValidationError(null);
                }}
                items={TYPE_ID_ITEMS}
              />
            ) : field === "fnacimiento" ? (
              <TouchableOpacity
                onPress={openDatePicker}
                accessibilityRole="button"
                accessibilityLabel="Seleccionar fecha de nacimiento"
                accessibilityHint="Abre el selector de fecha"
                style={[
                  styles.inputBorder,
                  {
                    borderColor: colors.primary,
                    paddingVertical: 15,
                  },
                ]}
              >
                <ThemedText type="titleSm">
                  {date.toLocaleDateString()}
                </ThemedText>
              </TouchableOpacity>
            ) : (
              <TextInput
                placeholder="Escribe aquí..."
                value={value}
                onChangeText={onChangeText}
                autoFocus
                autoCapitalize={field === "nombre" ? "words" : "none"}
                keyboardType={field === "telefono" ? "phone-pad" : "default"}
                returnKeyType="done"
                onSubmitEditing={handleSave}
                accessibilityLabel={title}
                placeholderTextColor={colors.textSecondary}
                style={[
                  styles.textInput,
                  {
                    borderColor:
                      value.length > 0 ? colors.primary : colors.border,
                    color: colors.text,
                  },
                ]}
              />
            )}

            {validationError ? (
              <ThemedText
                type="caption"
                tone="danger"
                style={{ marginTop: 8 }}
                accessibilityLiveRegion="polite"
              >
                {validationError}
              </ThemedText>
            ) : null}

            {showDatePicker && (
              <View style={styles.datePickerWrap}>
                {Platform.OS === "ios" && (
                  <View style={styles.dateToolbar}>
                    <TouchableOpacity
                      onPress={cancelDate}
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
                )}
                <DateTimePicker
                  value={Platform.OS === "ios" ? pendingDate : date}
                  mode="date"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={onDateChange}
                  maximumDate={new Date()}
                  accessibilityLabel="Selector de fecha de nacimiento"
                />
              </View>
            )}
          </View>

          <View style={{ marginBottom: Platform.OS === "ios" ? 40 : 20 }}>
            <PrimaryButton
              title="Guardar cambios"
              onPress={handleSave}
              loading={isPending}
              disabled={isSaveDisabled}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  headerTitleWrap: { marginBottom: 32 },
  inputBorder: { borderBottomWidth: 2, marginBottom: 20 },
  textInput: { fontSize: 24, paddingVertical: 12, borderBottomWidth: 2 },
  datePickerWrap: { marginTop: 8 },
  dateToolbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
});

export default Index;
