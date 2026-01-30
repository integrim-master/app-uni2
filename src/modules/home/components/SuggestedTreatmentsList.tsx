import Badge from "@/src/components/shared/Badge";
import { TratamientoCareme } from "@/src/types/shared/Benefits.type";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { memo } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../../context/ThemeContext";
import { ui } from "../../../themes/ui";
import TreatmentCard from "../../diagnostics/components/TreatmentCard";
import { SuggestedTreatmentsListProps } from "../types/home.treatments.types";

const ItemBenefit = memo(({ treatment }: { treatment: TratamientoCareme }) => {
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={() => router.push(`suggest`)}
      style={{ marginBottom: 12 }}
    >
      <LinearGradient
        colors={colors.gradientCard as any}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.itemContainer,
          {
            borderColor: colors.border,
            shadowColor: colors.primaryDark,
          },
        ]}
      >
        <View style={styles.info}>
          <View className="flex flex-row mb-1 justify-between items-center">
            <Badge
              text={treatment.title}
              variant="warning"
              icon="health-and-safety"
              size="small"
              layout="horizontal"
            />
            <Ionicons name="chevron-forward" size={22} color={colors.primary} />
          </View>
          <Text
            style={[styles.desc, { color: colors.textLight }]}
            numberOfLines={2}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            sed? Architecto quis exercitationem minus asperiores tempora, maxime
            possimus placeat voluptate cum voluptatum distinctio perspiciatis.
            Harum cum aperiam quisquam a quod.
          </Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
});

export function SuggestedTreatmentsList({
  SuggestedTreatments,
}: SuggestedTreatmentsListProps) {
  return (
    <FlatList
      data={SuggestedTreatments}
      keyExtractor={(item, index) =>
        item.id ? item.id.toString() : index.toString()
      }
      renderItem={({ item }) => (
        <TreatmentCard title={item.title} image={item.image} link={item.link} />
      )}
      numColumns={2}
      scrollEnabled={false}
      contentContainerStyle={{ paddingBottom: 4 }}
      columnWrapperStyle={{ gap: 12, justifyContent: "space-between" }}
    />
  );
}
const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: ui.radii.lg,
    borderWidth: ui.borders.width,

    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 2,
  },

  info: {
    flex: 1,
    gap: 4,
  },

  title: {
    fontSize: 15,
    fontWeight: "700",
  },

  desc: {
    fontSize: 13,
    lineHeight: 18,
  },

  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: ui.radii.md,
    marginTop: 4,
  },

  badgeText: {
    fontSize: 11,
    fontWeight: "700",
  },
});
