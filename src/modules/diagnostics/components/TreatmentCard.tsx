import { MaterialIcons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { Card } from "@/src/components/shared/card";
import { useTheme } from "@/src/context/ThemeContext";
import { ui } from "@/src/themes/ui";
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
    <View style={styles.wrapper}>
      <Card style={styles.card} onPress={onPress}>
        <View style={styles.imageContainer}>
          {image ? (
            <Image
              source={{ uri: image }}
              style={styles.image}
              resizeMode="cover"
            />
          ) : (
            <View
              style={[
                styles.placeholder,
                { backgroundColor: colors.primary + "15" },
              ]}
            >
              <MaterialIcons name="spa" size={32} color={colors.primary} />
            </View>
          )}
          <View style={styles.overlay}>
            <Text style={[styles.title, { color: "#fff" }]} numberOfLines={2}>
              {title}
            </Text>
            {/* {!!link && (
              <View style={styles.linkIconWrap} pointerEvents="none">
                <MaterialIcons name="open-in-new" size={16} color={colors.primary} />
              </View>
            )} */}
          </View>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    margin: 6,
    minWidth: 140,
    maxWidth: 180,
    borderRadius: ui.radii.lg,
    elevation: 0,
  },
  card: {
    height: 120,
    width: "100%",
    borderRadius: ui.radii.lg,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: ui.radii.lg,
  },
  placeholder: {
    width: "100%",
    height: "100%",
    borderRadius: ui.radii.lg,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.38)",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomLeftRadius: ui.radii.lg,
    borderBottomRightRadius: ui.radii.lg,
    alignItems: "flex-start",
    justifyContent: "flex-end",
    width: "100%",
    flexDirection: "row",
    gap: 6,
  },
  linkIconWrap: {
    marginLeft: 6,
    backgroundColor: "#fff",
    borderRadius: ui.radii.md,
    padding: 2,
    alignSelf: "center",
  },
  title: {
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 16,
    letterSpacing: 0.1,
    textShadowColor: "rgba(0,0,0,0.18)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
    flex: 1,
  },
});
