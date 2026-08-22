import EmptySvg from "@/assets/svg/Empty.svg";

import { Screen } from "@/src/components/shared/Screen";
import TabBar from "@/src/components/shared/TabBar";
import ThemedText from "@/src/components/shared/themed-text";
import ErrorScreen from "@/src/components/ui/ErrorScreen";
import { useUser } from "@/src/modules/user/hooks/useUser";
import { ui } from "@/src/themes/ui";
import { Benefits } from "@/src/types/shared/Benefits.type";
import { router, useFocusEffect } from "expo-router";
import { AnimatePresence } from "moti";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../../context/ThemeContext";
import BenefitsList from "../components/BenefitsList";
import BenefitsListSkeleton from "../components/BenefitsListSkeleton";
import { useCancel } from "../hooks/useCancelBenefits";
import { useRedemed } from "../hooks/useRedem";
import { BeneficiosScreenProps } from "../types/benefits.types";

export default function BeneficiosScreen({
  refreshing,
  activeTab,
  membership,
  setActiveTab,
  onRefresh,
  loading,
  error,
}: BeneficiosScreenProps & { error?: any }) {
  const { colors } = useTheme();
  const { mutate, isPending } = useRedemed();
  const { mutate: mutateCancel } = useCancel();
  const { data: user } = useUser();
  const [activeBenefitId, setActiveBenefitId] = useState<string | null>(null);
  const [benefitsRedemed, setBenefitsRedemed] = useState<any>(
    membership?.benefit_redeem,
  );

  useFocusEffect(
    React.useCallback(() => {
      setBenefitsRedemed(membership?.benefit_redeem);
    }, [membership]),
  );

  if (error) {
    return (
      <ErrorScreen
        message={
          error?.message ||
          "Ocurrió un error al cargar los beneficios. Intenta nuevamente."
        }
        onRetry={onRefresh}
      />
    );
  }

  const benefits = membership?.benefits;
  const benefitsUsed = membership?.benefits_used || [];
  const anyCanjeados = benefitsUsed.length > 0;

  const handleBenefitPress = (benefit: Benefits) => {
    router.push(`/benefits/${benefit.id}`);
  };

  const handleApplyBenefit = (
    benefit: Benefits,
    action: "aplicar" | "cancelar",
  ) => {
    if (action === "aplicar") {
      setActiveBenefitId(String(benefit.id));
      setBenefitsRedemed({
        procedimiento: benefit.title,
        id_procedimiento: String(benefit.id),
        estado: "En espera",
      });
      mutate(
        {
          telefono: user?.user_phone || "0000000000",
          nombre: user?.user_name || "Nombre Usuario",
          procedimiento: benefit.title,
          identificacion: user?.user_identificacion || "00000000",
          sede: user?.user_sede || "Sede Principal",
          user_id: String(user?.user_id || ""),
          procedimiento_id: String(benefit.id),
        },
        {
          onSuccess: (data) => {
            if (!data.success) {
              setActiveBenefitId(null);
              setBenefitsRedemed(null);
            }
          },
          onError: () => {
            setActiveBenefitId(null);
            setBenefitsRedemed(null);
          },
        },
      );
    } else {
      setActiveBenefitId(null);
      setBenefitsRedemed(null);
      mutateCancel(
        {
          user_id: String(user?.user_id || ""),
          procedimiento_id: String(benefit.id),
        },
        {
          onError: () => {
            setActiveBenefitId(String(benefit.id));
          },
        },
      );
    }
  };

  if (loading || !benefits) {
    return (
      <Screen>
        <SafeAreaView style={styles.loadingSafe}>
          <View style={styles.loadingInner}>
            <BenefitsListSkeleton />
          </View>
        </SafeAreaView>
      </Screen>
    );
  }

  return (
    <Screen>
      <View style={styles.tabWrap}>
        <TabBar
          options={[
            { key: "disponibles", label: "Disponibles" },
            { key: "canjeados", label: "Canjeados" },
          ]}
          activeTab={activeTab}
          setActiveTab={(tab: string) =>
            setActiveTab(tab as "disponibles" | "canjeados")
          }
        />
      </View>

      <View style={styles.listWrap}>
        <AnimatePresence exitBeforeEnter>
          {activeTab === "disponibles" && (
            <BenefitsList
              benefits={benefits}
              benefitsUsed={benefitsUsed}
              benefitsRedemed={benefitsRedemed}
              loading={loading}
              activeBenefitId={activeBenefitId}
              isPendingRedeem={isPending}
              refreshing={refreshing}
              onRefresh={onRefresh}
              onBenefitRedemed={handleApplyBenefit}
              onBenefitViewDetails={handleBenefitPress}
              emptyMessage="No cuentas con beneficios disponibles"
              filterUsed="available"
              animationKey="disponibles"
            />
          )}

          {activeTab === "canjeados" && (
            <>
              {!anyCanjeados ? (
                <View style={styles.emptyContainer}>
                  <EmptySvg
                    width={240}
                    height={240}
                    style={styles.emptyImage}
                  />
                  <View style={styles.emptyCopy}>
                    <ThemedText type="title" tone="primary" align="center">
                      No hay beneficios canjeados
                    </ThemedText>

                    <ThemedText
                      type="body"
                      color={colors.textSecondary}
                      align="center"
                    >
                      Cuando canjees un beneficio, aparecerá aquí para que lo
                      revises y lo uses.
                    </ThemedText>
                  </View>
                </View>
              ) : (
                <BenefitsList
                  activeBenefitId={activeBenefitId}
                  benefits={benefits}
                  benefitsUsed={benefitsUsed}
                  loading={loading}
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  onBenefitRedemed={handleApplyBenefit}
                  onBenefitViewDetails={handleBenefitPress}
                  emptyMessage="No cuentas con beneficios canjeados"
                  filterUsed="used"
                  animationKey="canjeados-list"
                />
              )}
            </>
          )}
        </AnimatePresence>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  loadingSafe: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  loadingInner: {
    width: "100%",
    flex: 1,
  },
  tabWrap: {
    paddingVertical: ui.spacing.md,
  },
  listWrap: {
    flex: 1,
    position: "relative",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: ui.spacing.xxl,
  },
  emptyImage: {},
  emptyCopy: {
    gap: ui.spacing.sm,
    alignItems: "center",
    paddingHorizontal: ui.spacing.lg,
  },
});
