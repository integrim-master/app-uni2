import LoadingComponent from "@/src/components/shared/LoadingComponent";
import { Screen } from "@/src/components/shared/Screen";
import HomeScreen from "@/src/modules/home/screens/HomeScreen";
import type { UltimasCitas } from "@/src/modules/home/types/home.dates.types";
import { useMeUser } from "@/src/modules/login/hooks/useMe";
import React from "react";

export default function Index() {
  const { data, refetch, isRefetching, isLoading, isError, error } =
    useMeUser();

  const onRefresh = async () => {
    await refetch();
  };

  const currentUser = data?.user_data;
  const currentMembership = data?.membership_data;
  const currentTreatmentsCareme = data?.treatments_suggest;
  const currentPromotions = data?.promotions;
  const currentDates = data?.ultimas_citas as unknown as
    | UltimasCitas
    | undefined;

  if (isLoading && !data) {
    return (
      <Screen>
        <LoadingComponent />
      </Screen>
    );
  }

  return (
    <Screen>
      <HomeScreen
        user={currentUser!}
        refreshing={isRefetching}
        isError={isError}
        error={error}
        isLoading={isLoading}
        onRefresh={onRefresh}
        mebershipName={currentMembership?.name || "Sin membresía"}
        benefits={currentMembership?.benefits || []}
        treatmentsCareme={currentTreatmentsCareme || []}
        promotions={currentPromotions || []}
        dates={currentDates}
      />
    </Screen>
  );
}
