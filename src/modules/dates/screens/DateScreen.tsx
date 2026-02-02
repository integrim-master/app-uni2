import { Screen } from "@/src/components/shared/Screen";
import TabBar from "@/src/modules/home/components/TabBar";
import { parseDateString } from "@/src/utils/dateUtils";
import { router } from "expo-router";
import { AnimatePresence, MotiView } from "moti";
import React, { useMemo, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../../context/ThemeContext";
import CitaCard from "../components/CitaCard";
import CitaCardSkeleton from "../components/CitaCardSkeleton";
import EmptyDates from "../components/EmptyDates";
import HistoryScreen from "./HistoryScreen";

interface DatesScreenProps {
  dates?: any[];
  isLoading?: boolean;
  isError?: boolean;
  error?: any;
  onRefresh?: () => void;
  refreshing?: boolean;
}

export default function DatesScreen({
  dates = [],
  isLoading,
  isError,
  error,
  onRefresh,
  refreshing,
}: DatesScreenProps) {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState<"upcoming" | "history">(
    "upcoming",
  );

  const { upcoming, history } = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const result = {
      upcoming: [] as any[],
      history: [] as any[],
    };

    for (const cita of dates) {
      const parsedDate = parseDateString(cita?.fecha_cita);
      if (!parsedDate) continue;

      const onlyDate = new Date(
        parsedDate.getFullYear(),
        parsedDate.getMonth(),
        parsedDate.getDate(),
      );

      const target = onlyDate <= today ? result.history : result.upcoming;
      target.push({ ...cita, _parsedDate: parsedDate });
    }

    return result;
  }, [dates]);

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.tabContainer}>
          <TabBar
            options={[
              { key: "upcoming", label: "Citas" },
              { key: "history", label: "Historial" },
            ]}
            activeTab={activeTab}
            setActiveTab={(tab) => setActiveTab(tab as any)}
          />
        </View>

        <View style={styles.content}>
          {isLoading && <CitaCardSkeleton />}

          {!isLoading && isError && (
            <View style={styles.center}>
              <Text style={{ color: colors.text, marginBottom: 8 }}>
                Error cargando citas
              </Text>
              <Text style={{ color: colors.textLight }}>
                {String(error?.message ?? error ?? "")}
              </Text>
            </View>
          )}

          {!isLoading && !isError && (
            <AnimatePresence exitBeforeEnter>
              {activeTab === "upcoming" && (
                <AnimatedView key="upcoming">
                  {upcoming.length === 0 ? (
                    <EmptyDates
                      title="No hay próximas citas"
                      subtitle="Programa tu primera cita"
                    />
                  ) : (
                    <FlatList
                      data={upcoming}
                      keyExtractor={(item, index) => `cita-${item.id ?? index}`}
                      renderItem={({ item }) => (
                        <CitaCard
                          cita={item}
                          onPress={() => router.push(`/dates/${item.id}`)}
                        />
                      )}
                      showsVerticalScrollIndicator={false}
                      contentContainerStyle={{ paddingHorizontal: 10 }}
                      refreshControl={
                        <RefreshControl
                          refreshing={!!refreshing}
                          onRefresh={onRefresh}
                          tintColor={colors.primary}
                        />
                      }
                    />
                  )}
                </AnimatedView>
              )}

              {activeTab === "history" && (
                <AnimatedView key="history" padding>
                  <HistoryScreen
                    dates={history}
                    onRefresh={onRefresh}
                    refreshing={refreshing}
                  />
                </AnimatedView>
              )}
            </AnimatePresence>
          )}
        </View>
      </View>
    </Screen>
  );
}

function AnimatedView({
  children,
  padding,
}: {
  children: React.ReactNode;
  padding?: boolean;
}) {
  return (
    <MotiView
      from={{ opacity: 0, translateX: 25 }}
      animate={{ opacity: 1, translateX: 0 }}
      exit={{ opacity: 0, translateX: -25 }}
      transition={{ type: "timing", duration: 150 }}
      style={[styles.absoluteFill, padding && { paddingHorizontal: 16 }]}
    >
      {children}
    </MotiView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  tabContainer: { paddingHorizontal: 20, paddingTop: 10 },
  content: { flex: 1, position: "relative" },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  absoluteFill: {
    position: "absolute",
    inset: 0,
    marginTop: 10,
  },
});
