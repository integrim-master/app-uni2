import Badge from "@/src/components/shared/Badge";
import PrimaryButton from "@/src/components/shared/PrimaryButton";
import { Screen } from "@/src/components/shared/Screen";
import ThemedText from "@/src/components/shared/themed-text";
import ErrorScreen from "@/src/components/ui/ErrorScreen";
import { useTheme } from "@/src/context/ThemeContext";
import { ui } from "@/src/themes/ui";
import { FontAwesome } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import React from "react";
import {
  ActivityIndicator,
  Linking,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import type { BlogDetail } from "../types/blog.types";
import { htmlToText } from "../utils/htmlToText";

type Props = {
  blog?: BlogDetail;
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
};

function getReadingTime(blog?: BlogDetail) {
  if (!blog) return 1;
  const all = [
    htmlToText(blog.content),
    ...(blog.sections?.map((s) => htmlToText(s.content)) ?? []),
  ].join(" ");
  const words = all.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export default function BlogDetailsScreen({
  blog,
  isLoading = false,
  isError = false,
  onRetry,
}: Props) {
  const { colors } = useTheme();
  const readingTime = getReadingTime(blog);

  if (isLoading) {
    return (
      <Screen style={styles.centered}>
        <ActivityIndicator color={colors.primary} size="large" />
      </Screen>
    );
  }

  if (isError || !blog) {
    return (
      <ErrorScreen
        message="No se pudo cargar este artículo. Intenta de nuevo."
        onRetry={onRetry}
      />
    );
  }

  const intro = htmlToText(blog.content);

  const cta = blog.cta?.enabled ? blog.cta : null;

  const handleCta = () => {
    const url =
      cta?.url || (cta?.whatsapp ? `https://wa.me/${cta.whatsapp}` : "");
    if (url) Linking.openURL(url).catch(() => {});
  };

  return (
    <Screen fullWidth safeArea edges={["bottom"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.hero}>
          {blog.image ? (
            <Image
              source={{ uri: blog.image }}
              style={styles.heroImage}
              contentFit="cover"
              transition={250}
            />
          ) : (
            <View
              style={[
                styles.heroImage,
                { backgroundColor: colors.backgroundElevated },
              ]}
            />
          )}
          <LinearGradient
            colors={[
              colors.shadow + "0D",
              colors.shadow + "59",
              colors.shadow + "B3",
              colors.background,
            ]}
            locations={[0, 0.45, 0.8, 1]}
            style={StyleSheet.absoluteFillObject}
          />

          {/* <MotiView
            from={{ opacity: 0, translateY: 16 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "timing", duration: 500 }}
            style={styles.heroMeta}
          >
            <View style={styles.readingRow}>
              <Feather name="clock" size={13} color={colors.textMuted} />
              <ThemedText type="caption" color={colors.textMuted}>
                {readingTime} min de lectura
              </ThemedText>
            </View>
          </MotiView> */}
        </View>

        <MotiView
          from={{ opacity: 0, translateY: 24 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 500, delay: 120 }}
          style={[styles.body, { backgroundColor: colors.background }]}
        >
          <View style={[styles.grabber, { backgroundColor: colors.border }]} />

          <ThemedText
            type="display"
            color={colors.textStrong}
            style={styles.title}
          >
            {blog.title}
          </ThemedText>
          <View className="flex-row gap-4">
            {blog.categories.map((category) => (
              <Badge
                key={category.id}
                text={category.name}
                size="xs"
                showIcon={false}
                variant="premium"
              />
            ))}
          </View>

          {intro ? (
            <View style={styles.introWrap}>
              <View
                style={[styles.introBar, { backgroundColor: colors.primary }]}
              />
              <ThemedText
                type="body"
                color={colors.textSecondary}
                style={styles.intro}
              >
                {intro}
              </ThemedText>
            </View>
          ) : null}

          {blog.sections?.map((section, index) => {
            const sectionText = htmlToText(section.content);
            return (
              <MotiView
                key={`${section.title}-${index}`}
                from={{ opacity: 0, translateY: 18 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: "timing",
                  duration: 420,
                  delay: 200 + index * 90,
                }}
                style={styles.section}
              >
                <View style={styles.sectionHeader}>
                  {/* <View
                    style={[
                      styles.sectionIndex,
                      { backgroundColor: colors.primary + "1A" },
                    ]}
                  >
                    <ThemedText type="caption" color={colors.primary}>
                      {String(index + 1).padStart(2, "0")}
                    </ThemedText>
                  </View> */}
                  <ThemedText
                    type="title"
                    color={colors.textStrong}
                    style={styles.sectionTitle}
                  >
                    {section.title}
                  </ThemedText>
                </View>

                {section.image ? (
                  <Image
                    source={{ uri: section.image }}
                    style={styles.sectionImage}
                    contentFit="cover"
                    transition={200}
                  />
                ) : null}

                {sectionText ? (
                  <ThemedText
                    type="body"
                    color={colors.textSecondary}
                    style={styles.sectionBody}
                  >
                    {sectionText}
                  </ThemedText>
                ) : null}
              </MotiView>
            );
          })}

          {cta ? (
            <MotiView
              from={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "timing", duration: 450, delay: 260 }}
              style={styles.ctaWrap}
            >
              <View
                className="w-full"
                style={[
                  styles.ctaCard,
                  { backgroundColor: colors.primaryLight },
                ]}
              >
                <ThemedText type="title" color={colors.cardText}>
                  {cta.title}
                </ThemedText>

                {cta.content ? (
                  <ThemedText type="body" color={colors.cardText}>
                    {cta.content}
                  </ThemedText>
                ) : null}

                <PrimaryButton
                  title={cta.button_text || "Solicitar información"}
                  onPress={handleCta}
                  size="sm"
                  variant="secondary"
                  icon={
                    <FontAwesome
                      name="whatsapp"
                      size={26}
                      color={colors.primaryLight}
                    />
                  }
                />
              </View>
            </MotiView>
          ) : null}
        </MotiView>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scroll: {
    paddingBottom: ui.spacing.xxl,
  },
  hero: {
    height: 380,
    width: "100%",
    justifyContent: "flex-end",
  },
  heroImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  heroMeta: {
    paddingHorizontal: ui.spacing.xl,
    paddingBottom: ui.spacing.xxl,
    gap: ui.spacing.sm,
  },
  heroBadge: {
    alignSelf: "flex-start",
  },
  readingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: ui.spacing.sm,
  },
  body: {
    marginTop: -ui.spacing.xxl,
    borderTopLeftRadius: ui.radii.xl,
    borderTopRightRadius: ui.radii.xl,
    paddingHorizontal: ui.spacing.xl,
    paddingTop: ui.spacing.lg,
    gap: ui.spacing.lg,
  },
  grabber: {
    alignSelf: "center",
    width: 44,
    height: 5,
    borderRadius: ui.radii.pill,
    marginBottom: ui.spacing.md,
    opacity: 0.5,
  },
  title: {
    marginBottom: ui.spacing.xs,
    lineHeight: 38,
  },
  introWrap: {
    flexDirection: "row",
    gap: ui.spacing.md,
  },
  introBar: {
    width: 3,
    borderRadius: ui.radii.pill,
  },
  intro: {
    flex: 1,
    lineHeight: 25,
  },
  section: {
    gap: ui.spacing.md,
    marginTop: ui.spacing.lg,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: ui.spacing.md,
  },
  sectionIndex: {
    width: 34,
    height: 34,
    borderRadius: ui.radii.md,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionTitle: {
    flex: 1,
  },
  sectionImage: {
    width: "100%",
    height: 210,
    borderRadius: ui.radii.lg,
  },
  sectionBody: {
    lineHeight: 25,
  },
  ctaWrap: {
    marginTop: ui.spacing.xxl,
  },
  ctaCard: {
    borderRadius: ui.radii.xl,
    padding: ui.spacing.xl,
    gap: ui.spacing.md,
    overflow: "hidden",
  },
  ctaIconWrap: {
    width: 52,
    height: 52,
    borderRadius: ui.radii.pill,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: ui.spacing.xs,
  },
  ctaTitle: {
    marginBottom: ui.spacing.xs,
  },
  ctaCopy: {
    opacity: 0.9,
    lineHeight: 22,
    marginBottom: ui.spacing.sm,
  },
});
