import { useBenefitAll } from "@/src/modules/benefits/hooks/useBenefitsAll";
import BeneficiosScreen from "@/src/modules/benefits/screens/BeneficiosScreen";
import { MembershipData } from "@/src/types/shared/Benefits.type";
import React, { useState } from "react";

export default function Index() {
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<"disponibles" | "canjeados">(
    "disponibles",
  );
  const { data: benefitsData, isFetching, refetch, error } = useBenefitAll();

  const membershipState: MembershipData | null = benefitsData
    ? {
        benefits: benefitsData.benefits || [],
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
      loading={isFetching}
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
