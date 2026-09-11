import { Card } from "@/src/components/shared/card";
import ThemedText from "@/src/components/shared/themed-text";
import { useTheme } from "@/src/context/ThemeContext";
import type { Cita } from "@/src/modules/dates/types/date.api.types";
import { ui } from "@/src/themes/ui";
import { parseDateString } from "@/src/utils/dateUtils";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import React from "react";
import { StyleSheet, View } from "react-native";
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
        {
          backgroundColor: colors.primaryLight + "22",
          borderColor: colors.primaryLight + "55",
        },
      ]}
    >
      <ThemedText type="label" color={colors.textAccent}>
        {parsed ? MONTHS_SHORT[parsed.getMonth()] : "—"}
      </ThemedText>
      <ThemedText type="title" color={colors.textStrong}>
        {parsed ? String(parsed.getDate()) : "--"}
      </ThemedText>
    </View>
  );
}

export default function UpcomingAppointments({ dates, isLoading }: Props) {
  const router = useRouter();
  const { colors } = useTheme();

  if (isLoading) return <UpcomingAppointmentsSkeleton />;
  if (!Array.isArray(dates) || dates.length === 0) return null;

  return (
    <View style={styles.section}>
      <MotiView
        from={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 350 }}
      >
        <View style={styles.block}>
          <ThemedText type="subtitle" tone="accent">
            Tus próximas citas
          </ThemedText>

          {dates.slice(0, 1).map((item, index) => (
            <MotiView
              key={String(
                item.id ?? `${item.fecha_cita}-${item.hora_cita}-${index}`,
              )}
              from={{ opacity: 0, translateY: 12 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{
                type: "timing",
                duration: 320,
                delay: index * 80,
              }}
              style={styles.item}
            >
              <Card
                onPress={() => {
                  if (item.id) router.push(`/dates/${item.id}`);
                }}
                borderColor="transparent"
                className="w-full"
                style={styles.card}
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
                      <ThemedText type="caption" tone="secondary">
                        {item.hora_cita}
                      </ThemedText>
                    </View>
                  ) : null}
                </View>
              </Card>
            </MotiView>
          ))}
        </View>
      </MotiView>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: ui.spacing.xl,
  },
  block: {
    gap: ui.spacing.md,
  },
  item: {
    width: "100%",
  },
  card: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    padding: ui.spacing.lg,
    gap: ui.spacing.md,
  },
  stamp: {
    width: 56,
    borderRadius: ui.radii.md,
    borderWidth: ui.borders.width,
    paddingVertical: ui.spacing.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    flex: 1,
    gap: ui.spacing.sm,
  },
  title: {
    textTransform: "capitalize",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: ui.spacing.sm,
  },
});
