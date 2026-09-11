import ErrorScreen from "@/src/components/ui/ErrorScreen";
import { ui } from "@/src/themes/ui";
import { useRouter } from "expo-router";
import React from "react";
import { RefreshControl, ScrollView, StyleSheet } from "react-native";

import BenefitsPreview from "../components/BenefitsPreview";
import { CardHome } from "../components/CardHome";
import HeaderSection from "../components/HeaderSection";
import { PromotionsCarousel } from "../components/PromotionsCarousel";
import { TreatmentsSection } from "../components/TreatmentsSection";
import UpcomingAppointments from "../components/UpcomingAppointments";
import type { HomeScreenProps } from "../types/home.types";

type Props = HomeScreenProps & {
  error?: any;
  isError?: boolean;
  isLoading?: boolean;
  onRefresh: () => void;
};

const HomeScreen: React.FC<Props> = ({
  user,
  mebershipName,
  dates,
  promotions,
  treatmentsCareme,
  benefits,
  refreshing,
  onRefresh,
  error,
  isError,
  isLoading,
}) => {
  const router = useRouter();

  if (isError) {
    return <ErrorScreen message={error?.message} onRetry={onRefresh} />;
  }

  return (
    <ScrollView
      style={styles.scroll}
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <HeaderSection fullName={user?.user_name || "Usuario"} />

      <CardHome
        isLoading={isLoading}
        name={mebershipName}
        benefits={benefits}
      />

      <UpcomingAppointments dates={dates} isLoading={isLoading} />
      <BenefitsPreview
        isLoading={isLoading}
        benefits={benefits}
        onPressAll={() => router.push("/(tabs)/benefits")}
      />
      <PromotionsCarousel isLoading={isLoading} promotions={promotions} />

      <TreatmentsSection SuggestedTreatments={treatmentsCareme} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  content: {
    paddingBottom: ui.spacing.xl,
  },
});

export default HomeScreen;
