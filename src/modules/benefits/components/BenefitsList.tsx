import Badge from "@/src/components/shared/Badge";
import {
  BenefitReedemed,
  Benefits,
  BenefitsListProps,
} from "@/src/types/shared/Benefits.type";
import { MotiView } from "moti";
import React from "react";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../../context/ThemeContext";
import ItemUnique from "./ItemUnique";
import ItemUniqueUsed from "./ItemUniqueUsed";

export default function BenefitsList({
  benefits,
  benefitsUsed,
  activeBenefitId,
  benefitsRedemed,
  isPendingRedeem,
  refreshing,
  onRefresh,
  onBenefitViewDetails,
  onBenefitRedemed,
  emptyMessage = "No cuentas con beneficios disponibles",
  filterUsed = "available",
  animationKey = "benefits-list",
}: BenefitsListProps) {
  const { colors } = useTheme();

  const filteredBenefits = (benefits || []).filter(
    (b: Benefits) => (b.remaining || 0) >= 1,
  );

  return (
    <MotiView
      key={animationKey}
      from={{ opacity: 0, translateX: 25 }}
      animate={{ opacity: 1, translateX: 0 }}
      exit={{ opacity: 0, translateX: -25 }}
      transition={{ type: "timing", duration: 150 }}
      style={styles.container}
    >
      {filterUsed === "available" ? (
        <>
          {benefitsRedemed && (
            <View style={{ paddingHorizontal: 16, marginBottom: 8 }}>
              <Badge
                text="Tienes un beneficio por confirmación"
                fullWidth
                variant="info"
                size="medium"
                layout="horizontal"
              />
            </View>
          )}
          <FlatList
            data={filteredBenefits}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ItemUnique
                isPendingRedeem={isPendingRedeem}
                data={item}
                activeBenefitId={activeBenefitId}
                benefitRedemed={benefitsRedemed as BenefitReedemed | undefined}
                onPressRedeem={(benefit, action = "aplicar") =>
                  onBenefitRedemed(benefit, action)
                }
                onPressViewDetails={() => onBenefitViewDetails?.(item)}
              />
            )}
            ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={[styles.emptyText, { color: colors.textLight }]}>
                  {emptyMessage}
                </Text>
              </View>
            }
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[colors.primary]}
                tintColor={colors.primary}
              />
            }
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
          />
        </>
      ) : (
        <FlatList
          data={benefitsUsed || []}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ItemUniqueUsed data={item} />}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={[styles.emptyText, { color: colors.textLight }]}>
                {emptyMessage}
              </Text>
            </View>
          }
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[colors.primary]}
              tintColor={colors.primary}
            />
          }
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </MotiView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    inset: 0,
    flex: 1,
    width: "100%",
  },
  contentContainer: {
    paddingVertical: 16,
  },
  emptyContainer: {
    padding: 32,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
  },
});
