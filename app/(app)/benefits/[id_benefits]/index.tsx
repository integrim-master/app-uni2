import { Screen } from "@/src/components/shared/Screen";
import ThemedText from "@/src/components/shared/themed-text";
import { useTheme } from "@/src/context/ThemeContext";
import { useBenefit } from "@/src/modules/benefits/hooks/useBenefits";
import { useCancel } from "@/src/modules/benefits/hooks/useCancelBenefits";
import { useRedemed } from "@/src/modules/benefits/hooks/useRedem";
import BenefitsDetailsScreen from "@/src/modules/benefits/screens/BenefitsDetailsScreen";
import { useUser } from "@/src/modules/user/hooks/useUser";
import { ui } from "@/src/themes/ui";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function BenefitDetailsRoute() {
  const { id_benefits } = useLocalSearchParams<{ id_benefits: string }>();
  const { colors } = useTheme();
  const { data: benefit, isLoading, isError, error } = useBenefit(id_benefits);
  const { data: user } = useUser();
  const { mutate: mutateRedeem, isPending: isPendingRedeem } = useRedemed();
  const { mutate: mutateCancel, isPending: isPendingCancel } = useCancel();

  const handleAction = (action: "aplicar" | "cancelar") => {
    if (!benefit?.id) return;

    if (action === "aplicar") {
      mutateRedeem({
        telefono: user?.user_phone || "0000000000",
        nombre: user?.user_name || "Nombre Usuario",
        procedimiento: benefit.title,
        identificacion: user?.user_identificacion || "00000000",
        sede: user?.user_sede || "Sede Principal",
        user_id: String(user?.user_id || ""),
        procedimiento_id: String(benefit.id),
      });
    } else {
      mutateCancel({
        user_id: String(user?.user_id || ""),
        procedimiento_id: String(benefit.id),
      });
    }
  };

  if (isError) {
    return (
      <Screen>
        <View style={styles.errorWrap}>
          <ThemedText type="title" align="center">
            Error al cargar el beneficio
          </ThemedText>
          <ThemedText type="body" color={colors.danger} align="center">
            {error?.message || "Ha ocurrido un error inesperado"}
          </ThemedText>
        </View>
      </Screen>
    );
  }

  return (
    <BenefitsDetailsScreen
      benefit={benefit}
      onAction={handleAction}
      isPending={isLoading}
      isLoadingAction={isPendingRedeem || isPendingCancel}
    />
  );
}

const styles = StyleSheet.create({
  errorWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: ui.spacing.sm,
  },
});
