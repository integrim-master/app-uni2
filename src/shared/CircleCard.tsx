import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import ThemedText from "../components/shared/themed-text";
import { ui } from "../themes/ui";

interface CircleCardProps {
  image: any;
  title?: string;
  onPress?: () => void;
  size?: number;
}

const CIRCLE_SIZE = 96;

const CircleCard: React.FC<CircleCardProps> = ({
  image,
  title,
  onPress,
  size = CIRCLE_SIZE,
}) => {
  return (
    <Pressable
      style={[styles.trendCircleCard, { width: size + ui.spacing.xl }]}
      onPress={onPress}
    >
      <View
        style={[
          styles.trendCircle,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
          },
        ]}
      >
        <Image source={image} style={styles.trendCircleImage} />
        <View style={styles.circleOverlay} />
      </View>
      <ThemedText type="caption" weight="bold" align="center" numberOfLines={2} style={styles.trendCircleTitle}>
        {title}
      </ThemedText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  trendCircleCard: {
    alignItems: "center",
  },
  trendCircle: {
    overflow: "hidden",
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  trendCircleImage: {
    width: "100%",
    height: "100%",
  },
  circleOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  trendCircleTitle: {
    marginTop: ui.spacing.sm,
  },
});

export default CircleCard;
