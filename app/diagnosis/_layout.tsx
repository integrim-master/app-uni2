import { Stack } from "expo-router";

export default function DiagnosisLayout() {
  return (
    <Stack
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    />
  );
}
