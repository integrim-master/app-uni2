import ThemedText from "@/src/components/shared/themed-text";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { MotiView } from "moti";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";

const { width } = Dimensions.get("window");

type Props = {
  colors: any;
  imageUri?: string;
};

export default function ResultHeader({ colors, imageUri }: Props) {
  return (
    <>
      <MotiView
        from={{ opacity: 0, translateY: -10 }}
        animate={{ opacity: 1, translateY: 0 }}
        style={styles.header}
      >
        <ThemedText type="label" tone="secondary">
          ANÁLISIS COMPLETADO
        </ThemedText>
        <ThemedText type="title" tone="primary">
          Resultado{" "}
          <ThemedText type="title" weight="regular">
            Facial
          </ThemedText>
        </ThemedText>
      </MotiView>

      <MotiView
        from={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        style={[
          styles.ovalWrapper,
          { borderColor: colors.primaryLight + "30" },
        ]}
      >
        <View style={[styles.innerOval, { backgroundColor: colors.card }]}>
          <Image
            source={{ uri: imageUri }}
            style={styles.image}
            contentFit="contain"
            transition={600}
          />
        </View>
        <View
          style={[styles.floatingBadge, { backgroundColor: colors.primary }]}
        >
          <MaterialIcons name="check" size={12} color="white" />
        </View>
      </MotiView>
    </>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: "center", marginBottom: 30, gap: 4 },
  ovalWrapper: {
    width: width * 0.75,
    height: width * 0.95,
    borderRadius: (width * 0.75) / 2,
    alignSelf: "center",
    borderWidth: 1,
    padding: 10,
    marginBottom: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  innerOval: {
    width: "100%",
    height: "100%",
    borderRadius: width,
    overflow: "hidden",
  },
  image: { width: "100%", height: "100%" },
  floatingBadge: {
    position: "absolute",
    bottom: 30,
    right: 30,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "white",
  },
});
