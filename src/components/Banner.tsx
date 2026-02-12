import { useVideoPlayer, VideoView } from "expo-video";
import React from "react";
import { Image, Modal, Pressable, Text, View } from "react-native";
import { BannerMedia } from "../modules/banner/types/banner.type";

interface BannerProps {
  bannerData: BannerMedia;
  visible: boolean;
  onClose: () => void;
}

export const BannerModal = ({ bannerData, visible, onClose }: BannerProps) => {
  const player = useVideoPlayer(bannerData.media, (player) => {
    player.loop = true;
    player.muted = false;
    player.play();
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Pressable
        className="flex-1 justify-center items-center bg-black/90 px-5"
        onPress={onClose}
      >
        <Pressable
          className="w-full max-w-[400px] bg-white overflow-hidden shadow-2xl "
          onPress={(e) => e.stopPropagation()}
        >
          <Pressable
            className="absolute top-4 right-4 z-50 w-9 h-9 rounded-full bg-black/50 items-center justify-center"
            onPress={onClose}
            hitSlop={10}
          >
            <Text className="text-white text-lg font-bold">✕</Text>
          </Pressable>

          <View
            style={{
              width: "100%",
              height: 550,
              maxHeight: 550,
              backgroundColor: "#000",
            }}
          >
            {bannerData.tipo === "image" ? (
              <Image
                source={{ uri: bannerData.media }}
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
              />
            ) : (
              <VideoView
                player={player}
                contentFit="fill"
                style={{ width: "100%", height: "100%" }}
                nativeControls={false}
              />
            )}
          </View>

          {/* Opcional: Footer si lo necesitas */}
          {/* <View className="p-5 items-center">
             <Text className="text-xl font-bold text-gray-900">Promoción Especial</Text>
          </View> */}
        </Pressable>
      </Pressable>
    </Modal>
  );
};
