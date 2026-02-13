import { Screen } from "@/src/components/shared/Screen";
import { useAuth } from "@/src/context/AuthContext";
import HomeScreen from "@/src/modules/home/screens/HomeScreen";
import type { UltimasCitas } from "@/src/modules/home/types/home.dates.types";
import { useMeUser } from "@/src/modules/login/hooks/useMe";
import React, { useState } from "react";

export default function Index() {
  const { user, membership, treatmentsCareme } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const { data, refetch, isRefetching, isError, error } = useMeUser();

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const currentUser = data?.user_data || user;
  const currentMembership = data?.membership_data || membership;
  const currentBenefits = currentMembership?.benefits || [];
  const currentTreatmentsCareme = data?.treatments_suggest || treatmentsCareme;
  const currentPromotions = data?.promotions || [];
  const currentDates = data?.ultimas_citas as unknown as
    | UltimasCitas
    | undefined;

  return (
    <Screen>
      <HomeScreen
        user={currentUser!}
        refreshing={refreshing}
        isError={isError}
        error={error}
        isLoading={isRefetching}
        onRefresh={onRefresh}
        mebershipName={currentMembership?.name || ""}
        benefits={currentBenefits}
        treatmentsCareme={currentTreatmentsCareme}
        promotions={currentPromotions}
        dates={currentDates}
      />
    </Screen>
  );
}
