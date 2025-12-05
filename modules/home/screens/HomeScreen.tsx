import { Link, Stack } from "expo-router";
import React from "react";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Campana from "../../../assets/images/campana.jpg";
import { AccesoDirecto } from "../components/Acess";
import { Beneficios } from "../components/benefits";

import SubtitleText from "@/components/shared/SubtitleText";
import { useTheme } from "@/context/ThemeContext";
import { useWindowDimensions } from "react-native";

import TitleText from "@/components/shared/TitleText";
import HeaderSection from "../components/HeaderSection";
import TabBar from "../components/TabBar";
import type { HomeScreenProps } from "../types/home.types";

const HomeScreen: React.FC<HomeScreenProps> = ({
  user,
  fullName,
  dark,
  light,
  colorFondo,
  dataButtons,
  citas,
  benefits,
}) => {
  const layout = useWindowDimensions();
  const { colors } = useTheme();

  const TAB_OPTIONS = [
    { key: "first", label: "Accesos" },
    { key: "second", label: "Citas" },
    { key: "third", label: "Diagnóstico" },
  ];
  const [activeTab, setActiveTab] = React.useState<string>(TAB_OPTIONS[0].key);

  const renderContent = () => {
    switch (activeTab) {
      case "first":
        return (
          <View style={styles.accessContainer}>
            {dataButtons.map((item, index) => (
              <AccesoDirecto
                key={index}
                item={item.item}
                icon={item.icon}
                routPage={item.routPage}
                dark={item.dark}
                light={item.light}
                colorFondo={item.colorFondo}
              />
            ))}
          </View>
        );
      case "second":
        return (
          <View style={styles.emptyContainer}>
            <Text style={{ color: colors.text }}>Aquí irán tus citas</Text>
          </View>
        );
      case "third":
        return (
          <View style={styles.emptyContainer}>
            <Text style={{ color: colors.text }}>Aquí irán tus diagnósticos</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.backgroundSecondary }]}>
      <HeaderSection fullName={fullName} />

      <View style={[styles.tabSection, { paddingHorizontal: 16, marginTop: 16 }]}> 
        <SubtitleText style={[styles.sectionTitle, { color: colors.text }]}> 
          ¿Qué deseas hacer hoy?
        </SubtitleText>
        <TabBar
          options={TAB_OPTIONS}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </View>

      <View style={styles.contentView}>{renderContent()}</View>

      <View style={[styles.benefitsSection, { backgroundColor: colors.backgroundLight }]}>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
        />

        <View style={styles.benefitsContent}>
          <View style={styles.sectionHeader}>
            <TitleText style={[styles.sectionTitleMain, { color: colors.text }]}>
              Tus Beneficios
            </TitleText>
            <Link asChild href={`/(tabs)/beneficios`}>
              <Pressable>
                {({ pressed }) => (
                  <Text
                    style={[
                      styles.seeAllLink,
                      { color: colors.textSecondary, opacity: pressed ? 0.5 : 1 }
                    ]}
                  >
                    Ver todas
                  </Text>
                )}
              </Pressable>
            </Link>
          </View>
          <Beneficios
            dark={dark}
            light={light}
            transparent={colorFondo}
            benefits={benefits}
          />
        </View>

        <View style={styles.promotionSection}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitleMain, { color: colors.text }]}>
              Promociones exclusivas
            </Text>
            <Link
              asChild
              href={`https://careme360.com/descubre-nuestras-promociones`}
            >
              <Pressable>
                {({ pressed }) => (
                  <Text
                    style={[
                      styles.seeAllLink,
                      { color: colors.textSecondary, opacity: pressed ? 0.5 : 1 }
                    ]}
                  >
                    Ver todas
                  </Text>
                )}
              </Pressable>
            </Link>
          </View>
          
          <ImageBackground
            style={styles.promotionBanner}
            source={Campana}
            resizeMode="cover"
          >
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
                        { opacity: pressed ? 0.5 : 1 }
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
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  tabSection: {
    display: "flex",
    alignItems: "center",
  },
  sectionTitle: {
    marginBottom: 10,
    alignSelf: "flex-start",
    fontWeight: "600",
  },
  contentView: {
    flex: 1,
  },
  accessContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 10,
    padding: 10,
    borderRadius: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 16,
  },
  benefitsSection: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderRadius: 16,
  },
  benefitsContent: {
    marginBottom: 24,
  },
  promotionSection: {
    marginBottom: 16,
  },
  sectionHeader: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitleMain: {
    fontWeight: "600",
    fontSize: 18,
  },
  seeAllLink: {
    fontSize: 14,
    fontWeight: "500",
  },
  promotionBanner: {
    borderRadius: 20,
    width: "100%",
    height: 140,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    padding: 16,
    overflow: "hidden",
  },
  promotionOverlay: {
    width: "100%",
  },
  promotionTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },
  promotionButton: {
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: "#000",
    fontWeight: "600",
    fontSize: 14,
    alignSelf: "flex-start",
  },
});

export default HomeScreen;
