import { BackButton } from "@/src/components/shared/BackButton";
import { Screen } from "@/src/components/shared/Screen";
import { useTheme } from "@/src/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function Suggest() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
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
              <Text style={styles.title}>Limpieza Facial</Text>
              <Text style={styles.subtitle}>Tratamiento profesional</Text>
            </View>
          </ImageBackground>
        </View>

        <View
          style={[styles.card, { backgroundColor: colors.gradientCardStart }]}
        >
          <View>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Descripción del tratamiento
            </Text>

            <Text style={[styles.desc, { color: colors.textSecondary }]}>
              La limpieza facial profunda elimina impurezas, celulas muertas y
              toxinas de la piel, dejándola suave, luminosa y revitalizada.
              Incluye exfoliación, extracción controlada y mascarilla hidratante
              para mejorar la salud del cutis.
            </Text>
          </View>
          <View style={styles.buttonsRow}>
            <Pressable
              style={[styles.whatsappBtn, { backgroundColor: colors.success }]}
            >
              <Ionicons name="logo-whatsapp" size={22} color={colors.card} />
              <Text style={[styles.whatsappText, { color: colors.card }]}>
                Contactar asesor
              </Text>
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

  backButton: {
    position: "absolute",
    left: 16,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(0,0,0,0.35)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },

  titleWrapper: {
    paddingHorizontal: 20,
    paddingBottom: 28,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },

  subtitle: {
    fontSize: 16,
    color: "#eee",
    marginTop: 4,
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

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  desc: {
    fontSize: 15.5,
    lineHeight: 23,
    marginBottom: 28,
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

  whatsappText: {
    fontSize: 15,
    fontWeight: "600",
  },
});
