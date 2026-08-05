import { useBenefitAll } from "@/src/modules/benefits/hooks/useBenefitsAll";
import BeneficiosScreen from "@/src/modules/benefits/screens/BeneficiosScreen";
import {
    Benefits,
    BenefitUsed,
    MembershipData,
} from "@/src/types/shared/Benefits.type";
import React, { useState } from "react";

/**
 * Sincroniza los contadores used/remaining de benefits con el array benefits_used.
 * Cuenta cuántas veces cada beneficio aparece canjeado en benefits_used y actualiza los valores.
 */
function syncBenefitsWithUsed(
  benefits: Benefits[],
  benefitsUsed: BenefitUsed[],
): Benefits[] {
  return benefits.map((benefit) => {
    const usedCount = benefitsUsed.filter(
      (bu) =>
        bu.benefit.toLowerCase().trim() === benefit.title.toLowerCase().trim(),
    ).length;

    return {
      ...benefit,
      used: usedCount,
      remaining: Math.max(0, benefit.allowed - usedCount),
    };
  });
}

export default function Index() {
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<"disponibles" | "canjeados">(
    "disponibles",
  );
  const { data: benefitsData, isLoading, refetch, error } = useBenefitAll();

  const membershipState: MembershipData | null = benefitsData
    ? {
        benefits: syncBenefitsWithUsed(
          benefitsData.benefits || [],
          benefitsData.benefits_used || [],
        ),
        benefits_used: benefitsData.benefits_used || [],
        benefit_redeem: benefitsData.benefit_redeem,
      }
    : null;

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <BeneficiosScreen
      loading={isLoading}
      refreshing={refreshing}
      membership={membershipState}
      setRefreshing={setRefreshing}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      onRefresh={handleRefresh}
      error={error}
    />
  );
}
