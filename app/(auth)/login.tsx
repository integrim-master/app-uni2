import ConfirmActionModal from "@/src/components/shared/Modal";
import PrimaryButton from "@/src/components/shared/PrimaryButton";
import { Screen } from "@/src/components/shared/Screen";
import ThemedText from "@/src/components/shared/themed-text";
import { useAuth } from "@/src/context/AuthContext";
import { useNotifications } from "@/src/context/notifications";
import { useTheme } from "@/src/context/ThemeContext";
import { useLogin } from "@/src/modules/login/hooks/useLogin";
import { useSendNotifications } from "@/src/modules/login/hooks/useNotifications";
import { useTerms } from "@/src/modules/login/hooks/useTerms";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

const Login = () => {
  const { colors } = useTheme();
  const { mutate, isPending } = useLogin();
  const { mutate: acceptTerms, isPending: isLoadinPrivacy } = useTerms();
  const { login, logout } = useAuth();
  const { pushToken } = useNotifications();

  const { mutate: sendTokenNotifications } = useSendNotifications();

  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const [dataUser, setDataUser] = useState({
    username: "",
    password: "",
  });

  const handleAcceptPrivacy = () => {
    acceptTerms(undefined, {
      onSuccess: async () => {
        setShowPrivacyModal(false);
        router.replace("/home");
      },
      onError: (error: any) => {
        Toast.show({
          type: "error",
          text1: "Error",
          text2:
            error?.response?.data?.message ||
            "No se pudieron aceptar los términos",
        });
      },
    });
  };

  const handleLogin = () => {
    if (!dataUser.username || !dataUser.password) {
      Toast.show({
        type: "error",
        text1: "Campos requeridos",
        text2: "Debes completar usuario y contraseña",
      });
      return;
    }

    mutate(
      {
        username: dataUser.username,
        password: dataUser.password,
      },
      {
        onSuccess: async (data) => {
          await login(
            data.token,
            data.user_data,
            data.membership_data,
            data.tratamientos_careme,
            data.treatments_suggest,
            data.promotions,
            data.ultimas_citas,
          );

          if (pushToken) {
            const platform = Platform.OS === "ios" ? "ios" : "android";
            sendTokenNotifications(
              { expo_token: pushToken, platform },
              {
                onError: (error) => {
                  console.error("Error enviando push token:", error);
                },
              },
            );
          }

          if (data.user_data.user_terms !== "Aceptado") {
            setShowPrivacyModal(true);
          } else {
            router.replace("/home");
          }
        },
        onError: (error: any) => {
          Toast.show({
            type: "error",
            text1: "Credenciales inválidas",
            text2:
              error?.response?.data?.message ||
              "Usuario o contraseña incorrectos",
          });
        },
      },
    );
  };

  return (
    <Screen style={styles.safeArea}>
      <ConfirmActionModal
        visible={showPrivacyModal}
        title="Política de privacidad"
        loading={isLoadinPrivacy}
        variant="warning"
        confirmText="Aceptar"
        onConfirm={handleAcceptPrivacy}
        onCancel={() => {
          setShowPrivacyModal(false);
          logout();
        }}
        description={
          <>
            <ThemedText
              type="caption"
              style={{ marginBottom: 20, textAlign: "center" }}
            >
              Para continuar, debes aceptar nuestra política de privacidad. Por
              favor, revisa los términos y condiciones en el siguiente link.
            </ThemedText>

            <ThemedText
              type="link"
              style={{ marginBottom: 20, textAlign: "center" }}
              onPress={() => {
                import("react-native").then(({ Linking }) => {
                  Linking.openURL(
                    "https://careme360.com/wp-content/uploads/2026/01/POLITICA-DE-TRATAMIENTO-DE-DATOS-CARE-ME-1.pdf",
                  );
                });
              }}
            >
              Ver Política de Privacidad
            </ThemedText>
          </>
        }
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <View style={styles.header}>
              <Image
                source={require("@/assets/images/logo-careme-white.png")}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            <View
              style={[styles.formContainer, { backgroundColor: colors.card }]}
            >
              <View style={{ marginBottom: 24, alignItems: "center" }}>
                <ThemedText
                  type="title"
                  style={[styles.welcomeText, { color: colors.text }]}
                >
                  Bienvenido
                </ThemedText>
                <ThemedText
                  style={[styles.subtitleText, { color: colors.textSecondary }]}
                >
                  Inicia sesión en tu cuenta
                </ThemedText>
              </View>

              <View style={styles.inputWrapper}>
                <ThemedText style={[styles.label, { color: colors.text }]}>
                  Usuario o Email
                </ThemedText>
                <TextInput
                  value={dataUser.username}
                  onChangeText={(text) =>
                    setDataUser({ ...dataUser, username: text })
                  }
                  style={[
                    styles.input,
                    {
                      backgroundColor: colors.backgroundLight,
                      borderColor: colors.border,
                      color: colors.text,
                    },
                  ]}
                  placeholder="Ingresa tu usuario"
                  placeholderTextColor={colors.textSecondary}
                />
              </View>

              <View style={styles.inputWrapper}>
                <ThemedText style={[styles.label, { color: colors.text }]}>
                  Contraseña
                </ThemedText>
                <TextInput
                  value={dataUser.password}
                  onChangeText={(text) =>
                    setDataUser({ ...dataUser, password: text })
                  }
                  style={[
                    styles.input,
                    {
                      backgroundColor: colors.backgroundLight,
                      borderColor: colors.border,
                      color: colors.text,
                    },
                  ]}
                  placeholder="Ingresa tu contraseña"
                  placeholderTextColor={colors.textSecondary}
                  secureTextEntry
                />
              </View>

              <Pressable style={styles.forgotPassword}>
                <ThemedText
                  style={[styles.forgotPasswordText, { color: colors.primary }]}
                >
                  ¿Olvidaste tu contraseña?
                </ThemedText>
              </Pressable>

              <PrimaryButton
                title="Iniciar Sesión"
                onPress={handleLogin}
                loading={isPending}
              />

              <View
                style={[styles.divider, { backgroundColor: colors.border }]}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  logo: {
    width: 200,
    height: 80,
    marginBottom: 16,
  },
  welcomeText: {
    marginBottom: 8,
  },
  subtitleText: {},
  formContainer: {
    borderRadius: 10,
    padding: 28,
    gap: 16,
  },
  inputWrapper: {
    marginBottom: 18,
  },
  label: {
    marginBottom: 8,
  },
  input: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    fontWeight: "500",
    borderWidth: 1,
  },
  forgotPassword: {
    alignSelf: "center",
  },
  forgotPasswordText: {},
  divider: {
    height: 1,
    marginVertical: 16,
  },
});

export default Login;
