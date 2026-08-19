import { Card } from "@/src/components/shared/card";
import ThemedText from "@/src/components/shared/themed-text";
import { useTheme } from "@/src/context/ThemeContext";
import type { Cita } from "@/src/modules/dates/types/date.api.types";
import { parseDateString } from "@/src/utils/dateUtils";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import React from "react";
import { FlatList, StyleSheet, useWindowDimensions, View } from "react-native";
import UpcomingAppointmentsSkeleton from "./UpcomingAppointmentsSkeleton";

const MONTHS_SHORT = [
  "ENE",
  "FEB",
  "MAR",
  "ABR",
  "MAY",
  "JUN",
  "JUL",
  "AGO",
  "SEP",
  "OCT",
  "NOV",
  "DIC",
];

type Props = {
  dates?: Cita[];
  isLoading?: boolean;
};

function DateStamp({ fecha }: { fecha?: string }) {
  const { colors } = useTheme();
  const parsed = parseDateString(fecha);

  return (
    <View
      style={[
        styles.stamp,
        { backgroundColor: colors.primaryLight + "22", borderColor: colors.primaryLight + "55" },
      ]}
    >
      <ThemedText type="caption" color={colors.textAccent} style={styles.stampMonth}>
        {parsed ? MONTHS_SHORT[parsed.getMonth()] : "—"}
      </ThemedText>
      <ThemedText type="title" color={colors.textStrong} style={styles.stampDay}>
        {parsed ? String(parsed.getDate()) : "--"}
      </ThemedText>
    </View>
  );
}

export default function UpcomingAppointments({ dates, isLoading }: Props) {
  const router = useRouter();
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const cardWidth = Math.min(280, width * 0.72);

  if (isLoading) return <UpcomingAppointmentsSkeleton />;
  if (!Array.isArray(dates) || dates.length === 0) return null;

  return (
    <View style={styles.section}>
      <MotiView
        from={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 350 }}
      >
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Tus próximas citas
        </ThemedText>

        <FlatList
          data={dates.slice(0, 2)}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <MotiView
              from={{ opacity: 0, translateY: 12 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: "timing", duration: 320, delay: index * 80 }}
            >
              <Card
                onPress={() => {
                  if (item.id) router.push(`/dates/${item.id}`);
                }}
                borderColor="transparent"
                style={[styles.card, { width: cardWidth }]}
                accessibilityLabel={`Cita de ${item.Procedimiento}`}
              >
                <DateStamp fecha={item.fecha_cita} />

                <View style={styles.body}>
                  <ThemedText
                    type="semiBold"
                    color={colors.textStrong}
                    numberOfLines={2}
                    style={styles.title}
                  >
                    {item.Procedimiento}
                  </ThemedText>

                  {item.hora_cita ? (
                    <View style={styles.metaRow}>
                      <Ionicons
                        name="time-outline"
                        size={14}
                        color={colors.textAccent}
                      />
                      <ThemedText type="caption" color={colors.textSecondary}>
                        {item.hora_cita}
                      </ThemedText>
                    </View>
                  ) : null}
                </View>
              </Card>
            </MotiView>
          )}
          keyExtractor={(item, index) =>
            String(item.id ?? `${item.fecha_cita}-${item.hora_cita}-${index}`)
          }
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </MotiView>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 10,
  },
  sectionTitle: {
    marginTop: 10,
    marginBottom: 16,
    fontWeight: "600",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    gap: 14,
    borderRadius: 18,
  },
  stamp: {
    width: 56,
    borderRadius: 14,
    borderWidth: 1,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  stampMonth: {
    letterSpacing: 1,
    fontSize: 11,
    fontWeight: "700",
  },
  stampDay: {
    fontSize: 22,
    lineHeight: 26,
    fontWeight: "700",
  },
  body: {
    flex: 1,
    gap: 8,
  },
  title: {
    textTransform: "capitalize",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  separator: {
    width: 10,
  },
});
