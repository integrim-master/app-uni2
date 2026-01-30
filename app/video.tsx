import { BackButton } from "@/src/components/shared/BackButton";
import { Screen } from "@/src/components/shared/Screen";
import ThemedText from "@/src/components/shared/themed-text";
import { useTheme } from "@/src/context/ThemeContext";
import CardMovies from "@/src/modules/media/components/CardMovies";
import CircleCard from "@/src/shared/CircleCard";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";
import { MotiView } from "moti";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";

function FavoriteParticle({ index }: { index: number }) {
  const angle = (Math.PI * 2 * index) / 6;
  const distance = 22;

  return (
    <MotiView
      from={{ opacity: 1, scale: 0.4, translateX: 0, translateY: 0 }}
      animate={{
        opacity: 0,
        scale: 1,
        translateX: Math.cos(angle) * distance,
        translateY: Math.sin(angle) * distance,
      }}
      transition={{ type: "timing", duration: 350 }}
      style={{ position: "absolute" }}
    >
      <Ionicons name="egg" size={10} color="#FFD700" />
    </MotiView>
  );
}

export default function VideoDetailsScreen() {
  const { width } = useWindowDimensions();
  const { colors } = useTheme();
  // const { favorites, addFavorite, removeFavorite } = useFavorites();
  const router = useRouter();

  const videoSource =
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
  });

  const [showPoster, setShowPoster] = useState(true);
  // const [isFavorite, setIsFavorite] = useState(false);
  // const [burstKey, setBurstKey] = useState(0);

  const videoData = {
    id: "1",
    title: "Procedimiento de Abdomen",
    subtitle: "Número top en visualizaciones",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis libero nesciunt nostrum, aperiam dolorum architecto! Itaque quia voluptatem eveniet voluptates placeat illum.",
    duration: "12:34",
    category: "Cirugía",
    views: "1,200",
    image: require("@/assets/images/campana.jpg"),
  };

  const relatedVideos = [
    { id: "1", title: "Cirugía Laparoscópica", duration: "08:45" },
    { id: "2", title: "Técnicas Avanzadas", duration: "15:20" },
    { id: "3", title: "Casos Clínicos", duration: "10:30" },
    { id: "4", title: "Postoperatorio", duration: "06:15" },
  ];

  // const isVideo = favorites.some((f) => f.id === videoData.id);

  return (
    <Screen safeArea={true}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <BackButton />

        <View style={styles.headerSection}>
          {showPoster ? (
            <>
              <Image
                source={videoData.image}
                style={[styles.headerImage, { width }]}
                resizeMode="cover"
              />
              <LinearGradient
                colors={[
                  "rgba(0,0,0,0)",
                  "rgba(0,0,0,0.2)",
                  "rgba(0,0,0,0.7)",
                  colors.background,
                ]}
                locations={[0, 0.3, 0.65, 1]}
                style={styles.gradient}
              />
            </>
          ) : (
            <View>
              {/* <View>\</View> */}
              <VideoView
                style={[styles.headerImage, { width }]}
                player={player}
                allowsFullscreen
                allowsPictureInPicture
              />
            </View>
          )}

          {showPoster && (
            <Pressable
              style={styles.playButtonOverlay}
              onPress={() => {
                setShowPoster(false);
                player.play();
              }}
            >
              <Ionicons name="play-circle" size={64} color={colors.text} />
            </Pressable>
          )}
        </View>

        <View style={styles.mainInfoSection} >
          <View
            style={[styles.actionsContainer, { backgroundColor: colors.card }]}
          >
            {/* <Pressable
              style={styles.actionButton}
              onPress={() => {
                setBurstKey(burstKey + 1);
                if (isVideo) {
                  removeFavorite(videoData.id);
                } else {
                  addFavorite(videoData);
                }
                setIsFavorite(!isFavorite);
              }}
            >
              <View style={styles.iconWrapper}>
                {isFavorite &&
                  Array.from({ length: 6 }).map((_, i) => (
                    <FavoriteParticle key={`${burstKey}-${i}`} index={i} />
                  ))}

                <MotiView
                  animate={{ scale: isFavorite ? [1, 1.4, 1] : 1 }}
                  transition={{ type: "spring", stiffness: 280 }}
                >
                  <Ionicons
                    name={isVideo ? "heart" : "heart-outline"}
                    size={24}
                    color={isVideo ? "#FFD700" : colors.text}
                  />
                </MotiView>
              </View>

              <ThemedText color={colors.text} style={styles.actionLabel}>
                {isVideo ? "Guardado" : "Favorito"}
              </ThemedText>
            </Pressable> */}

            <View
              style={{
                flexDirection: "row",
                gap: 24,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Pressable style={styles.actionButton}>
                <View style={styles.iconWrapper}>
                  <Ionicons name="arrow-down" size={22} color={colors.text} />
                </View>
                <ThemedText type="caption" color={colors.text}>
                  Descargar
                </ThemedText>
              </Pressable>
              <Pressable style={styles.actionButton}>
                <View style={styles.iconWrapper}>
                  <Ionicons
                    name="share-outline"
                    size={22}
                    color={colors.text}
                  />
                </View>
                <ThemedText type="caption" color={colors.text}>
                  Compartir
                </ThemedText>
              </Pressable>
            </View>
          </View>

          <View style={styles.titleRow}>
            <CircleCard size={60} image={videoData.image} />
            <View style={{ flex: 1 }}>
              <ThemedText type="subtitle" color={colors.text}>
                {videoData.title}
              </ThemedText>
              <ThemedText color={colors.textSecondary}>
                {videoData.duration} - {videoData.category} - {videoData.views}{" "}
                vistas
              </ThemedText>
            </View>
          </View>

          <View style={styles.separator} />

          <ThemedText color={colors.textSecondary} style={styles.description}>
            {videoData.description}
          </ThemedText>

          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <ThemedText color={colors.textSecondary}>Categorias: </ThemedText>
            <Pressable
              onPress={() =>
                router.push(`/category?category=${videoData.category}`)
              }
            >
              <ThemedText
                color={colors.primary}
                style={{ textDecorationLine: "underline" }}
              >
                {videoData.category}
              </ThemedText>
            </Pressable>
          </View>
        </View>

        <View style={styles.relatedSection}>
          <ThemedText
            type="subtitle"
            color={colors.text}
            style={styles.relatedTitle}
          >
            Relacionados
          </ThemedText>

          <FlatList
            data={relatedVideos}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.relatedList}
            renderItem={({ item }) => (
              <CardMovies item={item} onPress={() => {}} />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  headerSection: {
    position: "relative",
    height: 350,
  },
  headerImage: {
    height: "100%",
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "70%",
  },
  playButtonOverlay: {
    position: "absolute",
    inset: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  mainInfoSection: {
    padding: 12,
    gap: 8,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 18,
    marginVertical: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  actionButton: {
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  actionLabel: {
    fontSize: 11,
    opacity: 0.8,
  },
  titleRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 10,
  },
  separator: {
    height: 1,
    opacity: 0.2,
    backgroundColor: "#999",
    marginVertical: 5,
  },
  description: {
    lineHeight: 24,
  },
  relatedSection: {
    padding: 10,
    paddingTop: 20,
  },
  relatedTitle: {
    marginBottom: 16,
  },
  relatedList: {
    gap: 12,
  },
});
