import PrimaryButton from "@/src/components/shared/PrimaryButton";
import { useAuth } from "@/src/context/AuthContext";
import { useTheme } from "@/src/context/ThemeContext";
import { useRouter } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";
import { MotiView } from "moti";
import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function Index() {
  const { loading, token } = useAuth();
  const { colors } = useTheme();
  const router = useRouter();

  const videoSource =
    "https://api.careme360.com/wp-content/uploads/2026/01/loop-tratamientos-10-seg.mp4";

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.play();
  });

  useEffect(() => {
    if (token) {
      router.replace("/home");
    }
  }, [token]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (token) return null;

  return (
    <View style={styles.container}>
      <VideoView player={player} style={StyleSheet.absoluteFillObject} />

      {/* Overlay con gradiente visual */}
      <View style={styles.overlay} />

      <MotiView
        from={{ opacity: 0, translateY: 30 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 500 }}
        style={styles.content}
      >
        <PrimaryButton
          title="Iniciar sesión"
          onPress={() => router.push("/login")}
          textStyle={styles.buttonText}
        />
      </MotiView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
  },

  content: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingBottom: 70,
  },

  buttonText: {
    fontSize: 18,
    fontWeight: "700",
  },

  secondaryAction: {
    marginTop: 16,
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
  },
});
