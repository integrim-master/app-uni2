import EmptySvgPush from "@/assets/svg/Push.svg";
import { BackButton } from "@/src/components/shared/BackButton";
import CustomPicker from "@/src/components/shared/CustomPicker";
import PrimaryButton from "@/src/components/shared/PrimaryButton";
import { Screen } from "@/src/components/shared/Screen";
import ThemedText from "@/src/components/shared/themed-text";
import { useTheme } from "@/src/context/ThemeContext";
import { useEditProfile } from "@/src/modules/profile/hooks/useEditProfile";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AnimatePresence, MotiView } from "moti";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Easing } from "react-native-reanimated";

const Index = () => {
  const { slug, name } = useLocalSearchParams();
  const { colors } = useTheme();
  const router = useRouter();

  const [value, setValue] = useState((slug as string) || "");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const { mutate: updateProfile, isPending } = useEditProfile();

  const [loadingIndex, setLoadingIndex] = useState(0);
  const loadingTexts = [
    "Actualizando datos",
    "Conectando al servidor",
    "Casi terminamos",
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPending) {
      interval = setInterval(() => {
        setLoadingIndex((prev) => (prev + 1) % loadingTexts.length);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isPending]);

  const handleSave = () => {
    let finalValue: string = value;

    if (name === "fnacimiento") {
      finalValue = date.toISOString().split("T")[0];
    } else if (name === "localizacion") {
      finalValue = `${city}, ${state}, ${country}`;
    }

    updateProfile(
      { [name as string]: finalValue },
      {
        onSuccess: () => {
          setIsSuccess(true);
        },
        onError: () => {
          console.error("Error al actualizar");
        },
      },
    );
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setDate(selectedDate);
      setValue(selectedDate.toLocaleDateString());
    }
  };

  return (
    <Screen
      safeArea
      leftButton={
        !isPending && <BackButton iconName={isSuccess ? "close" : undefined} />
      }
    >
      <AnimatePresence exitBeforeEnter>
        {isSuccess ? (
          <MotiView
            key="success"
            from={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={styles.fullCenter}
          >
            <View className="items-center gap-10">
              <EmptySvgPush width={180} height={180} />
              <View className="items-center gap-2">
                <ThemedText type="subtitle" align="center">
                  Listo
                </ThemedText>
                <ThemedText type="body" align="center">
                  Tu perfil ha sido actualizado correctamente.
                </ThemedText>
              </View>
            </View>
            <View style={{ width: "100%", marginTop: 40 }}>
              <PrimaryButton title="Continuar" onPress={() => router.back()} />
            </View>
          </MotiView>
        ) : isPending ? (
          <MotiView
            key="loading"
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={styles.loadingWrapper}
          >
            <AnimatePresence exitBeforeEnter>
              <MotiView
                key={loadingIndex}
                from={{ opacity: 0, translateY: 15 }}
                animate={{ opacity: 1, translateY: 0 }}
                exit={{ opacity: 0, translateY: -15 }}
                transition={{ type: "timing", duration: 500 }}
              >
                <ThemedText type="title" align="center">
                  {loadingTexts[loadingIndex]}
                </ThemedText>
              </MotiView>
            </AnimatePresence>
            <View
              style={[styles.progressBarBg, { backgroundColor: colors.border }]}
            >
              <MotiView
                from={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  type: "timing",
                  duration: 4000,
                  easing: Easing.linear,
                }}
                style={{ height: "100%", backgroundColor: colors.primary }}
              />
            </View>
          </MotiView>
        ) : (
          <MotiView
            key="form"
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ flex: 1 }}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={{ flex: 1 }}
            >
              <View className="flex-1 mt-4 p-6">
                <View className="flex-1">
                  <View style={styles.headerTitleWrap}>
                    <ThemedText type="display">
                      {name === "nombre"
                        ? "Cómo quieres que te llamemos"
                        : name === "fnacimiento"
                          ? "Fecha de nacimiento"
                          : name === "localizacion"
                            ? "Tu ubicación"
                            : `Editar ${name?.toString().replace("_", " ")}`}
                    </ThemedText>
                  </View>

                  {name === "localizacion" ? (
                    <View>
                      <CustomPicker
                        label="País"
                        selectedValue={country}
                        onValueChange={(v: string) => {
                          setCountry(v);
                          setState("");
                          setCity("");
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
                        onValueChange={(v: string) => setCity(v)}
                        items={[
                          { l: "Barranquilla", v: "BAQ" },
                          { l: "Medellín", v: "MED" },
                        ]}
                      />
                    </View>
                  ) : name === "type_id" ? (
                    <View
                      style={[
                        styles.inputBorder,
                        { borderColor: colors.primary },
                      ]}
                    >
                      <Picker
                        selectedValue={value}
                        onValueChange={(itemValue) => setValue(itemValue)}
                        style={{ color: colors.text }}
                      >
                        <Picker.Item
                          label="Selecciona tipo de identificación"
                          value=""
                        />
                        <Picker.Item label="Cédula" value="cc" />
                        <Picker.Item label="Pasaporte" value="ppto" />
                      </Picker>
                    </View>
                  ) : name === "fnacimiento" ? (
                    <TouchableOpacity
                      onPress={() => setShowDatePicker(true)}
                      style={[
                        styles.inputBorder,
                        { borderColor: colors.primary, paddingVertical: 15 },
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
                      onChangeText={setValue}
                      autoFocus
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

                  {showDatePicker && (
                    <DateTimePicker
                      value={date}
                      mode="date"
                      display={Platform.OS === "ios" ? "spinner" : "default"}
                      onChange={onDateChange}
                      maximumDate={new Date()}
                    />
                  )}
                </View>

                <View style={{ marginBottom: Platform.OS === "ios" ? 40 : 20 }}>
                  <PrimaryButton
                    title="Guardar cambios"
                    onPress={handleSave}
                    disabled={
                      name === "localizacion"
                        ? !country || !state || !city
                        : name !== "fnacimiento" && !value.trim()
                    }
                  />
                </View>
              </View>
            </KeyboardAvoidingView>
          </MotiView>
        )}
      </AnimatePresence>
    </Screen>
  );
};

const styles = StyleSheet.create({
  fullCenter: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    padding: 16,
  },
  loadingWrapper: { flex: 1, justifyContent: "center", padding: 40 },
  headerTitleWrap: { marginBottom: 32 },
  progressBarBg: {
    height: 6,
    width: "100%",
    borderRadius: 3,
    marginTop: 30,
    overflow: "hidden",
  },
  pickerContainer: { marginBottom: 20, borderBottomWidth: 2, paddingBottom: 4 },
  inputBorder: { borderBottomWidth: 2, marginBottom: 20 },
  textInput: { fontSize: 24, paddingVertical: 12, borderBottomWidth: 2 },
});

export default Index;
