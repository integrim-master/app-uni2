import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Linking from "expo-linking";
import React from "react";
import { Image, StyleSheet, View } from "react-native";

import { Card } from "@/src/components/shared/card";
import ThemedText from "@/src/components/shared/themed-text";
import { useTheme } from "@/src/context/ThemeContext";
import { TreatmentCardProps } from "../types/diagnostics.types";

export default function TreatmentCard({
  title,
  image,
  link,
}: TreatmentCardProps) {
  const { colors } = useTheme();

  const onPress = () => {
    if (link) {
      Linking.openURL(link);
    }
  };

  return (
    <Card style={styles.card} onPress={onPress}>
      {image ? (
        <Image
          source={{ uri: image }}
          style={StyleSheet.absoluteFillObject}
          resizeMode="cover"
        />
      ) : (
        <View
          style={[
            StyleSheet.absoluteFillObject,
            styles.placeholder,
            { backgroundColor: colors.backgroundSurface },
          ]}
        >
          <MaterialIcons name="spa" size={36} color={colors.primary + "60"} />
        </View>
      )}

      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.85)"]}
        style={styles.gradientOverlay}
      />

      <View style={styles.content}>
        <View style={styles.topRow}>
          {!!link && (
            <View style={styles.iconWrap}>
              <MaterialIcons name="arrow-outward" size={14} color="#FFFFFF" />
            </View>
          )}
        </View>

        <ThemedText
          type="semiBold"
          color="#FFFFFF"
          style={styles.title}
          numberOfLines={2}
        >
          {title}
        </ThemedText>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 160,
    padding: 0,
    overflow: "hidden",
  },
  placeholder: {
    justifyContent: "center",
    alignItems: "center",
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    top: "35%",
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    padding: 12,
    zIndex: 10,
  },
  topRow: {
    width: "100%",
    alignItems: "flex-end",
  },
  iconWrap: {
    backgroundColor: "rgba(0,0,0,0.35)",
    padding: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  title: {
    textShadowColor: "rgba(0,0,0,0.6)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
});
