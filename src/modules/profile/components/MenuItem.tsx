import ThemedText from "@/src/components/shared/themed-text";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";
import { useTheme } from "../../../context/ThemeContext";

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
  isLast,
  title,
  onPress,
}: MenuItemProps) {
  const { colors } = useTheme();
  const Container = onPress ? Pressable : View;
  return (
    <Container
      {...(onPress ? { onPress } : {})}
      style={[
        styles.menuItem,
        isLast && styles.menuItemLast,
        {
          backgroundColor: "transparent",
          borderColor: "transparent",
          borderWidth: 0,
          borderRadius: 0,
          marginBottom: 0,
        },
      ]}
    >
      <View style={styles.menuContent}>
        {icon && (
          <Ionicons
            name={icon as any}
            size={24}
            color={color}
            style={styles.menuIcon}
          />
        )}
        <View className="">
          {title && (
            <ThemedText
              type="caption"
              weight="bold"
              color={colors.secondaryDark}
              style={{ opacity: 0.7, marginBottom: 2 }}
            >
              {title}
            </ThemedText>
          )}
          <ThemedText type="body" weight="medium" color={textColor}>
            {label}
          </ThemedText>
        </View>
      </View>
      {onPress && <Ionicons name="chevron-forward" size={20} color={color} />}
    </Container>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuIcon: {
    marginRight: 16,
  },
});
