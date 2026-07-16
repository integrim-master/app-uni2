import ErrorScreen from "@/src/components/ui/ErrorScreen";
import { ui } from "@/src/themes/ui";
import { useHeaderHeight } from "@react-navigation/elements";
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
  const headerHeight = useHeaderHeight();

  if (isError) {
    return (
      <ErrorScreen message={error?.message} onRetry={onRefresh} />
    );
  }

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={[
        styles.content,
        { paddingTop: headerHeight },
      ]}
      showsVerticalScrollIndicator={false}
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
    paddingHorizontal: 8,
  },
  content: {
    paddingHorizontal: 8,
    paddingBottom: 24,
  },

  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    backgroundColor: "#FFF5F5",
  },

  errorTitle: {
    marginTop: 16,
    fontSize: 22,
    fontWeight: "700",
    color: "#C62828",
    textAlign: "center",
  },

  errorMessage: {
    marginTop: 12,
    fontSize: 16,
    color: "#8E0000",
    textAlign: "center",
    lineHeight: 22,
  },

  tabSection: {
    alignItems: "center",
  },

  sectionTitle: {
    marginTop: 10,
    marginBottom: 20,
    fontWeight: "600",
  },

  benefitsSection: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderRadius: ui.radii.lg,
  },
});

export default HomeScreen;
