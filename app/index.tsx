import PrimaryButton from "@/src/components/shared/PrimaryButton";
import { useAuth } from "@/src/context/AuthContext";
import { useTheme } from "@/src/context/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
// import { useVideoPlayer, VideoView } from "expo-video";
import { MotiView } from "moti";
import React, { useEffect } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const { loading, token } = useAuth();
  const { colors } = useTheme();
  const router = useRouter();

  // --- Video comentado temporalmente ---
  // const videoSource =
  //   "https://api.careme360.com/wp-content/uploads/2026/01/loop-tratamientos-10-seg.mp4";
  // const player = useVideoPlayer(videoSource, (player) => {
  //   player.loop = true;
  //   player.play();
  // });

  useEffect(() => {
    if (token) {
      router.replace("/home");
    }
  }, [token]);

  if (loading) {
    return (
      <LinearGradient colors={colors.gradientBackground} style={styles.center}>
        <ActivityIndicator size="large" color="#D4AF37" />
      </LinearGradient>
    );
  }

  if (token) return null;

  return (
    <LinearGradient
      colors={[
        colors.gradientCardStart,
        colors.backgroundLight,
        colors.gradientCardEnd,
      ]}
      locations={[0, 0.5, 1]}
      style={styles.container}
    >
      <View style={styles.glowTopLeft} />
      <View style={styles.glowBottomRight} />

      <View style={styles.body}>
        <MotiView
          from={{ scale: 0.85 }}
          animate={{ scale: 1 }}
          transition={{ type: "timing", duration: 700 }}
          style={styles.logoWrapper}
        >
          <Image
            source={require("@/assets/images/logo-careme-white.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </MotiView>

        <MotiView
          from={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ type: "timing", duration: 600, delay: 200 }}
          style={styles.divider}
        />

        <MotiView
          from={{ translateY: 12 }}
          animate={{ translateY: 0 }}
          transition={{ type: "timing", duration: 600, delay: 350 }}
        >
          <Text style={styles.tagline}>Tu bienestar, nuestra prioridad</Text>
        </MotiView>
      </View>

      <MotiView
        from={{ translateY: 30 }}
        animate={{ translateY: 0 }}
        transition={{ type: "timing", duration: 600, delay: 400 }}
        style={styles.footer}
      >
        <View>
          <PrimaryButton
            title="Entrar"
            size="lg"
            onPress={() => router.push("/login")}
            style={styles.button}
          />
        </View>
        <Text style={styles.footerNote}>
          Plataforma exclusiva de salud y bienestar
        </Text>
      </MotiView>
    </LinearGradient>
  );
}

const GOLD = "#D4AF37";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  glowTopLeft: {
    position: "absolute",
    top: -80,
    left: -80,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: "rgba(212,175,55,0.10)",
  },
  glowBottomRight: {
    position: "absolute",
    bottom: -100,
    right: -60,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: "rgba(138,43,226,0.10)",
  },

  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },

  logoWrapper: {
    marginBottom: 24,
    shadowColor: GOLD,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 12,
  },

  logo: {
    width: 200,
    height: 80,
  },

  divider: {
    width: 60,
    height: 2,
    backgroundColor: GOLD,
    borderRadius: 2,
    marginBottom: 20,
    opacity: 0.8,
  },

  tagline: {
    color: "rgba(255,255,255,0.55)",
    fontSize: 14,
    fontWeight: "400",
    letterSpacing: 1.4,
    textTransform: "uppercase",
    textAlign: "center",
  },
  footer: {
    width: "100%",
    paddingHorizontal: 28,
    paddingBottom: 52,
    alignItems: "center",
    gap: 14,
  },

  button: {
    borderRadius: 14,
    width: "100%",
  },

  buttonText: {
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.5,
    textAlign: "center",
  },

  footerNote: {
    color: "rgba(255,255,255,0.28)",
    fontSize: 12,
    letterSpacing: 0.6,
    textAlign: "center",
  },
});
