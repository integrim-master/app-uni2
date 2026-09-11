import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useRef } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, { Pagination } from "react-native-reanimated-carousel";
import ThemedText from "../components/shared/themed-text";
import { useTheme } from "../context/ThemeContext";
import { ui } from "../themes/ui";

type Slide = {
  id: string;
  title: string;
  subtitle?: string;
  image: any;
};

interface Props {
  data: Slide[];
  height?: number;
  openInfoModal?: (item: Slide) => void;
}

export default function SimpleCarousel({
  data,
  height = 420,
  openInfoModal,
}: Props) {
  const { width } = useWindowDimensions();
  const { colors } = useTheme();

  const progress = useSharedValue(0);
  const ref = useRef<any>(null);

  return (
    <View style={styles.container}>
      <Carousel
        ref={ref}
        width={width}
        height={height}
        data={data}
        loop
        autoPlay
        autoPlayInterval={4500}
        scrollAnimationDuration={800}
        onProgressChange={progress}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image
              source={item.image}
              style={styles.image}
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

            <LinearGradient
              colors={[
                "rgba(0,0,0,0.3)",
                "transparent",
                "transparent",
                "rgba(0,0,0,0.3)",
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.vignette}
            />

            <View style={styles.overlay}>
              <View style={styles.contentWrapper}>
                <View style={styles.actions}>
                  <View style={styles.titleBlock}>
                    <ThemedText type="title" numberOfLines={3}>
                      {item.title}
                    </ThemedText>
                    <ThemedText>Facial</ThemedText>
                  </View>

                  <View style={styles.iconActions}>
                    <Pressable
                      onPress={() => {
                        openInfoModal?.(item);
                      }}
                      style={styles.iconHit}
                    >
                      <Ionicons
                        name="information-circle-outline"
                        size={20}
                        color={colors.text}
                      />
                    </Pressable>
                    <Pressable style={styles.iconHit}>
                      <Ionicons name="add" size={20} color={colors.text} />
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
      />

      <Pagination.Basic
        progress={progress}
        data={data}
        containerStyle={styles.pagination}
        dotStyle={{
          backgroundColor: "rgba(255,255,255,0.3)",
          width: 8,
          height: 8,
          borderRadius: 4,
        }}
        activeDotStyle={{
          backgroundColor: colors.primary,
          width: 24,
          height: 8,
          borderRadius: 4,
        }}
        onPress={(index) =>
          ref.current?.scrollTo({
            count: index - progress.value,
            animated: true,
          })
        }
      />
    </View>
  );
}

function HeroButton({
  label,
  primary = false,
}: {
  label: string;
  primary?: boolean;
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.heroButton,
        {
          backgroundColor: primary ? "#fff" : "rgba(255,255,255,0.2)",
          opacity: pressed ? 0.8 : 1,
          transform: [{ scale: pressed ? 0.96 : 1 }],
        },
      ]}
    >
      <View style={styles.buttonContent}>
        <Ionicons
          name={primary ? "play" : "add"}
          size={20}
          color={primary ? "#000" : "#fff"}
        />
        <ThemedText
          type="semiBold"
          color={primary ? "#000" : "#fff"}
        >
          {label}
        </ThemedText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  slide: {
    width: "100%",
    height: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "70%",
  },
  vignette: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: ui.spacing.xl,
    paddingBottom: ui.spacing.xxl,
  },
  contentWrapper: {
    maxWidth: 600,
  },
  actions: {
    flexDirection: "row",
    gap: ui.spacing.md,
    width: "100%",
    justifyContent: "space-between",
    alignContent: "center",
    marginTop: ui.spacing.xl,
  },
  titleBlock: {
    flex: 1,
    gap: ui.spacing.sm,
    maxWidth: 300,
  },
  iconActions: {
    flexDirection: "row",
    gap: ui.spacing.xs,
    alignItems: "flex-end",
  },
  iconHit: {
    minWidth: ui.tapTarget,
    minHeight: ui.tapTarget,
    alignItems: "center",
    justifyContent: "center",
  },
  heroButton: {
    borderRadius: ui.radii.sm,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: ui.spacing.sm,
    elevation: 5,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: ui.spacing.md,
    paddingHorizontal: ui.spacing.xl,
    paddingVertical: ui.spacing.md,
    minWidth: 140,
    minHeight: ui.tapTarget,
    justifyContent: "center",
  },
  pagination: {
    position: "absolute",
    bottom: ui.spacing.lg,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: ui.spacing.sm,
  },
});
