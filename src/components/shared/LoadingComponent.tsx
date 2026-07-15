import BrandSpinner from "@/src/components/shared/BrandSpinner";
import React from "react";
import { Text, View } from "react-native";

type Props = {
  message?: string;
};

export default function LoadingComponent({
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
      <BrandSpinner />
      <Text style={{ marginTop: 12, color: "#9CA3AF", fontWeight: "600" }}>
        {message}
      </Text>
    </View>
  );
}
