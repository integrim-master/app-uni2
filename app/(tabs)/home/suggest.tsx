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
import { SafeAreaView } from "react-native-safe-area-context";

export default function Suggest() {
  const { colors } = useTheme();
  return (
    <Screen>
      <SafeAreaView className="flex-1 ">
        <BackButton />
        <View style={styles.imageWrapper}>
          <ImageBackground
            source={require("../../../assets/images/campana.jpg")}
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
      </SafeAreaView>
    </Screen>
  );
}

const styles = StyleSheet.create({
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
    paddingHorizontal: 20,
    paddingBottom: 28,
    gap: 4,
  },
  copyBlock: {
    gap: 12,
    marginBottom: 28,
  },
  card: {
    marginTop: -24,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    padding: 20,
    paddingBottom: 40,
    flex: 1,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 10,
  },
  buttonsRow: {
    flexDirection: "row",
    gap: 12,
  },
  whatsappBtn: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    elevation: 2,
  },
});
