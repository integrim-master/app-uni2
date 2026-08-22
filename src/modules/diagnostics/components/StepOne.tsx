import PrimaryButton from "@/src/components/shared/PrimaryButton";
import ThemedText from "@/src/components/shared/themed-text";
import { ui } from "@/src/themes/ui";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../../../context/ThemeContext";

const TIPS = [
  { icon: "face", text: "Relaja tu rostro" },
  { icon: "remove-red-eye", text: "Quita gafas, tapabocas o gorra" },
  { icon: "wb-sunny", text: "Busca un lugar bien iluminado" },
  { icon: "camera", text: "Mantén tu rostro centrado" },
] as const;

const AVATAR = 200;

export default function StepOne() {
  const { colors } = useTheme();

  return (
    <View style={styles.card}>
      <View style={[styles.animationWrapper, { borderColor: colors.primary }]}>
        <LottieView
          source={require("../../../../assets/animations/profile-avatar-of-young-boy.json")}
          autoPlay
          loop
          style={styles.animation}
        />
      </View>

      <ThemedText type="title" color={colors.primary} align="center" style={styles.title}>
        Bienvenido al diagnóstico
      </ThemedText>

      <ThemedText type="body" tone="secondary" align="center" style={styles.description}>
        Para mejores resultados, retira gafas, gorra o cualquier cosa que
        obstruya tu rostro.
      </ThemedText>

      <ThemedText type="semiBold" style={styles.subtitle}>
        Tips para mejorar el diagnóstico
      </ThemedText>

      <View style={styles.tipsContainer}>
        {TIPS.map((tip) => (
          <View key={tip.text} style={styles.tipItem}>
            <View
              style={[
                styles.tipIconWrapper,
                { backgroundColor: colors.primary + "22" },
              ]}
            >
              <MaterialIcons name={tip.icon} size={22} color={colors.primary} />
            </View>
            <ThemedText type="body" tone="secondary" style={styles.tipText}>
              {tip.text}
            </ThemedText>
          </View>
        ))}
      </View>

      <View style={styles.cta}>
        <PrimaryButton
          title="Comenzar escaneo"
          onPress={() => router.push("/scan/camera")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    alignItems: "center",
    marginVertical: ui.spacing.xl,
  },
  animationWrapper: {
    width: AVATAR,
    height: AVATAR,
    borderRadius: AVATAR / 2,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: ui.spacing.xl,
    borderWidth: 2,
  },
  animation: {
    width: 220,
    height: 220,
  },
  title: {
    marginBottom: ui.spacing.md,
  },
  description: {
    marginBottom: ui.spacing.lg,
  },
  subtitle: {
    alignSelf: "flex-start",
    marginBottom: ui.spacing.md,
    marginTop: ui.spacing.sm,
  },
  tipsContainer: {
    width: "100%",
    gap: ui.spacing.md,
    marginTop: ui.spacing.sm,
  },
  tipItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: ui.spacing.md,
    paddingVertical: ui.spacing.sm,
  },
  tipIconWrapper: {
    width: ui.spacing.xxl,
    height: ui.spacing.xxl,
    borderRadius: ui.radii.pill,
    alignItems: "center",
    justifyContent: "center",
    marginRight: ui.spacing.sm,
  },
  tipText: {
    flex: 1,
  },
  cta: {
    width: "100%",
    marginTop: ui.spacing.xxl,
  },
});
