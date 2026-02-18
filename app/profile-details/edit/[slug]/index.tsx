import EmptySvgPush from "@/assets/svg/Push.svg";
import { BackButton } from "@/src/components/shared/BackButton";
import PrimaryButton from "@/src/components/shared/PrimaryButton";
import { Screen } from "@/src/components/shared/Screen";
import ThemedText from "@/src/components/shared/themed-text";
import { useTheme } from "@/src/context/ThemeContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AnimatePresence, MotiView } from "moti";
import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, TextInput, View } from "react-native";
import { Easing } from "react-native-reanimated";

const Index = () => {
  const { slug, name } = useLocalSearchParams();
  const { colors } = useTheme();
  const router = useRouter();

  const [value, setValue] = useState((slug as string) || "");

  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  // Comentamos el hook real por ahora:
  // const { mutate: updateProfile } = useEditProfile();

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
    setIsPending(true);

    setTimeout(() => {
      setIsPending(false);
      setIsSuccess(true);

      /* 
      updateProfile(
        { [name as string]: value },
        {
          onSuccess: () => setIsSuccess(true),
          onError: () => setIsPending(false),
        }
      );
      */
    }, 6000);
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
            <View className="flex gap-10">
              <EmptySvgPush width={180} height={180} />
              <View>
                <ThemedText type="subtitle" color={colors.textDark}>
                  Listo
                </ThemedText>
                <ThemedText type="body" color={colors.textSecondary}>
                  Gracias por ayudarnos a tener tus datos al día. Puedes seguir
                  editando tu perfil cuando quieras desde la sección de
                  detalles.
                </ThemedText>
              </View>
            </View>
            <PrimaryButton
              style={{
                marginBottom: 20,
              }}
              title="Continuar"
              onPress={() => router.back()}
            />
          </MotiView>
        ) : isPending ? (
          <MotiView
            key="loading"
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 justify-end  p-10"
          >
            <View style={{ width: "100%", alignItems: "flex-start" }}>
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
                    duration: 6000,
                    easing: Easing.linear,
                  }}
                  style={{
                    height: "100%",
                    backgroundColor: colors.primary,
                  }}
                />
              </View>
            </View>
          </MotiView>
        ) : (
          <MotiView
            key="form"
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ flex: 1 }}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={{ flex: 1 }}
            >
              <View className="flex flex-1  mt-4 mb-10 p-6">
                <View className="flex-1 ">
                  <ThemedText
                    type="title"
                    style={{ fontSize: 28, marginBottom: 40 }}
                  >
                    {name === "nombre"
                      ? "Cómo quieres que te llamemos"
                      : `Editar ${name?.toString().replace("_", " ")}`}
                  </ThemedText>

                  <TextInput
                    placeholder="Escribe aquí..."
                    placeholderTextColor={colors.textSecondary + "80"}
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
                  {name === "nombre" && (
                    <ThemedText
                      type="caption"
                      color={colors.textSecondary}
                      style={{ marginTop: 20 }}
                    >
                      Este sera tu nombre de usuario visible en la plataforma.
                      Puedes cambiarlo cuando quieras desde la sección de
                      detalles de tu perfil.
                    </ThemedText>
                  )}
                </View>

                <View
                  style={{
                    width: "100%",
                    marginBottom: Platform.OS === "ios" ? 60 : 30,
                  }}
                >
                  <PrimaryButton
                    title="Guardar cambios"
                    onPress={handleSave}
                    disabled={!value.trim()}
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
