import PrimaryButton from "@/src/components/shared/PrimaryButton";
import { Screen } from "@/src/components/shared/Screen";
import ThemedText from "@/src/components/shared/themed-text";
import { MaterialIcons } from "@expo/vector-icons";
import { MotiView } from "moti";
import React from "react";
import { Dimensions, Image, ScrollView, StyleSheet, View } from "react-native";
import { useTheme } from "../../../context/ThemeContext";

const { height } = Dimensions.get("window");

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
          <ThemedText type="title" style={styles.title}>
            Análisis Fallido
          </ThemedText>
          <ThemedText style={styles.messageText}>{message}</ThemedText>
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
          <ThemedText style={styles.tipsTitle}>
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
              <ThemedText style={styles.tipText}>{tip.text}</ThemedText>
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
    paddingTop: 40,
    paddingHorizontal: 24,
    paddingBottom: 120,
  },
  photoContainer: {
    width: 180,
    height: 180,
    borderRadius: 90,
    overflow: "hidden",
    marginBottom: 24,
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
    borderRadius: 12,
    padding: 4,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 8,
  },
  messageText: {
    fontSize: 16,
    textAlign: "center",
    opacity: 0.6,
    paddingHorizontal: 10,
  },
  tipsContainer: {
    width: "100%",
    padding: 20,
  },
  tipsTitle: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 16,
    marginLeft: 4,
  },
  tipItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  tipIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
  },

  buttonWidth: {
    width: "100%",
  },
});
