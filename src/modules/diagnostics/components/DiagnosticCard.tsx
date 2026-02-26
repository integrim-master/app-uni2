import ThemedText from "@/src/components/shared/themed-text";
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
      <ThemedText style={styles.diagDesc} color={colors.textSecondary}>
        {description}
      </ThemedText>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  blogItem: {
    marginBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
    paddingBottom: 15,
  },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 6, gap: 8 },
  category: { fontSize: 10, fontWeight: "800", letterSpacing: 1 },
  dot: { width: 4, height: 4, borderRadius: 2 },
  diagName: { fontSize: 18, fontWeight: "700", marginBottom: 6 },
  diagDesc: { fontSize: 14, lineHeight: 22 },
});
