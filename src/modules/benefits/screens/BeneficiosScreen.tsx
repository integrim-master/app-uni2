import EmptySvg from "@/assets/svg/Empty.svg";

import { Screen } from "@/src/components/shared/Screen";
import ThemedText from "@/src/components/shared/themed-text";
import ErrorScreen from "@/src/components/ui/ErrorScreen";
import { Benefits } from "@/src/types/shared/Benefits.type";
import { router, useFocusEffect } from "expo-router";
import { AnimatePresence } from "moti";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../../context/ThemeContext";
import { useUser } from "../../banner/hooks/userHome";
import TabBar from "../../home/components/TabBar";
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
  const { mutate, isPending, isError: isErrorRedeem } = useRedemed();
  const { mutate: mutateCancel, isError: isErrorCancel } = useCancel();
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
        <SafeAreaView
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 16,
            backgroundColor: "transparent",
          }}
        >
          <View style={{ width: "100%", flex: 1 }}>
            <BenefitsListSkeleton />
          </View>
        </SafeAreaView>
      </Screen>
    );
  }

  return (
    <Screen safeArea>
      <View style={styles.container}>
        <View style={{ paddingHorizontal: 16, paddingVertical: 10 }}>
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

        {(isErrorRedeem || isErrorCancel) && (
          <ErrorScreen
            message={
              isErrorRedeem
                ? "Ocurrió un error al canjear el beneficio. Intenta de nuevo."
                : "Ocurrió un error al cancelar el canje. Intenta de nuevo."
            }
          />
        )}

        <View style={{ flex: 1, position: "relative" }}>
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
                    <ThemedText
                      type="title"
                      style={[
                        styles.emptyTitle,
                        { color: colors.primaryLight },
                      ]}
                    >
                      No hay beneficios canjeados
                    </ThemedText>

                    <ThemedText
                      style={[
                        styles.emptyBody,
                        { color: colors.textSecondary },
                      ]}
                    >
                      Cuando canjees un beneficio, aparecerá aquí para que lo
                      revises y lo uses.
                    </ThemedText>
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
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,

    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  searchFilterRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  searchIcon: {
    fontSize: 20,
    fontWeight: "400",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    padding: 0,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  filterIcon: {
    fontSize: 20,
    color: "#fff",
  },
  bottomSheetContent: {
    flex: 1,
    padding: 20,
  },
  bottomSheetTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },

  absoluteFill: {
    position: "absolute",
    inset: 0,
    flex: 1,
    width: "100%",
    marginTop: 10,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 40,
  },
  emptyImage: {},
  emptyTitle: {
    textAlign: "center",
    marginBottom: 6,
  },
  emptySubtitle: {
    textAlign: "center",
    marginBottom: 4,
  },
  emptyBody: {
    textAlign: "center",
    marginTop: 2,
    marginBottom: 2,
    paddingHorizontal: 16,
  },

  noCitasText: {
    fontSize: 16,
    textAlign: "center",
  },
});
