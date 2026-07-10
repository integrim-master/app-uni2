import { BackButton } from "@/src/components/shared/BackButton";
import Badge from "@/src/components/shared/Badge";
import { Screen } from "@/src/components/shared/Screen";
import ThemedText from "@/src/components/shared/themed-text";
import { useTheme } from "@/src/context/ThemeContext";
import { Image } from "expo-image";
import { MotiView, View } from "moti";
import React from "react";
import { Dimensions, ScrollView } from "react-native";

const { width } = Dimensions.get("window");

const post = {
  title: "Cómo mejorar tu salud mental en 2026",
  content:
    "Cuidar tu mente es tan importante como cuidar tu cuerpo. En un mundo cada vez más acelerado y digital, la salud mental se ha convertido en el pilar fundamental para una vida plena. \n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  image:
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  author: "María López",
  role: "Especialista en Bienestar",
  date: "24 Feb 2026",
  readingTime: "5 min lectura",
};

export default function BlogDetail() {
  const { colors } = useTheme();

  return (
    <Screen safeArea={true} leftButton={<BackButton iconName="chevron-back" />}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: colors.background,
        }}
      >
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 700 }}
        >
          <Image
            source={{ uri: post.image }}
            style={{ width: width, height: 350 }}
            contentFit="cover"
          />

          <View
            className="absolute bottom-0 w-full h-20"
            style={{ backgroundColor: "transparent" }}
          />
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 600, delay: 200 }}
          className="px-6 -mt-8 bg-white"
          style={{
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
            backgroundColor: colors.gradientCard[0],
            paddingTop: 32,
          }}
        >
          <Badge text="Bienestar" style={{ marginBottom: 12 }} />

          <ThemedText
            type="title"
            style={{ fontSize: 28, lineHeight: 34, marginBottom: 20 }}
          >
            {post.title}
          </ThemedText>

          <View
            className="flex-row items-center mb-8 pb-8 border-b"
            style={{ borderColor: colors.border + "50" }}
          >
            <View className="w-10 h-10 rounded-full bg-slate-200 mr-3 overflow-hidden">
              <Image
                source="https://i.pravatar.cc/150?u=maria"
                style={{ width: "100%", height: "100%" }}
              />
            </View>
            <View>
              <ThemedText style={{ fontWeight: "600", fontSize: 14 }}>
                categoria
              </ThemedText>
              <ThemedText style={{ color: colors.textSecondary, fontSize: 12 }}>
                {post.date} • {post.role}
              </ThemedText>
            </View>
          </View>

          <ThemedText
            style={{
              fontSize: 17,
              lineHeight: 28,
              color: colors.text,
              opacity: 0.8,
              marginBottom: 40,
            }}
          >
            {post.content}
          </ThemedText>
        </MotiView>
      </ScrollView>
    </Screen>
  );
}
