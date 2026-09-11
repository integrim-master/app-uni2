import ThemedText from "@/src/components/shared/themed-text";
import { useTheme } from "@/src/context/ThemeContext";
import React, { useState } from "react";
import { View } from "react-native";
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
  const { colors } = useTheme();
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue(0);
  const [width, setWidth] = useState(0);
  const canAutoPlay = promotions.length > 1;

  if (isLoading) return <PromotionsCarouselSkeleton />;
  if (!promotions?.length) return null;

  return (
    <View
      className="mt-6"
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
    >
      <View className="mb-3">
        <ThemedText type="subtitle" tone="accent">
          Promociones exclusivas
        </ThemedText>
      </View>

      {width > 0 ? (
        <Carousel
          ref={ref}
          width={width}
          height={CARD_HEIGHT}
          data={promotions}
          loop={canAutoPlay}
          autoPlay={canAutoPlay}
          autoPlayInterval={AUTO_PLAY_MS}
          scrollAnimationDuration={700}
          onProgressChange={progress}
          renderItem={({ item }) => (
            <View className="flex-1">
              <PromotionSlide item={item} />
            </View>
          )}
        />
      ) : null}

      {canAutoPlay ? (
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
            borderRadius: 4,
            width: 16,
            height: 6,
          }}
          containerStyle={{ gap: 8, marginTop: 12 }}
        />
      ) : null}
    </View>
  );
};
