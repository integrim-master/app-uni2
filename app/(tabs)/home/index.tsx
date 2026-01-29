import { Screen } from "@/src/components/shared/Screen";
import { useAuth } from "@/src/context/AuthContext";
import HomeScreen from "@/src/modules/home/screens/HomeScreen";
import { useMeUser } from "@/src/modules/login/hooks/useMe";
import React, { useEffect, useState } from "react";

export default function Index() {
  const { user, membership, treatmentsCareme } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const { data, refetch, isRefetching, isError, error } = useMeUser();

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  useEffect(() => {
    onRefresh();
  }, []);

  const currentUser = data?.user_data || user;
  const currentMembership = data?.membership_data || membership;
  const currentBenefits = currentMembership?.benefits || [];
  const currentTreatmentsCareme = data?.treatments_suggest || treatmentsCareme;
  const currentPromotions = data?.promotions || [];

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
      />
    </Screen>
  );
}
