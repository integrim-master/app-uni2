import PrimaryButton from "@/src/components/shared/PrimaryButton";
import ThemedText from "@/src/components/shared/themed-text";
import { useIsFocused } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";
import { MotiView } from "moti";
import React, { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function WelcomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();

  const videoSource =
    "https://api.careme360.com/wp-content/uploads/2026/02/loop-tratamientos-10-seg.mp4";

  const player = useVideoPlayer(videoSource, (videoPlayer) => {
    videoPlayer.loop = true;
    videoPlayer.muted = true;
  });

  useEffect(() => {
    if (!player) return;
    if (isFocused) {
      player.play();
    } else {
      player.pause();
    }
  }, [isFocused, player]);

  return (
    <View style={styles.container}>
      {isFocused ? (
        <VideoView
          player={player}
          contentFit="cover"
          style={StyleSheet.absoluteFillObject}
          nativeControls={false}
        />
      ) : null}

      <View style={styles.darkOverlay} />

      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.8)"]}
        style={styles.bottomGradient}
      />

      <View
        style={[
          styles.contentWrapper,
          {
            paddingTop: insets.top,
            paddingBottom: Math.max(insets.bottom, 20),
          },
        ]}
      >
        <View style={styles.body}>
          <MotiView
            from={{ opacity: 0, translateY: 20, scale: 0.9 }}
            animate={{ opacity: 1, translateY: 0, scale: 1 }}
            transition={{ type: "spring", duration: 1200, delay: 300 }}
            style={styles.logoWrapper}
          >
            <Image
              source={require("@/assets/images/logo-careme-white.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </MotiView>

          <MotiView
            from={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ type: "timing", duration: 800, delay: 700 }}
            style={styles.divider}
          />
        </View>

        <MotiView
          from={{ opacity: 0, translateY: 40 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "spring", duration: 1000, delay: 1200 }}
          style={styles.footer}
        >
          <View className="w-full">
            <PrimaryButton
              title="Entrar"
              onPress={() => router.push("/login")}
              textStyle={{ color: "#000", fontWeight: "800" }}
            />
          </View>
          <MotiView
            from={{ opacity: 0, translateY: 15 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "timing", duration: 800, delay: 900 }}
          >
            <ThemedText
              type="micro"
              tone="inverse"
              style={{
                textTransform: "uppercase",
              }}
            >
              Tu bienestar, es nuestra prioridad
            </ThemedText>
          </MotiView>
        </MotiView>
      </View>
    </View>
  );
}

const GOLD = "#D4AF37";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  bottomGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "40%",
  },

  contentWrapper: {
    flex: 1,
    justifyContent: "space-between",
    zIndex: 10,
  },

  body: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  logoWrapper: {
    marginBottom: 24,
    shadowColor: GOLD,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  logo: {
    width: 220,
    height: 90,
  },
  divider: {
    width: 60,
    height: 2,
    backgroundColor: GOLD,
    borderRadius: 2,
    marginBottom: 20,
    opacity: 0.9,
  },

  footer: {
    width: "100%",
    paddingHorizontal: 28,
    paddingBottom: 20,
    alignItems: "center",
    gap: 16,
  },
});
