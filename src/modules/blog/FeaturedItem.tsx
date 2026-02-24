import Badge from "@/src/components/shared/Badge";
import ThemedText from "@/src/components/shared/themed-text";
import { useTheme } from "@/src/context/ThemeContext";
import { Image } from "expo-image";
import React from "react";
import {
    Pressable,
    StyleProp,
    StyleSheet,
    View,
    ViewStyle,
} from "react-native";

type Props = {
  item: any;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export default function FeaturedItem({ item, onPress, style }: Props) {
  const { colors } = useTheme();

  return (
    <Pressable onPress={onPress} style={style as any}>
      <View style={[styles.container, { backgroundColor: colors.card }]}>
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          contentFit="cover"
        />
        <View
          style={[
            styles.overlay,
            { backgroundColor: colors.backgroundDark + "80" },
          ]}
        >
          <Badge
            text={item.category}
            variant="white"
            size="small"
            showIcon={false}
            style={{ marginBottom: 12 }}
          />

          <ThemedText style={[styles.title, { color: colors.text }]}>
            {item.title}
          </ThemedText>
          <ThemedText
            style={[styles.summary, { color: colors.textSecondary }]}
            numberOfLines={2}
          >
            {item.summary}
          </ThemedText>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 400,
    overflow: "hidden",
    borderRadius: 40,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "flex-end",
    padding: 20,
  },
  badgeWrapper: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 34,
  },
  summary: {
    fontSize: 14,
    marginTop: 10,
  },
});
