import { Screen } from "@/src/components/shared/Screen";
import TabBar from "@/src/modules/home/components/TabBar";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { AnimatePresence, MotiView } from "moti";
import React, { useMemo, useRef, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../../context/ThemeContext";
import CitaCard from "../components/CitaCard";

import HistoryCard from "../components/HistoryCard";

interface DatesScreenProps {
  dates?: any[];
  isLoading?: boolean;
}

export default function DatesScreen({ dates, isLoading }: DatesScreenProps) {
  const { colors } = useTheme();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["45%", "75%"], []);

  const [activeTab, setActiveTab] = useState<"upcoming" | "history">(
    "upcoming",
  );
  const [selectedProcedimiento, setSelectedProcedimiento] = useState<
    string | null
  >(null);
  const [selectedEstado, setSelectedEstado] = useState<string | null>(null);

  const openFilters = () => {
    bottomSheetRef.current?.snapToIndex(0);
  };

  // const renderBackdrop = useCallback(
  //   (props: any) => (
  //     <BottomSheetBackdrop
  //       {...props}
  //       disappearsOnIndex={-1}
  //       appearsOnIndex={0}
  //       opacity={0.5}
  //       pressBehavior="close"
  //     />
  //   ),
  //   [],
  // );

  const citas = Array.isArray(dates) ? dates : [];
  const citasUpcoming = citas.filter((c) => c.estado !== "Completada");
  const citasHistory = citas.filter((c) => c.estado === "Completada");

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
          {isLoading ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: colors.text }}>Cargando citas...</Text>
            </View>
          ) : (
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
                  <FlatList
                    data={citasUpcoming}
                   
                    keyExtractor={(item, index) => {
                      const keyBase = `${item?.fecha_cita ?? ""}-${item?.hora_cita ?? ""}-${item?.Procedimiento ?? ""}`;
                      return `cita-${keyBase || index}`;
                    }}
                    renderItem={({ item }) => <CitaCard cita={item} />}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                      paddingHorizontal: 10,
                    }}
                    
                  />
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
          )}
        </View>
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
