import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useVideoPlayer, VideoView } from "expo-video";
import { useState } from "react";
import { ImageBackground, Pressable, StyleSheet, View } from "react-native";
import ThemedText from "../components/shared/themed-text";

export function VideoCard({ video, isActive, colors }: any) {
  const [isMuted, setIsMuted] = useState(false);
  const player = useVideoPlayer(video.videoUrl, (player) => {
    player.loop = false;
    player.muted = false;
  });

  if (isActive) {
    player.play();
  } else {
    player.pause();
  }

  return (
    <View style={[styles.videoCard, { backgroundColor: colors.surface }]}>
      <View style={styles.thumbnailContainer}>
        {isActive ? (
          <VideoView
            player={player}
            style={styles.thumbnail}
            contentFit="cover"
            nativeControls={false}
          />
        ) : (
          <ImageBackground source={video.thumbnail} style={styles.thumbnail}>
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.4)"]}
              style={StyleSheet.absoluteFillObject}
            />
          </ImageBackground>
        )}

        <View style={styles.durationBadge}>
          <Ionicons name="time" size={12} color="#fff" />
          <ThemedText style={styles.durationText}>{video.duration}</ThemedText>
        </View>

        <View style={styles.muteButton}>
          <Pressable
            onPress={() => {
              player.muted = !player.muted;
              setIsMuted(!isMuted);
            }}
          >
            <Ionicons
              name={isMuted ? "volume-mute" : "volume-high"}
              size={20}
              color="#fff"
            />
          </Pressable>
        </View>
      </View>

      <View style={styles.videoInfo}>
        <ThemedText numberOfLines={2} color={colors.text}>
          {video.title}
        </ThemedText>

        <ThemedText
          numberOfLines={2}
          style={[styles.videoDescription, { color: colors.textSecondary }]}
        >
          {video.description}
        </ThemedText>

        <View style={styles.metaContainer}>
          <Ionicons name="eye-outline" size={14} color={colors.text} />
          <ThemedText color={colors.textSecondary}>{video.views}</ThemedText>
          <ThemedText color={colors.text}>• {video.date}</ThemedText>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  videoCard: {
    borderRadius: 20,
    overflow: "hidden",
    elevation: 5,
  },
  thumbnailContainer: {
    height: 200,
    backgroundColor: "#000",
  },
  thumbnail: {
    width: "100%",
    height: "100%",
  },
  durationBadge: {
    position: "absolute",
    bottom: 12,
    right: 12,
    backgroundColor: "rgba(0,0,0,0.85)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  muteButton: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 8,
  },
  durationText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
  videoInfo: {
    padding: 16,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },
  videoDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
  },
  metaContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  metaText: {
    fontSize: 13,
  },
});
