"use client";

import { Screen } from "@/components/shared/Screen";
import { Colors } from "@/themes/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import {
    Dimensions,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useTheme } from "../../../context/ThemeContext";
import type { BenefitApiResponse } from "../types/benefits.types";

type Props = {
  benefit: BenefitApiResponse;
  onRedeem?: (id: string) => void;
  isPending?: boolean;
};

const { width } = Dimensions.get("window");

export default function BenefitScreen({
  benefit,
  onRedeem,
  isPending,
}: Props) {
  const { colors } = useTheme();

  return (
    <Screen style={{ backgroundColor: colors.background }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.heroWrap}>
          <Image
            source={{
              uri:
                benefit?.image ||
                "https://via.placeholder.com/600x400?text=No+Image",
            }}
            style={styles.heroImage}
            contentFit="cover"
            transition={800}
          />

          <LinearGradient
            colors={["rgba(0,0,0,0.15)", "rgba(0,0,0,0.75)"]}
            style={StyleSheet.absoluteFillObject}
          />

          <View style={styles.heroContent}>
            <Text style={styles.heroTitle} numberOfLines={2}>
              {benefit?.title}
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.card,
              shadowColor: colors.shadow || "#000",
            },
          ]}
        >
          <LinearGradient
            colors={[colors.primaryLight, colors.primaryDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.badge}
          >
            <MaterialIcons name="star" size={14} color={colors.cardTextDark} />
            <Text style={styles.badgeText}>BENEFICIO PREMIUM</Text>
          </LinearGradient>

          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Descripción
          </Text>
          <Text
            style={[styles.description, { color: colors.textSecondary }]}
          >
            {benefit?.description}
          </Text>
          <View style={styles.pillsRow}>
            <View
              style={[
                styles.pill,
                { backgroundColor: `${colors.primary}14` },
              ]}
            >
              <MaterialIcons
                name="schedule"
                size={14}
                color={colors.primary}
              />
              <Text style={[styles.pillText, { color: colors.primary }]}>
                Diciembre
              </Text>
            </View>

            <View
              style={[
                styles.pill,
                { backgroundColor: `${colors.success}14` },
              ]}
            >
              <MaterialIcons
                name="check-circle"
                size={14}
                color={colors.success}
              />
              <Text style={[styles.pillText, { color: colors.success }]}>
                Disponible
              </Text>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => onRedeem?.(benefit.id)}
            disabled={isPending}
            style={styles.ctaWrap}
          >
            <LinearGradient
              colors={[colors.primaryLight, colors.primaryDark]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.ctaButton}
            >
              <Text style={styles.ctaText}>
                {isPending ? "Procesando..." : "Redimir beneficio"}
              </Text>
            
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  heroWrap: {
    height: 420,
    position: "relative",
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  heroContent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  heroTitle: {
    fontSize: 34,
    fontWeight: "800",
    color: "#fff",
    lineHeight: 40,
  },
  pricePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.92)",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  priceText: {
    fontSize: 16,
    fontWeight: "800",
  },

  card: {
    marginTop: -40,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.12,
        shadowRadius: 16,
      },
      android: {
        elevation: 6,
      },
    }),
  },

  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    alignSelf: "flex-start",
    marginBottom: 24,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1,
    color: "#fff",
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },

  pillsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 32,
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
  },
  pillText: {
    fontSize: 12,
    fontWeight: "700",
  },

  ctaWrap: {
    marginBottom: 16,
  },
  ctaButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 18,
    borderRadius: 18,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.35,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  ctaText: {
    fontSize: 17,
    fontWeight: "800",
    color: Colors.cardTextDark
  },
});
