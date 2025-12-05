import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useTheme } from "../../../context/ThemeContext";
import StepOne from "../components/StepOne";
import StepTwo from "../components/StepTwo";
import { DiagnosticScreenProps } from "../types/diagnostics.types";

export default function DiagnosticScreen(props: DiagnosticScreenProps) {
  const { colors } = useTheme();
  const {
    currentStep,
    steps,
    nextStep,
    prevStep,
    permission,
    requestPermission,
    facing,
    setFacing,
  } = props;

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <StepOne />;
      case 1:
        return (
          <StepTwo
          
          />
        );
      default:
        return <StepOne />;
    }
  };


  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <View
        style={styles.contentContainer}
  
      >
        <View style={styles.stepContent}>{renderStepContent()}</View>
      </View>

      <View style={styles.navigationContainer}>
        {currentStep > 0 && (
          <Pressable
            style={[styles.navButton, { backgroundColor: colors.primary }]}
            onPress={prevStep}
          >
            <MaterialIcons name="arrow-back-ios" size={22} color="#fff" />
          </Pressable>
        )}

        {currentStep < steps.length - 1 ? (
          <Pressable
            style={[
              styles.navButton,
              { backgroundColor: colors.primary, marginLeft: 10 },
            ]}
            onPress={nextStep}
          >
            <MaterialIcons name="arrow-forward-ios" size={22} color="#fff" />
          </Pressable>
        ) : (
          <Pressable
            style={[
              styles.navButton,
              { backgroundColor: colors.primary, marginLeft: 10 },
            ]}
            onPress={() => console.log("Diagnóstico completado")}
          >
            <MaterialIcons name="check-circle" size={24} color="#fff" />
          </Pressable>
        )}
      </View>
    </View>
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
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  navButton: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 99,
    minWidth: 50,
    alignItems: "center",
  },
});
 