import { useTheme } from "@/context/ThemeContext";
import { Link } from "expo-router";
import React from "react";
import {
    ImageBackground,
    Pressable,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, { ICarouselInstance, Pagination } from "react-native-reanimated-carousel";
import Campana from "../../../assets/images/campana.jpg";

export const PromotionsCarousel: React.FC = () => {
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

  return (
    <View style={styles.promotionSection}>
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitleMain, { color: colors.text }]}>
          Promociones exclusivas
        </Text>

        <Link asChild href={`https://careme360.com/descubre-nuestras-promociones`}>
          <Pressable>
            {({ pressed }) => (
              <Text
                style={[
                  styles.seeAllLink,
                  {
                    color: colors.textSecondary,
                    opacity: pressed ? 0.5 : 1,
                  },
                ]}
              >
                Ver todas
              </Text>
            )}
          </Pressable>
        </Link>
      </View>

      <Carousel
        ref={ref}
        width={CARD_WIDTH}
        height={CARD_HEIGHT + 20}
        loop
        autoPlay
        autoPlayInterval={4000}
        scrollAnimationDuration={900}
        data={[...Array(5).keys()]}
        onProgressChange={progress}
        mode="parallax"            
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        style={{ alignSelf: "center" }}
        renderItem={({ index }) => (
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
              source={Campana}
              resizeMode="cover"
            >
              <View
                style={[
                  styles.overlayContrast,
                  { backgroundColor: colors.blue, opacity: 0.25 },
                ]}
              />

              <View style={styles.promotionOverlay}>
                <Text style={styles.promotionTitle}>Extreme Young</Text>

                <Link
                  asChild
                  href={`https://wa.me/+573170366805?text=Hola%2C+quiero+saber+mas+informaci%C3%B3n+sobre+la+promoci%C3%B3n+de+EXTREME+YOUNG%2C+vengo+del+link+https%3A%2F%2Fcareme360.com%2Fpromocion%2Fextreme-young%2F`}
                >
                  <Pressable>
                    {({ pressed }) => (
                      <Text
                        style={[
                          styles.promotionButton,
                          {
                            opacity: pressed ? 0.6 : 1,
                            backgroundColor: colors.primaryLight,
                          },
                        ]}
                      >
                        Solicitar ahora
                      </Text>
                    )}
                  </Pressable>
                </Link>
              </View>
            </ImageBackground>
          </View>
        )}
      />

      <Pagination.Basic
        progress={progress}
        data={[...Array(5).keys()]}
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
  sectionTitleMain: {
    fontWeight: "600",
    fontSize: 18,
  },
  seeAllLink: {
    fontSize: 14,
    fontWeight: "500",
  },

  slideContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,  
  },

  promotionBanner: {
    borderRadius: 18,
    borderWidth: 1,
    overflow: "hidden",
    padding: 14,
    justifyContent: "flex-end",
  },

  overlayContrast: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 18,
    zIndex: 1,
  },

  promotionOverlay: {
    zIndex: 2,
  },

  promotionTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
  },

  promotionButton: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 20,
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
});
