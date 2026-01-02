import { Screen } from "@/src/components/shared/Screen";
import { useAuth } from "@/src/context/AuthContext";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useTheme } from "../../../context/ThemeContext";
import StepOne from "../components/StepOne";
import { DiagnosticScreenProps } from "../types/diagnostics.types";

type DiagnosticStatus = "idle" | "sending" | "success" | "results";

type PhotoAsset = {
  uri: string;
  type?: string;
  fileName?: string;
};

export default function DiagnosticScreen(props: DiagnosticScreenProps) {
  const { colors } = useTheme();
  const [photoUri, setPhotoUri] = useState<PhotoAsset | null>(null);
  const [status, setStatus] = useState<DiagnosticStatus>("idle");
  const [diagnosticReport, setDiagnosticReport] = useState<any>(null);

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem("diagnosticReport");
        if (saved) {
          const parsed = JSON.parse(saved);
          setPhotoUri({ uri: parsed.photoUri.uri });
          setDiagnosticReport(parsed);
          setStatus("results");
        }
      } catch (e) {
        console.error("Error loading diagnostic report:", e);
      }
    })();
  }, []);

  const { user, token } = useAuth();

  const userId: any = user?.user_id;
  const { currentStep, steps, setCurrentStep, nextStep } = props;

  useFocusEffect(
    useCallback(() => {
      if (!diagnosticReport) {
        setCurrentStep(0);
      } else {
        router.push('/step')
      }
      return () => {};
    }, [diagnosticReport])
  );

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.stepContent}>
            <StepOne />
          </View>
        </View>
          <Pressable
            style={[
              styles.fabNav,
              { backgroundColor: colors.primary, right: 24 },
            ]}
            onPress={()=>{
              router.push('step')
            }}
          >
            <MaterialIcons name="arrow-forward-ios" size={28} color="#fff" />
          </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  stepContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  fabNav: {
    position: "absolute",
    bottom: 32,
    zIndex: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
});
