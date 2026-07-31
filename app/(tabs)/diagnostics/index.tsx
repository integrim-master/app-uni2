import BrandSpinner from "@/src/components/shared/BrandSpinner";
import { Screen } from "@/src/components/shared/Screen";
import { useTheme } from "@/src/context/ThemeContext";
import ResultView from "@/src/modules/diagnostics/components/ResultView";
import StepOne from "@/src/modules/diagnostics/components/StepOne";
import { useLastDiagnosticSuspense } from "@/src/modules/diagnostics/hooks/useLastDiagnostic";
import { useUser } from "@/src/modules/user/hooks/useUser";
import { router } from "expo-router";
import React, { Suspense } from "react";
import { View } from "react-native";

function DiagnosticsLoading() {
  const { colors } = useTheme();
  return (
    <View style={{ backgroundColor: colors.background }}>
      <BrandSpinner />
    </View>
  );
}

export default function DiagnosticsIndex() {
  const { data: user, isLoading: isUserLoading } = useUser();

  if (isUserLoading || !user?.user_id) {
    return <DiagnosticsLoading />;
  }

  return (
    <Suspense fallback={<DiagnosticsLoading />}>
      <DiagnosticsContent userId={String(user.user_id)} />
    </Suspense>
  );
}

function DiagnosticsContent({ userId }: { userId: string }) {
  const { data: lastDiagnostic } = useLastDiagnosticSuspense(userId);
  const diagnostic = lastDiagnostic?.data ?? null;

  if (diagnostic) {
    return (
      <ResultView
        photoUri={
          diagnostic.imagen_url ? { uri: diagnostic.imagen_url } : undefined
        }
        diagnostic={diagnostic}
        onReset={() => router.replace("/(tabs)/home")}
        onNewDiagnostic={() => router.push("/scan/camera")}
      />
    );
  }

  return (
    <Screen fullWidth safeArea={false}>
      <StepOne />
    </Screen>
  );
}
