import { Screen } from "@/src/components/shared/Screen";
import ThemedText from "@/src/components/shared/themed-text";
import LottieView from "lottie-react-native";
import { AnimatePresence, MotiView } from "moti";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Easing } from "react-native-reanimated";
import { useTheme } from "../../../context/ThemeContext";

type SendPhotoProps = {
  onComplete?: () => void;
};

const SendPhoto = ({ onComplete }: SendPhotoProps) => {
  const { colors } = useTheme();
  const [index, setIndex] = useState(0);

  const messages = [
    "Enviando foto...",
    "Analizando rostro...",
    "Procesando datos...",
    "Generando diagnóstico...",
    
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev < messages.length - 1 ? prev + 1 : prev));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Screen>
      <MotiView
        key="loading-content"
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={styles.content}
      >
        <View
          style={[
            styles.placeholderAnim,
            { backgroundColor: colors.primary + "10" },
          ]}
        >
          <LottieView
            source={require("@/assets/animations/uploading.json")}
            autoPlay
            loop
            style={{ width: 140, height: 140 }}
          />
        </View>

        <View className="w-full justify-start items-start">
          <View style={styles.messageWrapper}>
            <AnimatePresence exitBeforeEnter>
              <MotiView
                key={index}
                from={{ opacity: 0, translateY: 15 }}
                animate={{ opacity: 1, translateY: 0 }}
                exit={{ opacity: 0, translateY: -15 }}
                transition={{ type: "timing", duration: 500 }}
              >
                <ThemedText
                  type="subtitle"
                  style={{ textAlign: "center", fontSize: 20 }}
                >
                  {messages[index]}
                </ThemedText>
              </MotiView>
            </AnimatePresence>
          </View>

          <View
            style={[
              styles.progressContainer,
              { backgroundColor: colors.border },
            ]}
          >
            <MotiView
              from={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                type: "timing",
                duration: 8000,
                easing: Easing.linear,
              }}
              style={[styles.progressBar, { backgroundColor: colors.primary }]}
            />
          </View>
        </View>
      </MotiView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    padding: 40,
  },
  placeholderAnim: {
    width: 180,
    height: 180,
    borderRadius: 90,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  messageWrapper: {
    height: 40,
    justifyContent: "center",
    marginBottom: 20,
  },
  progressContainer: {
    height: 6,
    width: "100%",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
  },
});

export default SendPhoto;
