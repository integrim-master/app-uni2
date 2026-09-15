import { Screen } from "@/src/components/shared/Screen";
import ThemedText from "@/src/components/shared/themed-text";
import { useTheme } from "@/src/context/ThemeContext";
import { useVerifyOtp } from "@/src/modules/login/hooks/useVerifyOtp";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    TextInput,
    View,
} from "react-native";
import Toast from "react-native-toast-message";

function paramToString(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

const Verify = () => {
  const { mutate, isPending } = useVerifyOtp();

  const { colors } = useTheme();
  const params = useLocalSearchParams<{
    phone_masked?: string | string[];
    message?: string | string[];
    username?: string | string[];
  }>();

  const phoneMasked = useMemo(
    () => paramToString(params.phone_masked),
    [params.phone_masked],
  );
  const message = useMemo(
    () => paramToString(params.message),
    [params.message],
  );

  const [code, setCode] = useState("");

  const handleVerifyOtp = () => {
    mutate(
      { username: paramToString(params.username), otp: code },
      {
        onSuccess: (data) => {
          router.push({
            pathname: "/forgot-password/reset",
            params: {
              username: paramToString(params.username),
              reset_token: data.reset_token,
            },
          });
        },
        onError: (error) => {
          Toast.show({
            type: "error",
            text1: error.message,
          });
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
            <ThemedText type="display" tone="primary" style={styles.title}>
              Ingresa el código
            </ThemedText>

            <ThemedText type="body" tone="secondary" style={styles.subtitle}>
              {message ||
                "Se ha enviado un código de verificación por WhatsApp."}
            </ThemedText>

            {phoneMasked ? (
              <ThemedText type="semiBold" style={styles.phone}>
                Enviado a {phoneMasked}
              </ThemedText>
            ) : null}

            <TextInput
              placeholder="Código de verificación"
              value={code}
              onChangeText={setCode}
              keyboardType="number-pad"
              maxLength={6}
              autoFocus
              className="border-b-2 bg-transparent"
              style={{
                borderColor: colors.border,
                color: colors.text,
                marginTop: 24,
                letterSpacing: 4,
              }}
            />
          </View>

          {code.length > 0 && (
            <View style={styles.buttonWrap}>
              <Pressable
                onPress={handleVerifyOtp}
                disabled={isPending}
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
  subtitle: {
    marginBottom: 8,
  },
  phone: {
    marginTop: 4,
  },
  buttonWrap: {
    alignItems: "flex-end",
    marginBottom: Platform.OS === "ios" ? 24 : 16,
  },
});

export default Verify;
