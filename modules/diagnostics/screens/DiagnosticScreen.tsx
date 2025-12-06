import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
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
    setCurrentStep

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

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setCurrentStep(0);
      }
    }, [])
  );
  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <View
        style={styles.contentContainer}
  
      >
        <View style={styles.stepContent}>{renderStepContent()}</View>
      </View>

  
      {currentStep > 1 &&  (
        <Pressable
          style={[styles.fabNav, { backgroundColor: colors.primary }]}
          onPress={prevStep}
        >
          <MaterialIcons name="arrow-back-ios" size={28} color="#fff" />
        </Pressable>
      )}
      {currentStep < steps.length - 1 && (
        <Pressable
          style={[styles.fabNav, { backgroundColor: colors.primary, right: 24, left: undefined }]}
          onPress={nextStep}
        >
          <MaterialIcons name="arrow-forward-ios" size={28} color="#fff" />
        </Pressable>
      )}
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
  fabNav: {
    position: 'absolute',
    bottom: 32,
    left: 24,
    zIndex: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
});
 