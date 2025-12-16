import { Screen } from "@/components/shared/Screen";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useTheme } from "../../../context/ThemeContext";
import StepOne from "../components/StepOne";
import StepTwo from "../components/StepTwo";
import { DiagnosticScreenProps } from "../types/diagnostics.types";

export default function DiagnosticScreen(props: DiagnosticScreenProps) {
  const { colors } = useTheme();
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const { currentStep, steps, nextStep, prevStep } = props;

  useFocusEffect(
    React.useCallback(() => {

      return () => {
        
      };
    }, [])
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <StepOne />;
      case 1:
        return <StepTwo photoUri={photoUri} setPhotoUri={setPhotoUri} />;
      default:
        return <StepOne />;
    }
  };

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.stepContent}>
            {renderStepContent()}
          </View>
        </View>

       

        {currentStep < steps.length - 1 && (
          <Pressable
            style={[
              styles.fabNav,
              { backgroundColor: colors.primary, right: 24, left: undefined },
            ]}
            onPress={nextStep}
          >
            <MaterialIcons name="arrow-forward-ios" size={28} color="#fff" />
          </Pressable>
        )}
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
    left: 24,
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
