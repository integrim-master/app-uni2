import { BackButton } from "@/src/components/shared/BackButton";
import { Screen } from "@/src/components/shared/Screen";
import ThemedText from "@/src/components/shared/themed-text";
import { useTheme } from "@/src/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { ui } from "@/src/themes/ui";

export default function Suggest() {
  const { colors } = useTheme();
  return (
    <Screen>
      <View style={styles.flex}>
        <BackButton />
        <View style={styles.imageWrapper}>
          <ImageBackground
            source={require("@/assets/images/campana.jpg")}
            style={styles.image}
            imageStyle={{ borderRadius: 0 }}
          >
            <View style={styles.gradientOverlay} />

            <View style={styles.titleWrapper}>
              <ThemedText type="display" tone="inverse">
                Limpieza Facial
              </ThemedText>
              <ThemedText type="body" tone="inverse">
                Tratamiento profesional
              </ThemedText>
            </View>
          </ImageBackground>
        </View>

        <View
          style={[styles.card, { backgroundColor: colors.gradientCard[0] }]}
        >
          <View style={styles.copyBlock}>
            <ThemedText type="titleSm">
              Descripción del tratamiento
            </ThemedText>

            <ThemedText type="body" tone="secondary">
              La limpieza facial profunda elimina impurezas, celulas muertas y
              toxinas de la piel, dejándola suave, luminosa y revitalizada.
              Incluye exfoliación, extracción controlada y mascarilla hidratante
              para mejorar la salud del cutis.
            </ThemedText>
          </View>
          <View style={styles.buttonsRow}>
            <Pressable
              style={[styles.whatsappBtn, { backgroundColor: colors.success }]}
            >
              <Ionicons name="logo-whatsapp" size={22} color={colors.card} />
              <ThemedText type="semiBold" color={colors.card}>
                Contactar asesor
              </ThemedText>
            </Pressable>
          </View>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  imageWrapper: {
    width: "100%",
    height: 260,
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  titleWrapper: {
    paddingHorizontal: ui.spacing.lg,
    paddingBottom: ui.spacing.xl,
    gap: ui.spacing.sm,
  },
  copyBlock: {
    gap: ui.spacing.md,
    marginBottom: ui.spacing.xl,
  },
  card: {
    marginTop: -ui.spacing.xl,
    borderTopLeftRadius: ui.radii.xl,
    borderTopRightRadius: ui.radii.xl,
    padding: ui.spacing.xl,
    paddingBottom: ui.spacing.xxl,
    flex: 1,
  },
  buttonsRow: {
    flexDirection: "row",
    gap: ui.spacing.md,
  },
  whatsappBtn: {
    flex: 1,
    flexDirection: "row",
    minHeight: ui.tapTarget,
    paddingVertical: ui.spacing.md,
    borderRadius: ui.radii.md,
    alignItems: "center",
    justifyContent: "center",
    gap: ui.spacing.sm,
  },
});
