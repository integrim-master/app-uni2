import React from "react";
import { ActivityIndicator, Text, View } from "react-native";

type Props = {
  size?: "small" | "large" | number;
  message?: string;
};

export default function LoadingComponent({
  size = "large",
  message = "Cargando...",
}: Props) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
      }}
    >
      <ActivityIndicator size={size as any} color="#0ea5e9" />
      <Text style={{ marginTop: 12, color: "#6b7280" }}>{message}</Text>
    </View>
  );
}
