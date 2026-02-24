import EmptySvgPush from "@/assets/svg/Push.svg";
import { BackButton } from "@/src/components/shared/BackButton";
import PrimaryButton from "@/src/components/shared/PrimaryButton";
import { Screen } from "@/src/components/shared/Screen";
import ThemedText from "@/src/components/shared/themed-text";
import { useTheme } from "@/src/context/ThemeContext";
import { useEditProfile } from "@/src/modules/profile/hooks/useEditProfile";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AnimatePresence, MotiView } from "moti";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
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
  const { mutate: updateProfile, isPending } = useEditProfile();
  const queryClient = useQueryClient();

  const [index, setIndex] = useState(0);
  const texts = [
    "Actualizando datos",
    "Conectando al servidor",
    "Casi terminamos",
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPending) {
      interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % texts.length);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isPending]);

  const handleSave = () => {
    const finalValue =
      name === "fnacimiento" ? date.toISOString().split("T")[0] : value;

    updateProfile(
      { [name as string]: finalValue },
      {
        onSuccess: () => {
          queryClient.setQueryData(["profile-info"], (old: any) => {
            if (!old) return old;
            return {
              ...old,
              [name as string]: finalValue,
            };
          });

          setIsSuccess(true);
        },
        onError: () => {
          throw new Error("Error al actualizar el perfil");
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
            className="flex flex-col justify-around h-full p-4"
          >
            <View className="flex gap-10 items-center">
              <EmptySvgPush width={180} height={180} />
              <View>
                <ThemedText type="subtitle" style={{ textAlign: "center" }}>
                  Listo
                </ThemedText>
                <ThemedText
                  type="body"
                  style={{ textAlign: "center", marginTop: 10 }}
                >
                  Tu perfil ha sido actualizado correctamente.
                </ThemedText>
              </View>
            </View>
            <PrimaryButton title="Continuar" onPress={() => router.back()} />
          </MotiView>
        ) : isPending ? (
          <MotiView
            key="loading"
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 justify-center p-10"
          >
            <AnimatePresence exitBeforeEnter>
              <MotiView
                key={index}
                from={{ opacity: 0, translateY: 15 }}
                animate={{ opacity: 1, translateY: 0 }}
                exit={{ opacity: 0, translateY: -15 }}
                transition={{ type: "timing", duration: 500 }}
              >
                <ThemedText type="title" style={{ textAlign: "center" }}>
                  {texts[index]}
                </ThemedText>
              </MotiView>
            </AnimatePresence>
            <View
              style={{
                height: 6,
                width: "100%",
                backgroundColor: colors.border,
                borderRadius: 3,
                marginTop: 30,
                overflow: "hidden",
              }}
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
              <View className="flex flex-1 mt-4 p-6">
                <View className="flex-1">
                  <ThemedText
                    type="title"
                    style={{ fontSize: 28, marginBottom: 40 }}
                  >
                    {name === "nombre"
                      ? "Cómo quieres que te llamemos"
                      : name === "fnacimiento"
                        ? "Fecha de nacimiento"
                        : `Editar ${name?.toString().replace("_", " ")}`}
                  </ThemedText>

                  {name === "type_id" ? (
                    <View
                      style={{
                        borderBottomWidth: 2,
                        borderColor: colors.primary,
                        marginBottom: 20,
                      }}
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
                      style={{
                        borderBottomWidth: 2,
                        borderColor: colors.primary,
                        paddingVertical: 10,
                      }}
                    >
                      <ThemedText style={{ fontSize: 24 }}>
                        {date.toLocaleDateString()}
                      </ThemedText>
                    </TouchableOpacity>
                  ) : (
                    <TextInput
                      placeholder="Escribe aquí..."
                      value={value}
                      onChangeText={setValue}
                      autoFocus
                      className="text-2xl py-3 border-b-2"
                      style={{
                        borderColor:
                          value.length > 0 ? colors.primary : colors.border,
                        color: colors.text,
                      }}
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
                    disabled={name !== "fnacimiento" && !value.trim()}
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

export default Index;
