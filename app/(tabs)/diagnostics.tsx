import { Screen } from "@/src/components/shared/Screen";
import { useAuth } from "@/src/context/AuthContext";
import { useTheme } from "@/src/context/ThemeContext";
import ResultView from "@/src/modules/diagnostics/components/ResultView";
import StepOne from "@/src/modules/diagnostics/components/StepOne";
import {
  useClearDiagnosticSession,
  useDiagnosticSession,
} from "@/src/modules/diagnostics/hooks/useDiagnosticSession";
import { useLastDiagnostic } from "@/src/n8n/hooks/useLastDiagnostic";
import { MaterialIcons } from "@expo/vector-icons";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import React from "react";
import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";

export default function DiagnosticsTab() {
  const { colors } = useTheme();
  const { user, token } = useAuth();
  const queryClient = useQueryClient();
  const clearSession = useClearDiagnosticSession();

  const { data: sessionDiagnostic } = useDiagnosticSession();
  const { data: lastDiagnostic, isLoading } = useLastDiagnostic({
    userId: String(user?.user_id),
    token: String(token),
  });

  const diagnostic = sessionDiagnostic ?? lastDiagnostic?.data ?? null;
  const photoUri = sessionDiagnostic?.photoUri ?? undefined;

  if (isLoading && !diagnostic) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (diagnostic) {
    return (
      <ResultView
        photoUri={photoUri}
        diagnostic={diagnostic}
        onReset={() => router.replace("/(tabs)/home")}
        onNewDiagnostic={() => {
          clearSession();
          queryClient.removeQueries({
            queryKey: ["last-diagnostic", String(user?.user_id)],
          });
          router.push("/diagnosis/camera");
        }}
      />
    );
  }

  return (
    <Screen>
      <View style={styles.container}>
        <StepOne />

        <Pressable
          style={[styles.fabNav, { backgroundColor: colors.primary }]}
          onPress={() => router.push("/diagnosis/camera")}
        >
          <MaterialIcons name="arrow-forward-ios" size={28} color="#fff" />
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  fabNav: {
    position: "absolute",
    bottom: 32,
    right: 24,
    zIndex: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
});
