import { useTheme } from "@/src/context/ThemeContext";
import { ui } from "@/src/themes/ui";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet } from "react-native";

interface BackButtonProps {
  to?: string;
  icon?: React.ReactNode;
  iconName?: keyof typeof Ionicons.glyphMap;
}

export function BackButton({ to, icon, iconName }: BackButtonProps) {
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <Pressable
      onPress={() => (to ? router.push(to) : router.back())}
      style={[styles.button]}
    >
      {icon ? (
        icon
      ) : (
        <Ionicons
          name={iconName || "chevron-back"}
          size={22}
          color={colors.text}
        />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: ui.tapTarget,
    height: ui.tapTarget,
    borderRadius: ui.radii.lg,
    justifyContent: "center",
    alignItems: "center",
  },
});
