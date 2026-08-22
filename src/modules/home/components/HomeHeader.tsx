import ThemedText from "@/src/components/shared/themed-text";
import { useNotifications } from "@/src/context/notifications";
import { useTheme } from "@/src/context/ThemeContext";
import { ui } from "@/src/themes/ui";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HomeHeader: React.FC = () => {
  const { colors } = useTheme();
  const router = useRouter();
  const { unreadCount } = useNotifications();
  const insets = useSafeAreaInsets();

  const topPadding =
    Platform.OS === "android"
      ? (StatusBar.currentHeight ?? insets.top)
      : insets.top;

  return (
    <View
      style={[
        styles.wrap,
        {
          backgroundColor: colors.background,
          paddingTop: topPadding,
        },
      ]}
    >
      <View style={styles.row}>
        <View style={styles.logoWrap}>
          <Image
            source={require("../../../../assets/images/icon-careme.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Pressable
          onPress={() => router.push("/notifications")}
          style={styles.bell}
          hitSlop={ui.spacing.sm}
        >
          <Ionicons
            name="notifications-outline"
            size={28}
            color={colors.primary}
          />
          {unreadCount > 0 && (
            <View style={styles.badge}>
              <ThemedText type="micro" tone="inverse">
                {unreadCount > 99 ? "99+" : unreadCount}
              </ThemedText>
            </View>
          )}
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    paddingBottom: ui.spacing.sm,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: ui.spacing.sm,
    minHeight: ui.tapTarget,
  },
  logoWrap: {
    borderRadius: ui.radii.pill,
  },
  logo: {
    width: 40,
    height: 40,
  },
  bell: {
    position: "relative",
    minWidth: ui.tapTarget,
    minHeight: ui.tapTarget,
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    position: "absolute",
    top: -ui.spacing.xs,
    right: -ui.spacing.xs,
    backgroundColor: "#FF3B30",
    borderRadius: ui.radii.md,
    minWidth: ui.spacing.xl,
    height: ui.spacing.xl,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: ui.spacing.xs,
  },
});

export default HomeHeader;
