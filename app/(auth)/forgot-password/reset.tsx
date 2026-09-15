import PrimaryButton from "@/src/components/shared/PrimaryButton";
import { Screen } from "@/src/components/shared/Screen";
import ThemedText from "@/src/components/shared/themed-text";
import { useTheme } from "@/src/context/ThemeContext";
import { useResetPassword } from "@/src/modules/login/hooks/useResetPassword";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import {
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

const Reset = () => {
  const { colors } = useTheme();
  const params = useLocalSearchParams<{
    username?: string | string[];
    reset_token?: string | string[];
  }>();

  const username = useMemo(
    () => paramToString(params.username),
    [params.username],
  );
  const resetToken = useMemo(
    () => paramToString(params.reset_token),
    [params.reset_token],
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { mutate, isPending } = useResetPassword();

  const canSubmit = password.length > 0 && confirmPassword.length > 0;

  const handleReset = () => {
    if (password !== confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Las contraseñas no coinciden",
      });
      return;
    }
    mutate(
      { reset_token: resetToken, password },
      {
        onSuccess: () => {
          Toast.show({
            type: "success",
            text1: "Contraseña restablecida correctamente",
          });
          router.replace("/login");
        },
        onError: (error) => {
          //   Toast.show({
          //     type: "error",
          //     text1: error.message,
          //   });
          setError(error.message);
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
        <View style={styles.body} className="pt-10">
          <View className="gap-2">
            <ThemedText type="display" tone="primary">
              {" "}
              Nueva contraseña
            </ThemedText>

            <ThemedText type="body" tone="secondary">
              Crea una contraseña segura para tu cuenta
            </ThemedText>

            <View style={styles.inputRow}>
              <TextInput
                placeholder="Nueva contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                // autoFocus
                className="border-b-2 bg-transparent flex-1"
                style={{
                  borderColor: colors.border,
                  color: colors.text,
                }}
              />
              <Pressable
                onPress={() => setShowPassword((prev) => !prev)}
                hitSlop={12}
                style={styles.eyeButton}
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color={colors.textSecondary}
                />
              </Pressable>
            </View>

            <View style={styles.inputRow}>
              <TextInput
                placeholder="Confirmar contraseña"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirm}
                className="border-b-2 bg-transparent flex-1"
                style={{
                  borderColor: colors.border,
                  color: colors.text,
                }}
              />
              <Pressable
                onPress={() => setShowConfirm((prev) => !prev)}
                hitSlop={12}
                style={styles.eyeButton}
              >
                <Ionicons
                  name={showConfirm ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color={colors.textSecondary}
                />
              </Pressable>
            </View>
            {error && (
              <ThemedText type="body" tone="danger">
                {error}
              </ThemedText>
            )}
          </View>

          {canSubmit && (
            <PrimaryButton
              title="Guardar"
              onPress={handleReset}
              disabled={!canSubmit}
              loading={isPending}
            />
          )}
          <PrimaryButton
            title="Cancelar"
            variant="secondary"
            onPress={() => router.back()}
            // disabled={!canSubmit}
            // loading={isPending}
          />
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
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 8,
  },
  eyeButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonWrap: {
    alignItems: "flex-end",
    marginBottom: Platform.OS === "ios" ? 24 : 16,
  },
});

export default Reset;
