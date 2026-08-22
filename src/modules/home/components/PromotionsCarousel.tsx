import ThemedText from "@/src/components/shared/themed-text";
import { useTheme } from "@/src/context/ThemeContext";
import { ui } from "@/src/themes/ui";
import React from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import type { Promotion } from "../types/home.promotions.types";
import { PromotionSlide } from "./PromotionSlide";
import PromotionsCarouselSkeleton from "./PromotionsCarouselSkeleton";

const CARD_HEIGHT = 160;
const AUTO_PLAY_MS = 4000;

export const PromotionsCarousel = ({
  isLoading = false,
  promotions,
}: {
  promotions: Promotion[];
  isLoading?: boolean;
}) => {
  const { width: screenWidth } = useWindowDimensions();
  const { colors } = useTheme();
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue(0);

  const itemWidth = Math.min(screenWidth * 0.82, 340);
  const canAutoPlay = promotions.length > 1;

  if (isLoading) {
    return <PromotionsCarouselSkeleton />;
  }

  if (!promotions?.length) {
    return null;
  }

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <ThemedText type="subtitle" tone="accent">
          Promociones exclusivas
        </ThemedText>
      </View>

      <Carousel
        ref={ref}
        width={itemWidth}
        height={CARD_HEIGHT}
        loop={canAutoPlay}
        autoPlay={canAutoPlay}
        autoPlayInterval={AUTO_PLAY_MS}
        scrollAnimationDuration={700}
        data={promotions}
        onProgressChange={progress}
        style={{ width: screenWidth }}
        pagingEnabled
        snapEnabled
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.92,
          parallaxScrollingOffset: 28,
        }}
        renderItem={({ item }) => (
          <View style={styles.slideWrap}>
            <PromotionSlide
              item={item}
              width={itemWidth - 12}
              height={CARD_HEIGHT}
            />
          </View>
        )}
      />

      {canAutoPlay && (
        <Pagination.Basic
          progress={progress}
          data={promotions}
          onPress={(index) =>
            ref.current?.scrollTo({
              count: index - progress.value,
              animated: true,
            })
          }
          dotStyle={{
            backgroundColor: colors.borderLight,
            borderRadius: 4,
            width: 6,
            height: 6,
          }}
          activeDotStyle={{
            backgroundColor: colors.primary,
            width: ui.spacing.lg,
            height: 6,
            borderRadius: 4,
          }}
          containerStyle={styles.dots}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginTop: ui.spacing.xl,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: ui.spacing.md,
  },
  slideWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  dots: {
    gap: ui.spacing.sm,
    marginTop: ui.spacing.md,
  },
});
