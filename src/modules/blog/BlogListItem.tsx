import ThemedText from "@/src/components/shared/themed-text";
import { useTheme } from "@/src/context/ThemeContext";
import { Image } from "expo-image";
import React from "react";
import { Pressable, View } from "react-native";

type Props = {
  item: any;
  onPress?: () => void;
};

export default function BlogListItem({ item, onPress }: Props) {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={{ marginBottom: 16, paddingHorizontal: 8 }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={{ uri: item.image }}
          style={{ width: 90, height: 90, borderRadius: 24 }}
          contentFit="cover"
        />
        <View style={{ flex: 1, marginLeft: 16 }}>
          <ThemedText
            style={{
              color: colors.secondary,
              fontSize: 11,
              fontWeight: "700",
              marginBottom: 4,
            }}
          >
            {item.category.toUpperCase()}
          </ThemedText>
          <ThemedText
            style={{ fontSize: 17, fontWeight: "600", marginBottom: 4 }}
            numberOfLines={2}
          >
            {item.title}
          </ThemedText>
          <ThemedText style={{ color: colors.textSecondary, fontSize: 12 }}>
            {item.date} • 5 min lectura
          </ThemedText>
        </View>
      </View>
    </Pressable>
  );
}
