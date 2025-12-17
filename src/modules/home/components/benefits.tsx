import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { memo } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../../context/ThemeContext";
import { BeneficiosProps, ItemsBenefitsProps } from "../types/home.types";

const ItemBenefit = memo(({ data }: ItemsBenefitsProps) => {
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
          <View className="flex flex-row justify-between items-center">
            <View
              style={[styles.badge, { backgroundColor: `${colors.primary}22` }]}
            >
              <Text style={[styles.badgeText, { color: colors.primary }]}>
                {data.title}
              </Text>
            </View>
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

export function Beneficios({ benefits }: BeneficiosProps) {
  return (
    <FlatList
      data={benefits}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <ItemBenefit data={item} />}
      scrollEnabled={false}
      contentContainerStyle={{ paddingBottom: 4 }}
    />
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,

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
    borderRadius: 12,
    marginTop: 4,
  },

  badgeText: {
    fontSize: 11,
    fontWeight: "700",
  },
});
