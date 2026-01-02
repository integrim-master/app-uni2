import EmptySvgPush from "@/assets/svg/Push.svg";
import { BackButton } from "@/src/components/shared/BackButton";
import { Screen } from "@/src/components/shared/Screen";
import ThemedText from "@/src/components/shared/themed-text";
import { useTheme } from "@/src/context/ThemeContext";
import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NotificationsScreen: React.FC = () => {
  const { colors } = useTheme();

  return (
    <Screen style={[styles.container]}>
     <SafeAreaView>
       <BackButton />
      <View style={styles.centerContent}>
        <EmptySvgPush width={320} height={320} style={styles.emptyImage} />
        <ThemedText type="subtitle" color={colors.primaryLight}>
          Sin novedades aún
        </ThemedText>

        <ThemedText color={colors.textSecondary}>
          Cuando recibas novedades, las verás en este espacio.
        </ThemedText>
      </View>
     </SafeAreaView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 24,
  },
  emptyImage: {},
  emptyTitle: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 2,
  },
  emptyBody: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 2,
    marginBottom: 2,
    paddingHorizontal: 8,
  },
});

export default NotificationsScreen;
