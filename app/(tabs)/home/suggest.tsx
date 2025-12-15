import { Screen } from "@/components/shared/Screen";
import { Ionicons } from "@expo/vector-icons";
import { ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../../context/ThemeContext";

export default function Suggest() {
  const { colors } = useTheme();

  return (
    <Screen style={[styles.container, { backgroundColor: colors.background }]}> 
      <View style={styles.imageWrapper}>
        <ImageBackground
          source={require("../../../assets/images/campana.jpg")}
          style={styles.image}
          imageStyle={{ borderRadius: 0 }}
        >
          <View style={styles.gradientOverlay} />

          <View style={styles.titleWrapper}>
            <Text style={[styles.title, { color: "#fff" }]}>Limpieza Facial</Text>
            <Text style={[styles.subtitle, { color: "#eee" }]}>Tratamiento profesional</Text>
          </View>
        </ImageBackground>
      </View>


      <View style={[styles.card, { backgroundColor: colors.gradientCardStart }] }>
       <View>
         <Text style={[styles.sectionTitle, { color: colors.text }]}>Descripción del tratamiento</Text>

        <Text style={[styles.desc, { color: colors.textSecondary }] }>
          La limpieza facial profunda elimina impurezas, células muertas y 
          toxinas de la piel, dejándola suave, luminosa y revitalizada. 
          Incluye exfoliación, extracción controlada y mascarilla hidratante 
          para mejorar la salud del cutis.
        </Text>
       </View>


        <View style={styles.buttonsRow}>
          <Pressable style={[styles.whatsappBtn, { backgroundColor: colors.success }]}> 
            <Ionicons name="logo-whatsapp" size={22} color={colors.card} />
            <Text style={[styles.whatsappText, { color: colors.card }]}>Contactar asesor</Text>
          </Pressable>

        
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

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
    backgroundColor: "#fff",
    display: "flex",
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    padding: 20,
    paddingBottom: 40,
    height: "100%",

    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 10,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#222",
  },

  desc: {
    fontSize: 15.5,
    lineHeight: 23,
    color: "#555",
    marginBottom: 28,
  },


  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },

  whatsappBtn: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#25D366",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    elevation: 2,
  },
  whatsappText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },

  moreBtn: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  moreText: {
    color: "#444",
    fontSize: 15,
    fontWeight: "600",
  },
});
