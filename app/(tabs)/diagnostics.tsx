import DiagnosticScreen from "@/modules/diagnostics/screens/DiagnosticScreen";
import { CameraType, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../context/ThemeContext";

export default function Diagnostic() {
  const { colors } = useTheme();
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const steps = ["Paso 1", "Paso 2"];

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <Text style={[styles.message, { color: colors.text }]}>
          Necesitamos tu permiso para mostrar la cámara
        </Text>
        <Pressable
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={requestPermission}
        >
          <Text style={styles.text}>Conceder Permiso</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <DiagnosticScreen
      currentStep={currentStep}
      steps={steps}
      nextStep={nextStep}
      prevStep={prevStep}
      permission={permission}
      requestPermission={requestPermission}
      facing={facing}
      setFacing={setFacing}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 20,
    fontSize: 16,
    paddingHorizontal: 20,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});
