import ErrorScreen from "@/src/components/ui/ErrorScreen";
import { ui } from "@/src/themes/ui";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import ThemedText from "@/src/components/shared/themed-text";
import BenefitsPreview from "../components/BenefitsPreview";
import { Card } from "../components/card";
import { CardHome } from "../components/CardHome";
import HeaderSection from "../components/HeaderSection";
import { PromotionsCarousel } from "../components/PromotionsCarousel";
import { TreatmentsSection } from "../components/TreatmentsSection";
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
    return <ErrorScreen message={error?.message} />;
  }

  return (
    <ScrollView
      style={styles.safeArea}
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

      <View className="mt-10">
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Tus proximas citas:
        </ThemedText>
        <FlatList
          data={[
            { id: "1", title: "Sugerencia 1", link: "/suggest" },
            { id: "2", title: "Sugerencia 2" },
          ]}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Card
              style={{
                height: 120,
                width: 260,
              }}
            >
              <ThemedText>{item.title}</ThemedText>
            </Card>
          )}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={{ width: 7 }} />}
        />
      </View>
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
  safeArea: {
    flex: 1,
    paddingHorizontal: 16,
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
