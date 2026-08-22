import { StyleSheet, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { MenuItem } from "../../modules/profile/components/MenuItem";
import { ui } from "../../themes/ui";
import ThemedText from "./themed-text";

interface MenuSectionProps {
  title: string;
  items: any[];
  color?: string;
  textColor?: string;
  borderColor?: string;
  style?: any;
  renderItem?: (item: any, index: number, isLast: boolean) => React.ReactNode;
}

export function MenuSection({
  title,
  items,
  color,
  textColor,
  borderColor,
  style,
  renderItem,
}: MenuSectionProps) {
  const { colors } = useTheme();

  const resolvedColor = color || colors.primaryLight;
  const resolvedTextColor = textColor || colors.text;
  const resolvedBorderColor = borderColor || colors.border;

  return (
    <View style={[styles.section, style]}>
      <View
        style={[
          styles.menuGroup,
          { backgroundColor: colors.card, borderColor: resolvedBorderColor },
        ]}
      >
        <ThemedText type="titleSm" tone="accent" style={styles.sectionTitle}>
          {title}
        </ThemedText>
        {items.map((item, index) =>
          renderItem ? (
            renderItem(item, index, index === items.length - 1)
          ) : (
            <MenuItem
              key={index}
              {...item}
              color={resolvedColor}
              textColor={resolvedTextColor}
              borderColor={resolvedBorderColor}
              isLast={index === items.length - 1}
            />
          ),
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: ui.spacing.xl,
  },
  sectionTitle: {
    paddingTop: ui.spacing.lg,
    paddingHorizontal: ui.spacing.lg,
    paddingBottom: ui.spacing.sm,
  },
  menuGroup: {
    borderRadius: ui.radii.lg,
    borderWidth: ui.borders.width,
    overflow: "hidden",
  },
});
