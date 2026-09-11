import { useTheme } from "@/src/context/ThemeContext";
import { ui } from "@/src/themes/ui";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import ThemedText from "./themed-text";

interface SimpleMenuSectionItem {
  icon?: string;
  title: string;
  subtitle?: string;
  rightIcon?: string;
  onPress?: () => void;
  link?: string;
  textColor?: string;
}

interface SimpleMenuSectionProps {
  items?: SimpleMenuSectionItem[];
  icon?: string;
  title?: string;
  subtitle?: string;
  rightIcon?: string;
  onPress?: () => void;
  link?: string;
  textColor?: string;
  sectionTitle?: string;
}

export const SimpleMenuSection = ({
  items,
  icon = "person-circle-outline",
  title,
  subtitle,
  rightIcon,
  onPress,
  link,
  textColor,
  sectionTitle,
}: SimpleMenuSectionProps) => {
  const { colors } = useTheme();
  const router = useRouter();

  const resolvedTextColor = textColor || colors.text;

  const renderItem = (item: SimpleMenuSectionItem, idx: number) => {
    const handlePress = () => {
      if (item.onPress) {
        item.onPress();
        return;
      }
      if (item.link) {
        if (item.link.startsWith("http")) {
          Linking.openURL(item.link);
        } else {
          router.push(item.link as any);
        }
      }
    };
    return (
      <TouchableOpacity
        key={idx}
        activeOpacity={item.onPress || item.link ? 0.7 : 1}
        onPress={handlePress}
        style={[styles.row, { borderColor: colors.border }]}
      >
        <View style={styles.rowLeft}>
          {item.icon !== "" && (
            <Ionicons
              name={item.icon as any}
              size={24}
              color={colors.textSecondary}
            />
          )}
          <View style={styles.copy}>
            <ThemedText
              type="subtitle"
              color={item.textColor || resolvedTextColor}
            >
              {item.title}
            </ThemedText>
            {item.subtitle ? (
              <ThemedText type="caption" tone="secondary">
                {item.subtitle}
              </ThemedText>
            ) : null}
          </View>
        </View>
        {item.rightIcon ? (
          <Ionicons
            name={item.rightIcon as any}
            size={20}
            color={colors.textSecondary}
          />
        ) : null}
      </TouchableOpacity>
    );
  };

  return (
    <>
      {sectionTitle ? (
        <ThemedText type="label" tone="primary" style={styles.sectionTitle}>
          {sectionTitle}
        </ThemedText>
      ) : null}
      {items && items.length > 0
        ? items.map(renderItem)
        : renderItem(
            {
              icon,
              title: title || "",
              subtitle,
              rightIcon,
              onPress,
              link,
              textColor,
            },
            0,
          )}
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: ui.spacing.md,
    gap: ui.spacing.md,
  },
  rowLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: ui.spacing.md,
  },
  copy: {
    flex: 1,
    gap: ui.spacing.xs,
  },
  sectionTitle: {
    marginBottom: ui.spacing.sm,
    marginTop: ui.spacing.lg,
  },
});
