import { ui } from "@/src/themes/ui";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../../../context/ThemeContext";

interface ProfileHeaderProps {
  userName: string;
  onPress?: () => void;
}

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
          paddingTop: insets.top + 20,
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
          <Text style={[styles.profileInitial, { color: colors.cardText }]}>
            {userInitial}
          </Text>
        </View>
        <View style={styles.profileTextContainer}>
          <Text style={[styles.profileName, { color: colors.cardText }]}>
            {userName}
          </Text>
          <Text style={[styles.profileSubtext, { color: colors.cardText }]}>
            Ver perfil
          </Text>
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
    paddingHorizontal: ui.spacing.sm,
    paddingBottom: ui.spacing.xs,

    marginBottom: ui.spacing.xs,
  },
  profileContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  profileImage: {
    width: 58,
    height: 58,
    borderRadius: 29,
    marginRight: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  profileInitial: {
    fontSize: 24,
    fontWeight: "700",
  },
  profileTextContainer: {
    flex: 1,
  },
  profileName: {
    fontSize: 19,
    fontWeight: "700",
  },
  profileSubtext: {
    fontSize: 14,
    fontWeight: "400",
  },
});
