import ThemedText from "@/src/components/shared/themed-text";
import { useTheme } from "@/src/context/ThemeContext";
import { MaterialIcons } from "@expo/vector-icons";
import { MotiView } from "moti";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { FavoriteItem } from "../types/favorites.types";

interface FavoriteCardProps {
  item: FavoriteItem;
  onPress?: () => void;
  onToggleFavorite?: () => void;
  isAnimating?: boolean;
}

export const FavoriteCard: React.FC<FavoriteCardProps> = ({ 
  item, 
  onPress, 
  onToggleFavorite,
  isAnimating = false 
}) => {
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.favoriteCard,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <View style={styles.cardContent}>
        <View style={styles.cardLeft}>
          <View
            style={[
              styles.iconCircle,
              {
                backgroundColor:
                  item.category === "beneficios"
                    ? colors.primary + "20"
                    : colors.success + "20",
              },
            ]}
          >
            <MaterialIcons
              name={
                item.category === "beneficios"
                  ? "card-giftcard"
                  : "spa"
              }
              size={24}
              color={
                item.category === "beneficios"
                  ? colors.primary
                  : colors.success
              }
            />
          </View>
          <View style={styles.cardInfo}>
            <ThemedText type="semiBold">{item.title}</ThemedText>
            <ThemedText type="caption" color={colors.textSecondary}>
              {item.description}
            </ThemedText>
          </View>
        </View>
        
        <Pressable onPress={onToggleFavorite}>
          <MotiView
            animate={{
              scale: isAnimating ? [1, 1.3, 1] : 1,
            }}
            transition={{
              type: 'timing',
              duration: 400,
            }}
          >
            <MaterialIcons 
              name={item.isFavorite ? "favorite" : "favorite-border"} 
              size={28} 
              color={item.isFavorite ? colors.danger : colors.textSecondary} 
            />
          </MotiView>
        </Pressable>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  favoriteCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  cardInfo: {
    flex: 1,
    gap: 4,
  },
});
