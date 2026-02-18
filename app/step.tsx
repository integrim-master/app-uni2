import { Redirect } from "expo-router";

// Esta ruta fué reemplazada por /diagnosis/camera
export default function StepScreen() {
  return <Redirect href="/diagnosis/camera" />;
}
