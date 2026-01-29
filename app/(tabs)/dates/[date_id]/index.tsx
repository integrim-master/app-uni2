import { MaterialIcons } from "@expo/vector-icons";
// import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";
import { useLocalSearchParams } from "expo-router";
// import { useCallback, useMemo, useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Screen } from "../../../../src/components/shared/Screen";
import ThemedText from "../../../../src/components/shared/themed-text";
import { useTheme } from "../../../../src/context/ThemeContext";

export default function Index() {
  const { colors } = useTheme();
  const { date_id } = useLocalSearchParams();
  // const bottomSheetRef = useRef<BottomSheet>(null);
  // const snapPoints = useMemo(() => ["50%", "70%"], []);

  // const [estadoCita, setEstadoCita] = useState("Confirmada");
  // const [motivoCancelacion, setMotivoCancelacion] = useState("");
  // const [selectedNewStatus, setSelectedNewStatus] = useState<string | null>(null);

  // Datos de ejemplo - reemplazar con tu lógica de obtención de datos
  const cita = {
    id: date_id,
    procedimiento: "Limpieza Dental",
    fecha: "15 de Enero, 2026",
    hora: "10:30 AM",
    especialista: "Dra. María García",
    estado: "Confirmada",
    consultorio: "Consultorio 3B",
    direccion: "Av. Principal 123, Edificio Médico",
    duracion: "45 minutos",
    precio: "$80.00",
    notas: "Por favor llegar 10 minutos antes de la cita.",
  };

  const getEstadoConfig = (estado: string) => {
    switch (estado) {
      case "Confirmada":
        return {
          color: colors.success,
          icon: "check-circle",
          bgColor: colors.success + "20",
        };
      case "Cancelada":
        return {
          color: "#EF4444",
          icon: "cancel",
          bgColor: "#EF444420",
        };
      default:
        return {
          color: colors.primary,
          icon: "help-outline",
          bgColor: colors.primary + "20",
        };
    }
  };

  // const handleOpenBottomSheet = () => {
  //   setSelectedNewStatus(null);
  //   setMotivoCancelacion("");
  //   bottomSheetRef.current?.expand();
  // };

  // const handleChangeStatus = () => {
  //   if (selectedNewStatus === "Cancelada" && !motivoCancelacion.trim()) {
  //     Alert.alert("Error", "Por favor, ingresa el motivo de cancelación");
  //     return;
  //   }

  //   setEstadoCita(selectedNewStatus || estadoCita);
  //   bottomSheetRef.current?.close();
  //   Alert.alert(
  //     "Estado actualizado",
  //     selectedNewStatus === "Cancelada"
  //       ? `Cita cancelada. Motivo: ${motivoCancelacion}`
  //       : "Cita confirmada exitosamente"
  //   );
  // };

  // const renderBackdrop = useCallback(
  //   (props: any) => (
  //     <BottomSheetBackdrop
  //       {...props}
  //       disappearsOnIndex={-1}
  //       appearsOnIndex={0}
  //       opacity={0.5}
  //     />
  //   ),
  //   []
  // );

  const estadoConfig = getEstadoConfig(cita.estado);

  return (
    <Screen safeArea>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View
          style={[
            styles.headerCard,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          <View style={styles.statusBadge}>
            <View
              style={[
                styles.statusDot,
                { backgroundColor: estadoConfig.color },
              ]}
            />
            <ThemedText type="caption" style={{ color: estadoConfig.color }}>
              {cita.estado}
            </ThemedText>
          </View>

          <ThemedText type="title" style={styles.procedimiento}>
            {cita.procedimiento}
          </ThemedText>

          <View style={styles.metaInfo}>
            <View style={styles.metaItem}>
              <MaterialIcons
                name="calendar-today"
                size={14}
                color={colors.textSecondary}
              />
              <ThemedText type="caption" color={colors.textSecondary}>
                {cita.fecha}
              </ThemedText>
            </View>
            <View style={styles.metaItem}>
              <MaterialIcons
                name="access-time"
                size={14}
                color={colors.textSecondary}
              />
              <ThemedText type="caption" color={colors.textSecondary}>
                {cita.hora}
              </ThemedText>
            </View>
          </View>
        </View>

        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          <ThemedText
            type="caption"
            color={colors.textSecondary}
            style={styles.cardLabel}
          >
            Especialista
          </ThemedText>
          <View style={styles.simpleRow}>
            <MaterialIcons name="person" size={18} color={colors.primary} />
            <ThemedText type="semiBold">{cita.especialista}</ThemedText>
          </View>
        </View>

        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          <ThemedText
            type="caption"
            color={colors.textSecondary}
            style={styles.cardLabel}
          >
            Ubicación
          </ThemedText>
          <View style={styles.simpleRow}>
            <MaterialIcons
              name="location-on"
              size={18}
              color={colors.primary}
            />
            <View style={{ flex: 1 }}>
              <ThemedText type="semiBold">{cita.consultorio}</ThemedText>
              <ThemedText
                type="caption"
                color={colors.textSecondary}
                style={{ marginTop: 2 }}
              >
                {cita.direccion}
              </ThemedText>
            </View>
          </View>
        </View>
        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          <ThemedText
            type="caption"
            color={colors.textSecondary}
            style={styles.cardLabel}
          >
            Detalles
          </ThemedText>

          <View style={styles.detailRow}>
            <ThemedText color={colors.textSecondary}>Duración</ThemedText>
            <ThemedText type="semiBold">{cita.duracion}</ThemedText>
          </View>

          <View style={[styles.detailRow, { borderBottomWidth: 0 }]}>
            <ThemedText color={colors.textSecondary}>Precio</ThemedText>
            <ThemedText type="semiBold" style={{ color: colors.primary }}>
              {cita.precio}
            </ThemedText>
          </View>
        </View>

        {cita.notas && (
          <View
            style={[
              styles.card,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}
          >
            <ThemedText
              type="caption"
              color={colors.textSecondary}
              style={styles.cardLabel}
            >
              Notas importantes
            </ThemedText>
            <View style={styles.simpleRow}>
              <MaterialIcons
                name="info-outline"
                size={18}
                color={colors.primary}
              />
              <ThemedText style={{ flex: 1 }}>{cita.notas}</ThemedText>
            </View>
          </View>
        )}

        <View style={{ height: 30 }} />
      </ScrollView>

      {/* Bottom Sheet para cambiar estado
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: colors.card }}
        handleIndicatorStyle={{ backgroundColor: colors.border }}
      >
        <BottomSheetView style={styles.bottomSheetContent}>
          <View style={styles.sheetHeader}>
            <View>
              <ThemedText type="title" style={{ marginBottom: 4 }}>
                Estado de la cita
              </ThemedText>
              <ThemedText type="caption" color={colors.textSecondary}>
                Selecciona una opción para actualizar
              </ThemedText>
            </View>
          </View>

          <View style={styles.optionsContainer}>
            Opción Confirmada
            <Pressable
              onPress={() => setSelectedNewStatus("Confirmada")}
              style={({ pressed }) => [
                styles.statusOptionCard,
                {
                  backgroundColor:
                    selectedNewStatus === "Confirmada"
                      ? colors.success + "15"
                      : colors.background,
                  borderColor:
                    selectedNewStatus === "Confirmada"
                      ? colors.success
                      : colors.border,
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              <View style={styles.optionLeft}>
                <View
                  style={[
                    styles.iconCircle,
                    {
                      backgroundColor:
                        selectedNewStatus === "Confirmada"
                          ? colors.success
                          : colors.border + "50",
                    },
                  ]}
                >
                  <MaterialIcons
                    name="check"
                    size={20}
                    color={
                      selectedNewStatus === "Confirmada" ? "#fff" : colors.textSecondary
                    }
                  />
                </View>
                <View>
                  <ThemedText type="semiBold">
                    Confirmar cita
                  </ThemedText>
                  <ThemedText
                    type="caption"
                    color={colors.textSecondary}
                    style={{ marginTop: 2 }}
                  >
                    La cita se mantiene activa
                  </ThemedText>
                </View>
              </View>
              <MaterialIcons
                name={
                  selectedNewStatus === "Confirmada"
                    ? "radio-button-checked"
                    : "radio-button-unchecked"
                }
                size={22}
                color={
                  selectedNewStatus === "Confirmada"
                    ? colors.success
                    : colors.border
                }
              />
            </Pressable>

      </BottomSheet>
      */}
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  headerCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    marginBottom: 12,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  procedimiento: {
    marginBottom: 12,
  },
  metaInfo: {
    flexDirection: "row",
    gap: 16,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  cardLabel: {
    marginBottom: 10,
  },
  simpleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.05)",
  },
  // Estilos comentados (no usados)
  changeButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  // Estilos del Bottom Sheet - Minimalista (Comentados)
  // bottomSheetContent: {
  //   padding: 24,
  //   paddingBottom: 40,
  // },
  // sheetHeader: {
  //   marginBottom: 24,
  // },
  // optionsContainer: {
  //   gap: 12,
  //   marginBottom: 20,
  // },
  // statusOptionCard: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "space-between",
  //   padding: 16,
  //   borderRadius: 12,
  //   borderWidth: 1.5,
  // },
  // optionLeft: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   gap: 14,
  //   flex: 1,
  // },
  // iconCircle: {
  //   width: 44,
  //   height: 44,
  //   borderRadius: 22,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // motivoContainer: {
  //   marginBottom: 20,
  // },
  // motivoInput: {
  //   borderWidth: 1,
  //   borderRadius: 10,
  //   padding: 14,
  //   fontSize: 15,
  //   minHeight: 90,
  //   fontFamily: "Roboto-Regular",
  // },
  // actionsContainer: {
  //   flexDirection: "row",
  //   gap: 12,
  // },
  // cancelButton: {
  //   flex: 1,
  //   paddingVertical: 14,
  //   borderRadius: 10,
  //   alignItems: "center",
  //   borderWidth: 1,
  // },
  // confirmButton: {
  //   flex: 2,
  //   paddingVertical: 14,
  //   borderRadius: 10,
  //   alignItems: "center",
  // },
});
