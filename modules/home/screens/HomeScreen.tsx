import { Link, Stack } from "expo-router";
import React from "react";
import {
  ImageBackground,
  Pressable,
  Text,
  View
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import Campana from "../../../assets/images/campana.jpg";
import { AccesoDirecto } from "../components/Acess";
import { Beneficios } from "../components/benefits";

import SubtitleText from "@/components/shared/SubtitleText";
import { useWindowDimensions } from "react-native";
import { useTheme } from "../../../context/ThemeContext";

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
  const [activeTab, setActiveTab] = React.useState("first");

  const renderContent = () => {
    switch (activeTab) {
      case "first":
        return (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              flexWrap: "wrap", 
              gap: 10, 
              marginTop: 10,
              padding: 10,
            }}
          >
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
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Contenido de la Segunda Vista</Text>
          </View>
        );
      case "third":
        return (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Contenido de la Tercera Vista</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>


      <HeaderSection fullName={fullName} />

      <View style={{ display: "flex", alignItems: "center", paddingHorizontal: 16, marginTop: 16 }}>
        <SubtitleText style={{ marginBottom: 10, alignSelf: "flex-start", fontWeight: 600, color: colors.text }}>
          ¿Qué deseas hacer hoy?
        </SubtitleText>
        <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
      </View>

      <View style={{ flex: 1 }}>{renderContent()}</View>

      <View style={{ flex: 1, backgroundColor: colors.backgroundLight }}>
        <View className="gap-8 pt-8 p-4">
          <Stack.Screen
            options={{
              headerShown: false,
            }}
          />

          {/* <View className="flex-row gap-5 justify-between">
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
          </View> */}

          {/* <View className="gap-3">
            <View className="justify-between flex-row items-center">
              <Text className="text-black font-medium text-xl">Próximas Citas</Text>
              <Link asChild href={`/(tabs)/citas`}>
                <Pressable>
                  {({ pressed }) => (
                    <Text
                      className={`text-xl font-normal ${
                        pressed ? "opacity-50" : "opacity-100"
                      } text-gray-500`}
                    >
                      Ver todas
                    </Text>
                  )}
                </Pressable>
              </Link>
            </View>
            <View className="bg-white rounded-3xl p-4">
              <HistoryByDates dark={dark} citas={citas} />
            </View>
          </View> */}

          <View className="gap-3">
            <View className="justify-between flex-row items-center">
              <TitleText style={
                { color: colors.text }
              } className="font-medium text-xl">Tus Beneficios</TitleText>
              <Link asChild href={`/(tabs)/beneficios`}>
                <Pressable>
                  {({ pressed }) => (
                    <Text
                      style={{ color: colors.textSecondary, opacity: pressed ? 0.5 : 1 }}
                      className="text-xl font-normal"
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

          <View className="gap-3">
            <View className="justify-between flex-row items-center">
              <Text style={{ color: colors.text }} className="font-medium text-xl">
                Promociones exclusivas
              </Text>
              <Link
                asChild
                href={`https://careme360.com/descubre-nuestras-promociones`}
              >
                <Pressable>
                  {({ pressed }) => (
                    <Text
                      style={{ color: colors.textSecondary, opacity: pressed ? 0.5 : 1 }}
                      className="text-xl font-normal"
                    >
                      Ver todas
                    </Text>
                  )}
                </Pressable>
              </Link>
            </View>
            <View className="flex-1 rounded-3xl">
              <ImageBackground
                style={{ borderRadius: 30 }}
                className="w-full h-42 flex-1 justify-end items-start p-3"
                source={Campana}
                resizeMode="cover"
              >
                <Text className="text-white text-2xl font-bold">Extreme Yosung</Text>
                <Link
                  asChild
                  href={`https://wa.me/+573170366805?text=Hola%2C+quiero+saber+mas+informaci%C3%B3n+sobre+la+promoci%C3%B3n+de+EXTREME+YOUNG%2C+vengo+del+link+https%3A%2F%2Fcareme360.com%2Fpromocion%2Fextreme-young%2F`}
                >
                  <Pressable>
                    {({ pressed }) => (
                      <Text
                        className={`bg-white rounded-full p-3 text-black font-medium ${
                          pressed ? "opacity-50" : "opacity-100"
                        }`}
                      >
                        Solicitar ahora
                      </Text>
                    )}
                  </Pressable>
                </Link>
              </ImageBackground>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};


export default HomeScreen;
