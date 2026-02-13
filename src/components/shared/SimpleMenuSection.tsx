import { useTheme } from "@/src/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Linking, TouchableOpacity, View } from "react-native";
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
        style={{ borderColor: colors.border }}
        className="flex w-full border-b justify-between px-4 items-center flex-row gap-4 py-4"
      >
        <View className="flex flex-row gap-4 items-center">
          {item.icon !== "" && (
            <Ionicons
              name={item.icon as any}
              size={24}
              color={colors.textSecondary}
            />
          )}
          <View className="flex flex-col">
            <ThemedText
              type="subtitle"
              color={item.textColor || resolvedTextColor}
            >
              {item.title}
            </ThemedText>
            {item.subtitle && (
              <ThemedText type="caption" color={colors.textSecondary}>
                {item.subtitle}
              </ThemedText>
            )}
          </View>
        </View>
        {item.rightIcon && (
          <Ionicons
            name={item.rightIcon as any}
            size={20}
            color={colors.textSecondary}
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <>
      {sectionTitle && (
        <ThemedText
          type="subtitle"
          color={colors.primaryLight}
          style={{
            marginBottom: 8,
            fontWeight: "800",
            marginTop: 16,
          }}
        >
          {sectionTitle}
        </ThemedText>
      )}
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
