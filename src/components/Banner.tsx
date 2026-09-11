import { MaterialIcons } from "@expo/vector-icons";
import { useVideoPlayer, VideoView } from "expo-video";
import React from "react";
import { Image, Modal, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ui } from "@/src/themes/ui";
import { BannerMedia } from "../modules/banner/types/banner.type";

interface BannerProps {
  bannerData: BannerMedia;
  visible: boolean;
  onClose: () => void;
}

export const BannerModal = ({ bannerData, visible, onClose }: BannerProps) => {
  const insets = useSafeAreaInsets();

  const player = useVideoPlayer(bannerData.media, (player) => {
    player.loop = true;
    player.muted = false;
    player.play();
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.container}>
        {bannerData.tipo === "image" ? (
          <Image
            source={{ uri: bannerData.media }}
            style={StyleSheet.absoluteFillObject}
            resizeMode="cover"
          />
        ) : (
          <VideoView
            player={player}
            contentFit="cover" // Importante: cover asegura que no queden franjas negras
            style={StyleSheet.absoluteFillObject}
            nativeControls={false}
          />
        )}

        <View style={[styles.header, { top: insets.top + ui.spacing.sm }]}>
          <Pressable style={styles.closeBtn} onPress={onClose} hitSlop={ui.spacing.md}>
            <MaterialIcons name="close" size={24} color="#FFF" />
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // Fondo negro por si la imagen tarda 1 segundo en cargar
  },
  topGradient: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 120,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  bottomGradient: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 200,
  },
  header: {
    position: "absolute",
    right: ui.spacing.lg,
    zIndex: 50,
  },
  closeBtn: {
    width: ui.tapTarget,
    height: ui.tapTarget,
    borderRadius: ui.radii.pill,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: ui.borders.width,
    borderColor: "rgba(255,255,255,0.2)",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingHorizontal: 24,
    zIndex: 50,
  },
  actionButton: {
    height: 56,
    borderRadius: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  skipBtn: {
    marginTop: 16,
    alignItems: "center",
    paddingVertical: 10,
  },
  skipText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "600",
    opacity: 0.8,
  },
});
