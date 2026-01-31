import PrimaryButton from "@/src/components/shared/PrimaryButton";
import ThemedText from "@/src/components/shared/themed-text";
import { Link } from "expo-router";
import React from "react";
import {
    ImageBackground,
    StyleSheet,
    useWindowDimensions,
    View,
} from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
    ICarouselInstance,
    Pagination,
} from "react-native-reanimated-carousel";
import Campana from "../../../../assets/images/campana.jpg";
import { useTheme } from "../../../context/ThemeContext";
import { ui } from "../../../themes/ui";
import { Promotion } from "../types/home.promotions.types";
import PromotionsCarouselSkeleton from "./PromotionsCarouselSkeleton";

export const PromotionsCarousel = ({
  isLoading = false,
  promotions,
}: {
  promotions: Promotion[];
  isLoading?: boolean;
}) => {
  const layout = useWindowDimensions();
  const { colors } = useTheme();
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  const CARD_WIDTH = layout.width * 0.88;
  const CARD_HEIGHT = 150;

  if (isLoading) {
    return <PromotionsCarouselSkeleton />;
  }

  return (
    <View style={styles.promotionSection}>
      <View style={styles.sectionHeader}>
        <ThemedText
          type="subtitle"
          color={colors.textDark}
          className="font-bold"
        >
          Promociones exclusivas
        </ThemedText>
      </View>

      <Carousel
        ref={ref}
        width={CARD_WIDTH}
        height={CARD_HEIGHT + 20}
        loop
        autoPlay
        autoPlayInterval={4000}
        scrollAnimationDuration={900}
        data={promotions}
        onProgressChange={progress}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        style={{ alignSelf: "center" }}
        renderItem={({ item }) => (
          <View style={styles.slideContainer}>
            <ImageBackground
              style={[
                styles.promotionBanner,
                {
                  width: CARD_WIDTH - 12,
                  height: CARD_HEIGHT,
                  borderColor: colors.borderLight,
                },
              ]}
              source={item.image ? { uri: item.image } : Campana}
              resizeMode="cover"
            >
              <View
                style={[
                  styles.overlayContrast,
                  { backgroundColor: colors.backgroundDark, opacity: 0.45 },
                ]}
              />

              <View style={styles.promotionOverlay}>
                <ThemedText
                  className="mb-2"
                  type="subtitle"
                  style={styles.promotionTitle}
                >
                  {item.title}
                </ThemedText>

                <Link
                  asChild
                  href={
                    item.link_promotion.startsWith("http")
                      ? item.link_promotion
                      : `https://${item.link_promotion}`
                  }
                >
                  <PrimaryButton
                    title="Ver promoción"
                    textStyle={styles.promotionButton}
                    onPress={() => {}}
                  />
                </Link>
                <ThemedText type="caption" className="mt-2">
                  {item.fecha_fin ? `Válido hasta: ${item.fecha_fin}` : ""}
                </ThemedText>
              </View>
            </ImageBackground>
          </View>
        )}
      />

      <Pagination.Basic
        progress={progress}
        data={promotions}
        dotStyle={{
          backgroundColor: colors.secondary,
          borderRadius: 5,
          width: 8,
          height: 8,
        }}
        containerStyle={{
          gap: 6,
          paddingTop: 10,
        }}
        onPress={onPressPagination}
        activeDotStyle={{
          backgroundColor: colors.primaryDark,
          width: 18,
          height: 8,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  promotionSection: {
    marginBottom: 16,
    marginTop: 10,
  },
  sectionHeader: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    paddingHorizontal: 6,
  },
  sectionTitleMain: {},
  seeAllLink: {},

  slideContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
  },

  promotionBanner: {
    borderRadius: ui.radii.lg,
    borderWidth: 1,
    overflow: "hidden",
    padding: 14,
    justifyContent: "flex-end",
  },

  overlayContrast: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: ui.radii.lg,
    zIndex: 1,
  },

  promotionOverlay: {
    zIndex: 2,
    display: "flex",
    justifyContent: "center",
    paddingBottom: 10,
    alignItems: "flex-start",
  },

  promotionTitle: {
    fontWeight: "700",
  },

  promotionButton: {
    fontWeight: "800",
  },
});
