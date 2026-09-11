import ThemedText from "@/src/components/shared/themed-text";
import { ui } from "@/src/themes/ui";
import { MotiView } from "moti";
import React from "react";
import { StyleSheet, View } from "react-native";

type Props = {
  title: string;
  description: string;
  index: number;
  colors: any;
};

export default function DiagnosticCard({
  title,
  description,
  index,
  colors,
}: Props) {
  return (
    <MotiView
      from={{ opacity: 0, translateX: -10 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ delay: 300 + index * 100 }}
      style={styles.blogItem}
    >
      <View style={styles.row}></View>
      <ThemedText type="subtitle">{title}</ThemedText>
      <ThemedText type="body" color={colors.textSecondary}>
        {description}
      </ThemedText>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  blogItem: {
    marginBottom: ui.spacing.xl,
    borderBottomWidth: ui.borders.width,
    borderBottomColor: "rgba(0,0,0,0.05)",
    paddingBottom: ui.spacing.lg,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: ui.spacing.sm,
    gap: ui.spacing.sm,
  },
});
