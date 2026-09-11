import ThemedText from "@/src/components/shared/themed-text";
import { ui } from "@/src/themes/ui";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";

export type MenuItemProps = {
  icon?: string;
  title?: string;
  label: string;
  color: string;
  textColor: string;
  borderColor: string;
  isFirst?: boolean;
  isLast?: boolean;
  onPress?: () => void;
};

export function MenuItem({
  icon,
  label,
  color,
  textColor,
  title,
  onPress,
}: MenuItemProps) {
  const Container = onPress ? Pressable : View;
  return (
    <Container
      {...(onPress ? { onPress } : {})}
      style={styles.menuItem}
    >
      <View style={styles.menuContent}>
        {icon ? (
          <Ionicons
            name={icon as any}
            size={24}
            color={color}
            style={styles.menuIcon}
          />
        ) : null}
        <View style={styles.copy}>
          {title ? (
            <ThemedText type="caption" tone="muted">
              {title}
            </ThemedText>
          ) : null}
          <ThemedText type="body" color={textColor}>
            {label}
          </ThemedText>
        </View>
      </View>
      {onPress ? (
        <Ionicons name="chevron-forward" size={20} color={color} />
      ) : null}
    </Container>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: ui.spacing.lg,
    minHeight: ui.tapTarget,
  },
  menuContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  copy: {
    flex: 1,
    gap: ui.spacing.xs,
  },
  menuIcon: {
    marginRight: ui.spacing.lg,
  },
});
