import PrimaryButton from "@/src/components/shared/PrimaryButton";
import { Screen } from "@/src/components/shared/Screen";
import ThemedText from "@/src/components/shared/themed-text";
import { ui } from "@/src/themes/ui";
import { MaterialIcons } from "@expo/vector-icons";
import { MotiView } from "moti";
import React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { useTheme } from "../../../context/ThemeContext";

const PHOTO_SIZE = 180;

type ErrorViewProps = {
  message: string;
  reason?: string;
  photoUri?: string;
  onRetry: () => void;
};

const RECOMMENDATIONS = [
  {
    id: 1,
    text: "Busca un lugar con buena iluminación natural.",
    icon: "wb-sunny",
  },
  {
    id: 2,
    text: "Retira accesorios como lentes, gorras o cubrebocas.",
    icon: "face",
  },
  {
    id: 3,
    text: "Mantén una expresión neutral y mira de frente.",
    icon: "straighten",
  },
  {
    id: 4,
    text: "Asegúrate de que tu rostro esté bien centrado.",
    icon: "center-focus-strong",
  },
];

export default function ErrorScreen({
  message,
  reason,
  onRetry,
  photoUri,
}: ErrorViewProps) {
  const { colors } = useTheme();

  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {photoUri && (
          <MotiView
            from={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={styles.photoContainer}
          >
            <Image source={{ uri: photoUri }} style={styles.photoPreview} />
            <MotiView
              from={{ translateY: 0 }}
              animate={{ translateY: 180 }}
              transition={{ loop: true, duration: 1500, type: "timing" }}
              style={[styles.scanLine, { backgroundColor: colors.primary }]}
            />
            <View style={styles.errorBadge}>
              <MaterialIcons name="close" size={16} color="white" />
            </View>
          </MotiView>
        )}

        <MotiView
          from={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          style={styles.headerContainer}
        >
          <ThemedText type="display" tone="primary" align="center" style={styles.title}>
            Análisis Fallido
          </ThemedText>
          <ThemedText type="body" color={colors.dangerLight} align="center" style={styles.messageText}>
            {message}
          </ThemedText>
        </MotiView>

        {/* Comentado: Recomendación dinámica del back
        {reason && (
           <View style={[styles.reasonBadge, { backgroundColor: colors.primary + '10' }]}>
              <ThemedText style={[styles.reasonTag, { color: colors.primary }]}>
                INFO: {reason}
              </ThemedText>
           </View>
        )} 
        */}

        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 300 }}
          style={[styles.tipsContainer]}
        >
          <ThemedText type="subtitle" style={styles.tipsTitle}>
            Consejos para una mejor foto:
          </ThemedText>

          {RECOMMENDATIONS.map((tip, index) => (
            <MotiView
              key={tip.id}
              from={{ opacity: 0, translateX: -10 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ delay: 400 + index * 100 }}
              style={styles.tipItem}
            >
              <View
                style={[
                  styles.tipIcon,
                  { backgroundColor: colors.primary + "15" },
                ]}
              >
                <MaterialIcons
                  name={tip.icon as any}
                  size={18}
                  color={colors.primary}
                />
              </View>
              <ThemedText type="body" style={styles.tipText}>
                {tip.text}
              </ThemedText>
            </MotiView>
          ))}
        </MotiView>
        <View style={styles.buttonWidth}>
          <PrimaryButton title="Reintentar Captura" onPress={onRetry} />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    paddingTop: ui.spacing.xxl,
    paddingHorizontal: ui.spacing.xl,
    paddingBottom: 120,
  },
  photoContainer: {
    width: PHOTO_SIZE,
    height: PHOTO_SIZE,
    borderRadius: PHOTO_SIZE / 2,
    overflow: "hidden",
    marginBottom: ui.spacing.xl,
    borderWidth: 4,
    borderColor: "#ff444430",
  },
  photoPreview: {
    width: "100%",
    height: "100%",
    opacity: 0.6,
  },
  scanLine: {
    position: "absolute",
    width: "100%",
    height: 4,
    shadowColor: "red",
  },
  errorBadge: {
    position: "absolute",
    bottom: 10,
    right: "40%",
    backgroundColor: "#ff4444",
    borderRadius: ui.radii.md,
    padding: ui.spacing.xs,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: ui.spacing.xl,
  },
  title: {
    marginBottom: ui.spacing.sm,
  },
  messageText: {
    opacity: 0.6,
    paddingHorizontal: ui.spacing.md,
  },
  tipsContainer: {
    width: "100%",
    padding: ui.spacing.xl,
  },
  tipsTitle: {
    marginBottom: ui.spacing.lg,
    marginLeft: ui.spacing.xs,
  },
  tipItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: ui.spacing.md,
  },
  tipIcon: {
    width: ui.spacing.xxl,
    height: ui.spacing.xxl,
    borderRadius: ui.radii.pill,
    alignItems: "center",
    justifyContent: "center",
    marginRight: ui.spacing.md,
  },
  tipText: {
    flex: 1,
    opacity: 0.8,
  },
  buttonWidth: {
    width: "100%",
  },
});
