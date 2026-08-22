import Badge from "@/src/components/shared/Badge";
import { Screen } from "@/src/components/shared/Screen";
import ThemedText from "@/src/components/shared/themed-text";
import { useTheme } from "@/src/context/ThemeContext";
import { ui } from "@/src/themes/ui";
import { Image } from "expo-image";
import { MotiView, View } from "moti";
import React from "react";
import { Dimensions, ScrollView, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

const post = {
  title: "Cómo mejorar tu salud mental en 2026",
  content:
    "Cuidar tu mente es tan importante como cuidar tu cuerpo. En un mundo cada vez más acelerado y digital, la salud mental se ha convertido en el pilar fundamental para una vida plena. \n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  image:
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  author: "María López",
  role: "Especialista en Bienestar",
  date: "24 Feb 2026",
  readingTime: "5 min lectura",
};

export default function BlogDetail() {
  const { colors } = useTheme();

  return (
    <Screen fullWidth>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: colors.background,
        }}
      >
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 700 }}
        >
          <Image
            source={{ uri: post.image }}
            style={{ width: width, height: 350 }}
            contentFit="cover"
          />
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 600, delay: 200 }}
          style={[styles.sheet, { backgroundColor: colors.background }]}
        >
          <Badge text="Bienestar" style={styles.badge} />

          <ThemedText type="display" style={styles.title}>
            {post.title}
          </ThemedText>

          <View style={[styles.metaRow, { borderColor: colors.border }]}>
            <View style={styles.avatar}>
              <Image
                source="https://i.pravatar.cc/150?u=maria"
                style={styles.avatarImage}
              />
            </View>
            <View style={styles.metaCopy}>
              <ThemedText type="semiBold">{post.author}</ThemedText>
              <ThemedText type="caption" tone="secondary">
                {post.date} • {post.role}
              </ThemedText>
            </View>
          </View>

          <ThemedText type="body" tone="secondary" style={styles.body}>
            {post.content}
          </ThemedText>
        </MotiView>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  sheet: {
    marginTop: -ui.spacing.xl,
    paddingHorizontal: ui.spacing.xl,
    paddingTop: ui.spacing.xxl,
    paddingBottom: ui.spacing.xxl,
    borderTopLeftRadius: ui.radii.xl,
    borderTopRightRadius: ui.radii.xl,
  },
  badge: {
    marginBottom: ui.spacing.md,
  },
  title: {
    marginBottom: ui.spacing.xl,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: ui.spacing.xl,
    paddingBottom: ui.spacing.xl,
    borderBottomWidth: ui.borders.width,
    gap: ui.spacing.md,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: ui.radii.pill,
    backgroundColor: "#E2E8F0",
    overflow: "hidden",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  metaCopy: {
    flex: 1,
    gap: ui.spacing.xs,
  },
  body: {
    marginBottom: ui.spacing.xxl,
  },
});
