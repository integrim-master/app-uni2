import { Screen } from "@/src/components/shared/Screen";
import ThemedText from "@/src/components/shared/themed-text";
import { useTheme } from "@/src/context/ThemeContext";
import { userUser } from "@/src/modules/banner/hooks/userHome";
import { useBenefit } from "@/src/modules/benefits/hooks/useBenefits";
import { useRedemed } from "@/src/modules/benefits/hooks/useRedem";
import BenefitScreen from "@/src/modules/benefits/screens/BenefitsDetailsScreen";
import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

export default function Index() {
  const { id_benefits } = useLocalSearchParams<{ id_benefits: string }>();
  const { colors } = useTheme();
  const { data: benefit, isLoading, isError, error } = useBenefit(id_benefits);
  const { data: user } = userUser();
  const { mutate, isPending, isSuccess } = useRedemed();
  const [sucessRedeem, setSuccessRedeem] = useState(false);

  const sendRedeem = (idProd: string, title_prod: string) => {
    const payload = {
      telefono: user?.user_phone || "0000000000",
      nombre: user?.user_name || "Nombre Usuario",
      procedimiento: title_prod,
      identificacion: user?.user_identificacion || "00000000",
      sede: user?.user_sede || "Sede Principal",
      user_id: String(user?.user_id || ""),
      procedimiento_id: idProd,
    };
    try {
      mutate(payload, {
        onSuccess: (data) => {
          // if (data.success) {
          //   setSuccessRedeem(true);
          // }
        },
        onError: (error) => {
          console.error("Error redeeming benefit:", error);
        },
      });
    } catch (error) {
      console.error("Error llamando a mutate:", error);
    }
  };

  return (
    <Screen>
      <Stack.Screen
        options={{
          title: benefit?.title ?? "Beneficio",
          headerShadowVisible: false,
          headerBackVisible: true,
        }}
      />

      {isError ? (
        <View className="flex-1 justify-center items-center px-6">
          <ThemedText type="title" className="mb-4 text-center">
            Error al cargar el beneficio
          </ThemedText>
          <ThemedText color={colors.danger}>
            {error?.message || "Ha ocurrido un error inesperado"}
          </ThemedText>
        </View>
      ) : (
        <BenefitScreen
          onRedeem={sendRedeem}
          benefit={benefit as any}
          isPending={isLoading}
          isLoadingRedeem={isPending}
          sucessRedeem={sucessRedeem}
        />
      )}
    </Screen>
  );
}
