import PrimaryButton from "@/src/components/shared/PrimaryButton";
import { Screen } from "@/src/components/shared/Screen";
import ThemedText from "@/src/components/shared/themed-text";
import { ui } from "@/src/themes/ui";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";

interface ErrorScreenProps {
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
}

/**
 * Errores de CARGA (queries): usar esta pantalla con onRetry.
 * Errores de MUTACIÓN: usar showErrorToast(), no esta pantalla.
 */
const ErrorScreen: React.FC<ErrorScreenProps> = ({
  message,
  onRetry,
  retryLabel = "Reintentar",
}) => (
  <Screen style={styles.errorContainer}>
    <Ionicons name="alert-circle-outline" size={64} color="#E53935" />
    <View style={styles.copy}>
      <ThemedText type="title" tone="danger" align="center">
        Algo salió mal
      </ThemedText>
      <ThemedText type="body" tone="danger" align="center">
        {message ??
          "No fue posible cargar la información. Verifica tu conexión e inténtalo nuevamente."}
      </ThemedText>
    </View>
    {onRetry ? (
      <View style={styles.retryWrap}>
        <PrimaryButton title={retryLabel} onPress={onRetry} size="md" />
      </View>
    ) : null}
  </Screen>
);

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: ui.spacing.xxl,
    backgroundColor: "#FFF5F5",
  },
  copy: {
    marginTop: ui.spacing.lg,
    gap: ui.spacing.md,
    alignItems: "center",
  },
  retryWrap: {
    marginTop: ui.spacing.xl,
    width: "100%",
    maxWidth: 280,
  },
});

export default ErrorScreen;
