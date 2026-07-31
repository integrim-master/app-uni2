import ThemedText from "@/src/components/shared/themed-text";
import { AppColors as Colors } from "@/src/themes/colors";
import React from "react";
import { View } from "react-native";
import { CalendarIcon, TimeIcon } from "../../../components/Icons";
import { ItemsHistoryProps } from "../types/home.types";

export function ItemsHistory({
  buttons,
  dark,
  procedimiento,
  fecha,
  hora,
  medico,
  estado,
  ...props
}: ItemsHistoryProps) {
  const estadoTone =
    estado === "Cancelada"
      ? "danger"
      : estado === "Pendiente"
        ? "warning"
        : "success";

  return (
    <View className="bg-white  py-6 rounded-3xl gap-4" {...props}>
      <View
        className="gap-2 px-2 border-l-4 flex flex-col"
        style={{ borderLeftColor: Colors.primary }}
      >
        <ThemedText type="title">{procedimiento}</ThemedText>
        <ThemedText type="subtitle" tone="secondary">
          {medico}
        </ThemedText>
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center gap-3">
            <CalendarIcon size={18} color={Colors.primary} />
            <ThemedText type="body">{fecha}</ThemedText>
          </View>
          <View className="flex-row items-center gap-3">
            <TimeIcon size={18} color={dark} />
            <ThemedText type="body">{hora}</ThemedText>
          </View>
          <View
            className="flex-row rounded-full p-2 items-center"
            style={{
              backgroundColor:
                estado === "Cancelada"
                  ? "#FEE2E2"
                  : estado === "Pendiente"
                    ? "#FEF3C7"
                    : "#D1FAE5",
            }}
          >
            <ThemedText type="semiBold" tone={estadoTone}>
              {estado}
            </ThemedText>
          </View>
        </View>
      </View>
      {buttons === "Activo" ? (
        <View className="flex-row justify-between gap-2">
          <ThemedText
            type="semiBold"
            tone="muted"
            align="center"
            className="bg-gray-200 w-6/12 py-2 rounded-xl"
          >
            Reagendar
          </ThemedText>
          <ThemedText
            type="semiBold"
            tone="danger"
            align="center"
            className="bg-red-200 w-6/12 py-2 rounded-xl"
          >
            Cancelar
          </ThemedText>
        </View>
      ) : null}
    </View>
  );
}
