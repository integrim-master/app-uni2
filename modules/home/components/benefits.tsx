import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { memo } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import Giftsvg from "../../../assets/svg/Gift.svg";
import { useTheme } from "../../../context/ThemeContext";
import { BeneficiosProps, ItemsBenefitsProps } from "../types/home.types";
const ItemsBenefits = memo(
  ({  data }: ItemsBenefitsProps) => {
    const { colors } = useTheme();

    return (
      <LinearGradient
        colors={colors.gradientCard as any}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 3 }}
        style={[
          styles.itemContainer,
          {
            borderColor: colors.border,
            shadowColor: colors.primaryDark,
          },
        ]}
      >
        <View
          style={[styles.iconLeft, { backgroundColor: `${colors.primary}20` }]}
        >
          <Giftsvg width={68} height={68} fill="white" />
        </View>
        <View style={styles.infoContent}>
          <Text
            style={[styles.title, { color: colors.text }]}
            numberOfLines={1}
          >
            {data.title}
          </Text>
          <Text
            style={[styles.desc, { color: colors.textLight }]}
            numberOfLines={2}
          >
            {data.period}
          </Text>
          <View style={styles.usageRow}>
            <Text style={[styles.usageText, { color: colors.primary }]}>
              Usos limitados
            </Text>
          </View>
        </View>
        <Pressable
          onPress={() => {
            router.replace(`/benefits/${data.id}`);
          }}
          style={[styles.actionCircle, { backgroundColor: colors.primary }]}
        >
          <Ionicons name="chevron-forward" size={26} color="white" />
        </Pressable>
      </LinearGradient>
    );
  }
);

export function Beneficios({
  benefits,
}: BeneficiosProps) {
  return (
    <FlatList
      data={benefits}
      keyExtractor={(item) => item.id.toString() || item.title.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <ItemsBenefits
          data={item}
        />
      )}
      contentContainerStyle={{ paddingHorizontal: 8 }}
    />
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 22,
    borderRadius: 22,
    borderWidth: 1,

    shadowColor: '#D0993C',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.45,
    shadowRadius: 18,
    elevation: 2,
    width: 340,
    marginHorizontal: 14,
    marginVertical: 9,
    gap: 18,
  },
  iconLeft: {
    width: 82,
    height: 82,
    borderRadius: 41,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  actionCircle: {
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
    elevation: 2,
  },
  infoContent: {
    flex: 1,
    gap: 4,
    justifyContent: "center",
  },
  title: {
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 2,
  },
  desc: {
    fontSize: 13,
    fontWeight: "400",
    marginBottom: 6,
  },
  usageRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  usageText: {
    fontWeight: "700",
    fontSize: 13,
  },
});
