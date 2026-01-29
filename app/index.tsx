import PrimaryButton from "@/src/components/shared/PrimaryButton";
import { useAuth } from "@/src/context/AuthContext";
import { useTheme } from "@/src/context/ThemeContext";
import { useRouter } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";
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
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (token) {
    return null;
  }

  return (
    <View style={styles.container} className="bg-red-400">
      <VideoView
        player={player}
        allowsPictureInPicture
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.overlay} />
      <View style={styles.content}>
        <PrimaryButton
          textStyle={styles.buttonText}
          title="Iniciar Sesión"
          onPress={() => router.push("/login")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    height: "100%",
    alignItems: "center",
    backgroundColor: "#000",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  content: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 60,
  },
  button: {
    backgroundColor: "#fff",
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 32,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: "#111",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});
