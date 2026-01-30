import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import ThemedText from "../components/shared/themed-text";
import { useTheme } from "../context/ThemeContext";

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
  const { colors } = useTheme();

  const styles = (circleSize: number) =>
    StyleSheet.create({
      trendCircleCard: {
        alignItems: "center",
        width: circleSize + 20,
      },
      trendCircle: {
        width: circleSize,
        height: circleSize,
        borderRadius: circleSize / 2,
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
        marginTop: 8,
        fontSize: 12,
        fontWeight: "700",
        textAlign: "center",
      },
    });

  return (
    <Pressable style={styles(size).trendCircleCard} onPress={onPress}>
      <View style={styles(size).trendCircle}>
        <Image source={image} style={styles(size).trendCircleImage} />
        <View style={styles(size).circleOverlay} />
      </View>
      <ThemedText
        numberOfLines={2}
        style={[styles(size).trendCircleTitle, { color: colors.text }]}
      >
        {title}
      </ThemedText>
    </Pressable>
  );
};

export default CircleCard;
