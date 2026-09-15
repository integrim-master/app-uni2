import PrimaryButton from "@/src/components/shared/PrimaryButton";
import { Screen } from "@/src/components/shared/Screen";
import ThemedText from "@/src/components/shared/themed-text";
import { useTheme } from "@/src/context/ThemeContext";
import { useForgotPassword } from "@/src/modules/login/hooks/useForgotPassword";
import { Ionicons } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Link, router } from "expo-router";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

const ForgotPassword = () => {
  const { colors } = useTheme();
  const { mutate, isPending } = useForgotPassword();
  const [username, setUsername] = useState("");
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["35%"], []);

  const close = () => {
    bottomSheetRef.current?.dismiss();
  };

  const open = () => {
    bottomSheetRef.current?.present();
  };

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="close"
        opacity={0.5}
      />
    ),
    [],
  );

  const handleForgotPassword = () => {
    if (username.length === 0) {
      return;
    }
    mutate(
      { username },
      {
        onSuccess: (data) => {
          const raw = typeof data === "string" ? data : JSON.stringify(data);
          const jsonStart = raw.indexOf("{");
          const parsed = JSON.parse(raw.slice(jsonStart));

          router.push({
            pathname: "/forgot-password/verify",
            params: {
              phone_masked: parsed.phone_masked,
              message: parsed.message,
              username,
            },
          });
        },
        onError: () => {
          Keyboard.dismiss();
          open();
        },
      },
    );
  };

  return (
    <Screen safeArea>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
        keyboardVerticalOffset={100}
      >
        <View style={styles.body}>
          <View style={styles.flex}>
            <ThemedText type="display" style={styles.title}>
              Ingresa tu usuario
            </ThemedText>

            <TextInput
              placeholder="Ingresa tu usuario"
              value={username}
              onChangeText={setUsername}
              className="border-b-2 bg-transparent"
              style={{
                borderColor: colors.border,
                color: colors.text,
              }}
            />

            <Link href="/login" style={styles.link}>
              <View className="flex flex-row items-center gap-2 justify-center">
                <ThemedText type="semiBold" tone="primary">
                  Olvide mi usuario
                </ThemedText>
                <Ionicons
                  name="arrow-forward"
                  size={20}
                  color={colors.primary}
                />
              </View>
            </Link>
          </View>

          {username.length > 0 && (
            <View style={styles.buttonWrap}>
              <Pressable
                disabled={isPending}
                onPress={handleForgotPassword}
                style={{ backgroundColor: colors.primary }}
                className="p-2 rounded-full w-16 h-16 items-center justify-center"
              >
                {isPending ? (
                  <ActivityIndicator size="small" color={colors.text} />
                ) : (
                  <Ionicons
                    name="arrow-forward"
                    size={20}
                    color={colors.text}
                  />
                )}
              </Pressable>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>

      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        onDismiss={close}
        backgroundStyle={{ backgroundColor: colors.background }}
        handleIndicatorStyle={{ backgroundColor: colors.text }}
      >
        <BottomSheetView className="p-4 flex flex-col justify-center gap-4">
          <Pressable onPress={close}>
            <Ionicons name="close" size={24} color={colors.text} />
          </Pressable>
          <ThemedText type="title">
            Tu nombre de usuario no es válido o esta mal escrito
          </ThemedText>
          <ThemedText type="body">Revisa y vuelve a intentarlo</ThemedText>
          <PrimaryButton onPress={close} title="Intentar de nuevo" />
        </BottomSheetView>
      </BottomSheetModal>
    </Screen>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  body: {
    flex: 1,
    gap: 16,
  },
  title: {
    marginBottom: 8,
  },
  link: {
    marginTop: 16,
  },
  buttonWrap: {
    alignItems: "flex-end",
    marginBottom: Platform.OS === "ios" ? 24 : 16,
  },
  sheet: {
    padding: 24,
  },
});

export default ForgotPassword;
