import ThemedText from "@/src/components/shared/themed-text";
import { useTheme } from "@/src/context/ThemeContext";
import { ui } from "@/src/themes/ui";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as Linking from "expo-linking";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

const IMAGE_HEIGHT = 140;
const BODY_HEIGHT = 78;
const CARD_HEIGHT = IMAGE_HEIGHT + BODY_HEIGHT;

type Props = {
  title: string;
  image?: string;
  link?: string;
  width: number;
};

export function SuggestedTreatmentCard({ title, image, link, width }: Props) {
  const { colors } = useTheme();

  const onPress = () => {
    if (link) Linking.openURL(link);
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [{ opacity: pressed ? 0.96 : 1 }]}
    >
      <View
        style={[
          styles.card,
          {
            width,
            height: CARD_HEIGHT,
            backgroundColor: colors.backgroundElevated,
          },
        ]}
      >
        <View style={[styles.imageWrap, { width, height: IMAGE_HEIGHT }]}>
          {image ? (
            <Image
              source={{ uri: image }}
              style={{ width, height: IMAGE_HEIGHT }}
              contentFit="cover"
              transition={300}
            />
          ) : (
            <View
              style={[
                styles.placeholder,
                {
                  width,
                  height: IMAGE_HEIGHT,
                  backgroundColor: colors.backgroundSurface,
                },
              ]}
            >
              <Ionicons
                name="sparkles-outline"
                size={26}
                color={colors.primary}
              />
            </View>
          )}
        </View>

        <View
          style={[
            styles.body,
            { height: BODY_HEIGHT, backgroundColor: colors.backgroundSurface },
          ]}
        >
          <ThemedText
            type="semiBold"
            color={colors.text}
            style={styles.title}
            numberOfLines={2}
          >
            {title}
          </ThemedText>

          <ThemedText
            type="caption"
            color={colors.primaryLight}
            style={styles.cta}
          >
            Ver más
          </ThemedText>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: ui.radii.lg,
    overflow: "hidden",
  },
  imageWrap: {
    overflow: "hidden",
  },
  placeholder: {
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 14,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 15,
    lineHeight: 19,
    fontWeight: "600",
  },
  cta: {
    fontSize: 12,
  },
});
