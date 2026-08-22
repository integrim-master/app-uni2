import ThemedText from "@/src/components/shared/themed-text";
import { ui } from "@/src/themes/ui";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../../../context/ThemeContext";

interface ProfileHeaderProps {
  userName: string;
  onPress?: () => void;
}

const AVATAR = 56;

export function ProfileHeader({ userName, onPress }: ProfileHeaderProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.profileSection,
        {
          backgroundColor: colors.primaryLight,
          paddingTop: insets.top + ui.spacing.lg,
        },
      ]}
    >
      <View style={styles.profileContent}>
        <View
          style={[
            styles.profileImage,
            {
              backgroundColor: colors.primary,
            },
          ]}
        >
          <ThemedText type="title" color={colors.cardText}>
            {userInitial}
          </ThemedText>
        </View>
        <View style={styles.profileTextContainer}>
          <ThemedText type="titleSm" color={colors.cardText}>
            {userName}
          </ThemedText>
          <ThemedText type="caption" color={colors.cardText}>
            Ver perfil
          </ThemedText>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.primary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: ui.spacing.lg,
    paddingBottom: ui.spacing.lg,
    marginBottom: ui.spacing.sm,
  },
  profileContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: ui.spacing.lg,
  },
  profileImage: {
    width: AVATAR,
    height: AVATAR,
    borderRadius: AVATAR / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  profileTextContainer: {
    flex: 1,
    gap: ui.spacing.xs,
  },
});
