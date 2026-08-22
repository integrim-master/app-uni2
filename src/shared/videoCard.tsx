import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useVideoPlayer, VideoView } from "expo-video";
import { useState } from "react";
import { ImageBackground, Pressable, StyleSheet, View } from "react-native";
import ThemedText from "../components/shared/themed-text";
import { ui } from "../themes/ui";

const THUMB_HEIGHT = 200;

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
          <ThemedText type="caption" weight="bold" tone="inverse">
            {video.duration}
          </ThemedText>
        </View>

        <View style={styles.muteButton}>
          <Pressable
            onPress={() => {
              player.muted = !player.muted;
              setIsMuted(!isMuted);
            }}
            style={styles.muteHit}
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
        <ThemedText type="titleSm" numberOfLines={2}>
          {video.title}
        </ThemedText>

        <ThemedText type="body" tone="secondary" numberOfLines={2} style={styles.videoDescription}>
          {video.description}
        </ThemedText>

        <View style={styles.metaContainer}>
          <Ionicons name="eye-outline" size={14} color={colors.text} />
          <ThemedText type="caption" tone="secondary">
            {video.views}
          </ThemedText>
          <ThemedText type="caption">• {video.date}</ThemedText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  videoCard: {
    borderRadius: ui.radii.xl,
    overflow: "hidden",
    elevation: 5,
  },
  thumbnailContainer: {
    height: THUMB_HEIGHT,
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
    paddingHorizontal: ui.spacing.md,
    paddingVertical: ui.spacing.sm,
    borderRadius: ui.radii.sm,
    flexDirection: "row",
    alignItems: "center",
    gap: ui.spacing.xs,
  },
  muteButton: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: ui.radii.pill,
    padding: ui.spacing.sm,
  },
  muteHit: {
    minWidth: ui.tapTarget,
    minHeight: ui.tapTarget,
    alignItems: "center",
    justifyContent: "center",
  },
  videoInfo: {
    padding: ui.spacing.lg,
  },
  videoDescription: {
    marginBottom: ui.spacing.md,
  },
  metaContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: ui.spacing.sm,
  },
});
