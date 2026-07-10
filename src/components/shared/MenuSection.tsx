import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { MenuItem } from "../../modules/profile/components/MenuItem";

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
        <Text style={[styles.sectionTitle, { color: colors.textAccent }]}>
          {title}
        </Text>
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
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  menuGroup: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.9,
    shadowRadius: 1,
    elevation: 1.2,
  },
});
