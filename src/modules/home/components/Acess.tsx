import ThemedText from "@/src/components/shared/themed-text";
import { ui } from "@/src/themes/ui";
import { Link } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useTheme } from "../../../context/ThemeContext";
import { AccesoDirectoProps } from "../types/home.types";

export function AccesoDirecto({
  item,
  icon: Icon,
  routPage,
}: AccesoDirectoProps) {
  const { colors } = useTheme();

  return (
    <Link asChild href={`/(tabs)/${routPage}`}>
      <Pressable>
        {({ pressed }) => (
          <View
            style={[
              styles.container,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
                opacity: pressed ? 0.5 : 1,
              },
            ]}
          >
            <View style={styles.iconContainer}>
              <Icon width={60} height={60} />
            </View>
            <ThemedText type="titleSm" weight="medium" align="center">
              {item}
            </ThemedText>
          </View>
        )}
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: ui.borders.width,
    width: 174,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 2,
    shadowRadius: 0.4,
    elevation: 1,
    borderRadius: ui.radii.md,
    paddingHorizontal: ui.spacing.xxl,
    paddingVertical: ui.spacing.sm,
    gap: ui.spacing.sm,
  },
  iconContainer: {
    borderRadius: ui.radii.pill,
    justifyContent: "center",
    alignItems: "center",
  },
});
