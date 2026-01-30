import { Screen } from "@/src/components/shared/Screen";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text } from "react-native";

interface ErrorScreenProps {
  message?: string;
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({ message }) => (
  <Screen style={styles.errorContainer}>
    <Ionicons name="alert-circle-outline" size={64} color="#E53935" />
    <Text style={styles.errorTitle}>Algo salió mal</Text>
    <Text style={styles.errorMessage}>
      {message ??
        "No fue posible cargar la información. Verifica tu conexión a internet e inténtalo nuevamente."}
    </Text>
  </Screen>
);

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    backgroundColor: "#FFF5F5",
  },
  errorTitle: {
    marginTop: 16,
    fontSize: 22,
    fontWeight: "700",
    color: "#C62828",
    textAlign: "center",
  },
  errorMessage: {
    marginTop: 12,
    fontSize: 16,
    color: "#8E0000",
    textAlign: "center",
    lineHeight: 22,
  },
});

export default ErrorScreen;
