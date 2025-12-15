import { Screen } from "@/components/shared/Screen";
import TabBar from "@/modules/home/components/TabBar";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { AnimatePresence, MotiView } from "moti";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../../context/ThemeContext";
import CitaCard, { Cita } from "../components/CitaCard";
import FiltersBottomSheet from "../components/FiltersBottomSheet";
import HistoryCard from "../components/HistoryCard";

const mockCitas: Cita[] = [
  {
    id: 1,
    procedimiento: "Limpieza Facial Premium",
    fecha: "2024-12-15",
    hora: "10:00",
    especialista: "Dr. García",
    estado: "Confirmada",
  },
  {
    id: 2,
    procedimiento: "Masaje Relajante",
    fecha: "2024-12-20",
    hora: "14:30",
    especialista: "Terapeuta López",
    estado: "Pendiente",
  },
  {
    id: 3,
    procedimiento: "Tratamiento Capilar Luxury",
    fecha: "2024-12-25",
    hora: "16:00",
    especialista: "Especialista Rodríguez",
    estado: "Completada",
  },
  {
    id: 4,
    procedimiento: "Tratamiento Capilar Deluxe",
    fecha: "2024-11-10",
    hora: "09:00",
    especialista: "Especialista Rodríguez",
    estado: "Completada",
  },
  {
    id: 5,
    procedimiento: "Microdermoabrasión",
    fecha: "2024-10-02",
    hora: "12:00",
    especialista: "Dra. Martínez",
    estado: "Completada",
  },
];

export default function DatesScreen() {
  const { colors } = useTheme();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["45%", "75%"], []);

  const [activeTab, setActiveTab] = useState<"upcoming" | "history">(
    "upcoming"
  );
  const [selectedProcedimiento, setSelectedProcedimiento] = useState<
    string | null
  >(null);
  const [selectedEstado, setSelectedEstado] = useState<string | null>(null);

  const procedimientos = [...new Set(mockCitas.map((c) => c.procedimiento))];
  const estados = [...new Set(mockCitas.map((c) => c.estado))];

  const citasUpcoming = mockCitas.filter((c) => c.estado !== "Completada");
  const citasHistory = mockCitas.filter((c) => c.estado === "Completada");

  const filteredCitas = citasUpcoming.filter(
    (c) =>
      (!selectedProcedimiento || c.procedimiento === selectedProcedimiento) &&
      (!selectedEstado || c.estado === selectedEstado)
  );

  const openFilters = () => {
    bottomSheetRef.current?.snapToIndex(0);
  };

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
        pressBehavior="close"
      />
    ),
    []
  );

  return (
    <Screen>
      <View style={styles.container}>
        <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
          <TabBar
            options={[
              { key: "upcoming", label: "Próximas citas" },
              { key: "history", label: "Historial" },
            ]}
            activeTab={activeTab}
            setActiveTab={(tab) => setActiveTab(tab as any)}
          />
        </View>

        <View style={{ flex: 1, position: "relative" }}>
          <AnimatePresence exitBeforeEnter>
            {activeTab === "upcoming" && (
              <MotiView
                key="upcoming"
                from={{ opacity: 0, translateX: 25 }}
                animate={{ opacity: 1, translateX: 0 }}
                exit={{ opacity: 0, translateX: -25 }}
                transition={{ type: "timing", duration: 150 }}
                style={styles.absoluteFill}
              >
                <View style={styles.citasListContainer}>
                  {filteredCitas.map((c) => (
                    <CitaCard key={c.id} cita={c} />
                  ))}
                  <Pressable
                    onPress={openFilters}
                    style={[
                      styles.floatingButton,
                      { backgroundColor: colors.primary },
                    ]}
                  >
                    <Ionicons name="filter" size={24} color="#fff" />
                  </Pressable>
                </View>
              </MotiView>
            )}

            {activeTab === "history" && (
              <MotiView
                key="history"
                from={{ opacity: 0, translateX: 25 }}
                animate={{ opacity: 1, translateX: 0 }}
                exit={{ opacity: 0, translateX: -25 }}
                transition={{ type: "timing", duration: 150 }}
                style={[styles.absoluteFill, { paddingHorizontal: 16 }]}
              >
                <Text style={[styles.historyTitle, { color: colors.text }]}>
                  Historial de citas
                </Text>

                {citasHistory.length === 0 ? (
                  <View style={styles.emptyContainer}>
                    <Ionicons
                      name="time-outline"
                      size={42}
                      color={colors.textLight}
                    />
                    <Text
                      style={[
                        styles.noCitasText,
                        { color: colors.primaryLight },
                      ]}
                    >
                      Aún no hay historial
                    </Text>
                  </View>
                ) : (
                  <FlatList
                    data={citasHistory}
                    keyExtractor={(i) => `hist-${i.id}`}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 64 }}
                    renderItem={({ item }) => <HistoryCard cita={item} />}
                  />
                )}
              </MotiView>
            )}
          </AnimatePresence>
        </View>

        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          enablePanDownToClose
          backdropComponent={renderBackdrop}
          backgroundStyle={{ backgroundColor: colors.card }}
          handleIndicatorStyle={{ backgroundColor: colors.textLight }}
        >
          <BottomSheetView style={{ padding: 20 }}>
            <FiltersBottomSheet
              procedimientos={procedimientos}
              estados={estados}
              selectedProcedimiento={selectedProcedimiento}
              selectedEstado={selectedEstado}
              setSelectedProcedimiento={setSelectedProcedimiento}
              setSelectedEstado={setSelectedEstado}
              colors={colors}
            />
          </BottomSheetView>
        </BottomSheet>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  absoluteFill: {
    position: "absolute",
    inset: 0,
    flex: 1,
    width: "100%",
    marginTop: 10,
  },

  citasListContainer: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "center",
    paddingTop: 10,
  },

  historyTitle: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 8,
  },

  floatingButton: {
    position: "absolute",
    bottom: 30,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  noCitasText: {
    fontSize: 16,
    textAlign: "center",
  },
});
