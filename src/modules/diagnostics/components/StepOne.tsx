import ThemedText from "@/src/components/shared/themed-text";
import { MaterialIcons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../../../context/ThemeContext";

export default function StepOne() {
  const { colors } = useTheme();

  const tips = [
    { icon: "face", text: "Relaja tu rostro" },
    { icon: "remove-red-eye", text: "Quita gafas, tapabocas o gorra" },
    { icon: "wb-sunny", text: "Busca un lugar bien iluminado" },
    { icon: "camera", text: "Mantén tu rostro centrado" },
  ];

  return (
    <View style={styles.card}>
      <View style={[styles.animationWrapper, { borderColor: colors.primary }]}>
        <LottieView
          source={require("../../../../assets/animations/profile-avatar-of-young-boy.json")}
          autoPlay
          loop={true}
          style={styles.animation}
        />
      </View>
      <ThemedText
        type="title"
        style={[styles.title, { color: colors.primary }]}
      >
        Bienvenido al diagnóstico
      </ThemedText>
      <ThemedText style={[styles.description, { color: colors.textSecondary }]}>
        Para mejores resultados, por favor retírate gafas, gorra o cualquier
        cosa que obstruya tu rostro.
      </ThemedText>
      <ThemedText
        type="semiBold"
        style={[styles.subtitle, { color: colors.text }]}
      >
        Algunos tips para mejorar el diagnóstico:
      </ThemedText>
      <View style={styles.tipsContainer}>
        {tips.map((tip, index) => (
          <View key={index} style={styles.tipItem}>
            <View
              style={[
                styles.tipIconWrapper,
                { backgroundColor: colors.primary + "22" },
              ]}
            >
              <MaterialIcons
                name={tip.icon as any}
                size={22}
                color={colors.primary}
              />
            </View>
            <ThemedText
              style={[styles.tipText, { color: colors.textSecondary }]}
            >
              {tip.text}
            </ThemedText>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    maxWidth: 370,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    marginVertical: 24,
  },
  animationWrapper: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    borderWidth: 2,
    borderColor: "#e0e0e0",
  },
  animation: {
    width: 220,
    height: 220,
  },
  title: {
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    textAlign: "center",
    marginBottom: 18,
  },
  subtitle: {
    alignSelf: "flex-start",
    marginBottom: 14,
    marginTop: 8,
  },
  tipsContainer: {
    width: "100%",
    gap: 14,
    marginTop: 8,
  },
  tipItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 6,
  },
  tipIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  tipText: {
    flex: 1,
  },
});
