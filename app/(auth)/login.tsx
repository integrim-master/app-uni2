import PrimaryButton from "@/components/shared/PrimaryButton";
import { Screen } from "@/components/shared/Screen";
import TitleText from "@/components/shared/TitleText";
import { useAuth } from "@/context/AuthContext";
import { useLogin } from "@/modules/login/hooks/useLogin";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { useTheme } from "../../context/ThemeContext";

const Login = () => {
  const { colors } = useTheme();
  const { mutate, isPending, isSuccess, isError, error } = useLogin();
  const { login } = useAuth();

  const [dataUser, setDataUser] = useState({
    username: "",
    password: "",
  });

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
          console.log("Login successful:", data);
          await login(data.token, data.user_data, data.membership_data);
          router.replace("/(tabs)/home");
        },

        onError: (error: any) => {
          console.log(error);
          Toast.show({
            type: "error",
            text1: "Credenciales inválidas",
            text2:
              error?.response?.data?.message ||
              "Usuario o contraseña incorrectos",
          });
        },
      }
    );
  };

  return (
    <Screen style={[styles.safeArea]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={[styles.container]}>
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
                <TitleText style={[styles.welcomeText, { color: colors.text }]}>
                  Bienvenido
                </TitleText>
                <Text
                  style={[styles.subtitleText, { color: colors.textSecondary }]}
                >
                  Inicia sesión en tu cuenta
                </Text>
              </View>

              <View style={styles.inputWrapper}>
                <Text style={[styles.label, { color: colors.text }]}>
                  Usuario o Email
                </Text>
                <TextInput
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
                <Text style={[styles.label, { color: colors.text }]}>
                  Contraseña
                </Text>
                <TextInput
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
                  secureTextEntry={true}
                />
              </View>

              <Pressable style={styles.forgotPassword}>
                <Text
                  style={[styles.forgotPasswordText, { color: colors.primary }]}
                >
                  ¿Olvidaste tu contraseña?
                </Text>
              </Pressable>

              <PrimaryButton
                title="Iniciar Sesión"
                onPress={handleLogin}
                loading={isPending}
                gradientColors={
                  [
                    colors.primaryLight,
                    colors.primaryDark ?? colors.primaryLight,
                  ] as any
                }
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
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 14,
    fontWeight: "600",
  },
  formContainer: {
    borderRadius: 10,
    padding: 28,
    gap: 16,
  },
  inputWrapper: {
    marginBottom: 18,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
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
  forgotPasswordText: {
    fontSize: 13,
    fontWeight: "500",
  },
  divider: {
    height: 1,
    marginVertical: 16,
  },
});

export default Login;
