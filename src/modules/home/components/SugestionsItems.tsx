import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, StyleSheet, View } from "react-native";

import ThemedText from "@/src/components/shared/themed-text";
import { ui } from "@/src/themes/ui";
import { Link } from "expo-router";
import { useTheme } from "../../../context/ThemeContext";

const SuggestionItem = ({ title }: { title: string }) => {
  const { colors, isDark } = useTheme();
  return (
    <Link
      href={"home/suggest"}
      style={[
        styles.chip,
        {
          backgroundColor: colors.card,
          borderWidth: isDark ? ui.borders.width : 0,
          borderColor: colors.border,
        },
      ]}
      asChild
    >
      <Pressable>
        <View style={styles.content}>
          <Ionicons name="calendar" size={18} color={colors.primaryLight} />
          <ThemedText type="caption">{title}</ThemedText>
        </View>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  chip: {
    marginHorizontal: ui.spacing.xs,
    minHeight: ui.tapTarget,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: ui.spacing.md,
    borderRadius: ui.radii.xl,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: ui.spacing.sm,
  },
});

export default SuggestionItem;
