
import { useTheme } from "@/src/context/ThemeContext";
import DiagnosticScreen from "@/src/modules/diagnostics/screens/DiagnosticScreen";
import { CameraType, useCameraPermissions } from "expo-camera";
import { useState } from "react";


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


  return (
    <DiagnosticScreen
      setCurrentStep={setCurrentStep}
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


