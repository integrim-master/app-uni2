import ConfirmActionModal from "@/src/components/shared/ConfirmActionModal";
import PrimaryButton from "@/src/components/shared/PrimaryButton";
import { Screen } from "@/src/components/shared/Screen";
import ThemedText, { TYPE_SIZE } from "@/src/components/shared/themed-text";
import { useAuth } from "@/src/context/AuthContext";
import { useNotifications } from "@/src/context/notifications";
import { useTheme } from "@/src/context/ThemeContext";
import { useTerms } from "@/src/modules/login/hooks/useTerms";
import { ui } from "@/src/themes/ui";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

const Login = () => {
  const { colors } = useTheme();
  const { mutate: acceptTerms, isPending: isLoadinPrivacy } = useTerms();
  const { signIn, activateSession, logout, isAuthTransitioning } = useAuth();
  const { pushToken } = useNotifications();

  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [dataUser, setDataUser] = useState({
    username: "",
    password: "",
  });

  const handleAcceptPrivacy = () => {
    acceptTerms(undefined, {
      onSuccess: async () => {
        setShowPrivacyModal(false);
        try {
          await activateSession();
        } catch {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "No se pudo activar la sesión",
          });
        }
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

  const handleLogin = async () => {
    if (!dataUser.username || !dataUser.password) {
      Toast.show({
        type: "error",
        text1: "Campos requeridos",
        text2: "Debes completar usuario y contraseña",
      });
      return;
    }

    try {
      const result = await signIn(
        {
          username: dataUser.username,
          password: dataUser.password,
        },
        { pushToken },
      );

      if (result.needsTerms) {
        setShowPrivacyModal(true);
      }
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Credenciales inválidas",
        text2:
          error?.response?.data?.message || "Usuario o contraseña incorrectos",
      });
    }
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
            <ThemedText type="caption" align="center" style={styles.modalCopy}>
              Para continuar, debes aceptar nuestra política de privacidad. Por
              favor, revisa los términos y condiciones en el siguiente link.
            </ThemedText>

            <ThemedText
              type="link"
              align="center"
              style={styles.modalCopy}
              onPress={() => {
                Linking.openURL(
                  "https://careme360.com/wp-content/uploads/2026/01/POLITICA-DE-TRATAMIENTO-DE-DATOS-CARE-ME-1.pdf",
                );
              }}
            >
              Ver Política de Privacidad
            </ThemedText>
          </>
        }
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
      >
        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.scrollContent}
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
              <View style={styles.welcomeBlock}>
                <ThemedText type="title" style={styles.welcomeText}>
                  Bienvenido
                </ThemedText>
                <ThemedText type="body" tone="secondary">
                  Inicia sesión en tu cuenta
                </ThemedText>
              </View>

              <View style={styles.inputWrapper}>
                <ThemedText type="label" style={styles.label}>
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
                      backgroundColor: colors.backgroundElevated,
                      borderColor: colors.border,
                      color: colors.text,
                    },
                  ]}
                  placeholder="Ingresa tu usuario"
                  placeholderTextColor={colors.textSecondary}
                />
              </View>

              <View style={styles.inputWrapper}>
                <ThemedText type="label" style={styles.label}>
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
                      backgroundColor: colors.backgroundElevated,
                      borderColor: colors.border,
                      color: colors.text,
                    },
                  ]}
                  placeholder="Ingresa tu contraseña"
                  placeholderTextColor={colors.textSecondary}
                  secureTextEntry
                />
              </View>

              <PrimaryButton
                title="Iniciar Sesión"
                onPress={() => {
                  void handleLogin();
                }}
                loading={Boolean(isAuthTransitioning)}
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
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: ui.spacing.lg,
  },
  header: {
    alignItems: "center",
    marginBottom: ui.spacing.xxl,
  },
  logo: {
    width: 200,
    height: 80,
    marginBottom: ui.spacing.lg,
  },
  welcomeBlock: {
    marginBottom: ui.spacing.xl,
    alignItems: "center",
  },
  welcomeText: {
    marginBottom: ui.spacing.sm,
  },
  formContainer: {
    borderRadius: ui.radii.lg,
    padding: ui.spacing.xl,
    gap: ui.spacing.lg,
  },
  inputWrapper: {
    gap: ui.spacing.sm,
  },
  label: {
    marginBottom: 0,
  },
  input: {
    borderRadius: ui.radii.md,
    paddingHorizontal: ui.spacing.lg,
    paddingVertical: ui.spacing.md,
    fontSize: TYPE_SIZE.body,
    borderWidth: ui.borders.width,
    minHeight: ui.tapTarget,
  },
  modalCopy: {
    marginBottom: ui.spacing.xl,
  },
});

export default Login;
