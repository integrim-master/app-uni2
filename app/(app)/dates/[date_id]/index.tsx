import Badge from "@/src/components/shared/Badge";
import { Card } from "@/src/components/shared/card";
import { Screen } from "@/src/components/shared/Screen";
import ThemedText from "@/src/components/shared/themed-text";
import ErrorScreen from "@/src/components/ui/ErrorScreen";
import { useTheme } from "@/src/context/ThemeContext";
import CitaDetailsSkeleton from "@/src/modules/dates/components/CitaDetailsSkeleton";
import { useDatesDetailsSuspense } from "@/src/modules/dates/hooks/useDatesById";
import type { Cita } from "@/src/modules/dates/types/date.api.types";
import { useUser } from "@/src/modules/user/hooks/useUser";
import { formatDateToText } from "@/src/utils/stringUtils";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, type ErrorBoundaryProps } from "expo-router";
import React, { Suspense } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

/** Estándar Expo Router: se exporta, no se usa como wrapper. */
export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  return (
    <ErrorScreen
      message={error.message || "Error al cargar los detalles de la cita"}
      onRetry={retry}
    />
  );
}

function DetailsLoading() {
  return (
    <Screen fullWidth safeArea edges={["bottom"]}>
      <View className="flex-1 gap-10">
        <CitaDetailsSkeleton />
      </View>
    </Screen>
  );
}

export default function CitaDetailsScreen() {
  return (
    <Suspense fallback={<DetailsLoading />}>
      <ApiCitaDetails />
    </Suspense>
  );
}

function ApiCitaDetails() {
  const { date_id } = useLocalSearchParams<{ date_id: string }>();
  const { data: dateDetails } = useDatesDetailsSuspense(String(date_id));

  return <CitaDetailsView dateDetails={dateDetails} />;
}

function CitaDetailsView({ dateDetails }: { dateDetails?: Cita | null }) {
  const { colors } = useTheme();
  const { data: user } = useUser();

  const recomendaciones = (dateDetails &&
    "recomendaciones" in dateDetails &&
    dateDetails.recomendaciones) || [
    "Llega 10 minutos antes de tu cita.",
    "Si no puedes asistir, cancela con al menos dos horas de anticipación.",
  ]; // const recomendaciones = dateDetails?.recomendaciones ?? [];

  return (
    <Screen safeArea edges={["bottom"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 0 }}
      >
        <View className="flex gap-10">
          <View style={styles.hero}>
            {/* <View style={styles.heroTopRow}>
              <View style={styles.heroIcon}>
                <Ionicons name="calendar" color="#FFFFFF" size={26} />
              </View>
              <Badge
                showIcon={false}
                text={dateDetails?.categoria || "General"}
                variant="warning"
                size="small"
                layout="horizontal"
              />
            </View> */}

            <View style={styles.heroTextBlock}>
              <View className="flex flex-row w-full justify-between items-center mb-2">
                <ThemedText type="caption" style={styles.heroLabel}>
                  CITA AGENDADA
                </ThemedText>
                <Badge
                  showIcon={false}
                  text={dateDetails?.categoria || "General"}
                  variant={
                    dateDetails?.categoria === "Estetico" ? "premium" : "info"
                  }
                  size="xs"
                  layout="horizontal"
                />
              </View>
              <ThemedText type="title" style={styles.heroTitle}>
                {dateDetails?.Procedimiento}
              </ThemedText>
            </View>

            <View style={styles.heroDatePill}>
              <View style={styles.heroDateItem} className="">
                <Ionicons name="calendar-outline" size={16} color="#FFFFFF" />
                <ThemedText type="semiBold" style={styles.heroDateText}>
                  {formatDateToText(dateDetails?.fecha_cita)}
                </ThemedText>
              </View>
              <View style={styles.heroDateDivider} />
              <View style={styles.heroDateItem}>
                <Ionicons name="time-outline" size={16} color="#FFFFFF" />
                <ThemedText type="semiBold" style={styles.heroDateText}>
                  {dateDetails?.hora_cita}
                </ThemedText>
              </View>
            </View>
          </View>

          <Card pressable={false} style={styles.card}>
            <InfoRow
              colors={colors}
              icon="medkit-outline"
              label="Profesional"
              value={dateDetails?.profesional}
            />
            <View
              style={[
                styles.rowDivider,
                { backgroundColor: colors.border || "rgba(0,0,0,0.06)" },
              ]}
            />
            <InfoRow
              colors={colors}
              icon="location-outline"
              label="Sede"
              value={dateDetails?.sede}
              capitalize
            />
            <View
              style={[
                styles.rowDivider,
                { backgroundColor: colors.border || "rgba(0,0,0,0.06)" },
              ]}
            />
            <InfoRow
              colors={colors}
              icon="person-outline"
              label="Paciente"
              value={user?.user_name}
            />
          </Card>

          {recomendaciones.length > 0 ? (
            <View className="flex gap-4">
              <View style={styles.sectionHeader}>
                <Ionicons
                  name="bulb-outline"
                  size={18}
                  color={colors.primaryLight}
                />
                <ThemedText type="semiBold" color={colors.primaryLight}>
                  Recomendaciones
                </ThemedText>
              </View>

              <Card pressable={false} style={styles.card}>
                {recomendaciones.map((text, index) => (
                  <React.Fragment key={text}>
                    {index > 0 && (
                      <View
                        style={[
                          styles.rowDivider,
                          {
                            backgroundColor:
                              colors.border || "rgba(0,0,0,0.06)",
                          },
                        ]}
                      />
                    )}
                    <RecoItem colors={colors} text={text} />
                  </React.Fragment>
                ))}
              </Card>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </Screen>
  );
}

function InfoRow({
  colors,
  icon,
  label,
  value,
  capitalize,
}: {
  colors: any;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value?: string;
  capitalize?: boolean;
}) {
  return (
    <View style={styles.infoRow}>
      <View
        style={[
          styles.infoIcon,
          { backgroundColor: colors.primaryLight + "1A" },
        ]}
      >
        <Ionicons name={icon} size={20} color={colors.primaryLight} />
      </View>
      <View style={styles.infoTextWrap}>
        <ThemedText type="caption" color={colors.textSecondary}>
          {label}
        </ThemedText>
        <ThemedText
          type="semiBold"
          color={colors.textAccent}
          style={capitalize ? styles.capitalize : undefined}
        >
          {value || "—"}
        </ThemedText>
      </View>
    </View>
  );
}

function RecoItem({ colors, text }: { colors: any; text: string }) {
  return (
    <View style={styles.recoRow}>
      <View style={[styles.recoDot, { backgroundColor: colors.primaryLight }]}>
        <Ionicons name="checkmark" size={13} color="#FFFFFF" />
      </View>
      <ThemedText
        type="body"
        color={colors.textSecondary}
        style={styles.recoText}
      >
        {text}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    gap: 20,
  },
  heroTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heroIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  heroTextBlock: {
    gap: 4,
  },
  heroLabel: {
    color: "rgba(255,255,255,0.8)",
    letterSpacing: 1.5,
    fontWeight: "600",
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 30,
    letterSpacing: -0.3,
  },
  heroDatePill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 16,

    paddingHorizontal: 16,
  },
  heroDateItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  heroDateDivider: {
    width: StyleSheet.hairlineWidth,
    height: 20,
    backgroundColor: "rgba(255,255,255,0.35)",
    marginHorizontal: 12,
  },
  heroDateText: {
    color: "#FFFFFF",
    fontSize: 14,
  },

  card: {
    padding: 8,
    marginBottom: 8,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  infoIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  infoTextWrap: {
    flex: 1,
    gap: 2,
  },
  capitalize: {
    textTransform: "capitalize",
  },
  rowDivider: {
    height: StyleSheet.hairlineWidth,
    marginHorizontal: 10,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  recoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  recoDot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 1,
  },
  recoText: {
    flex: 1,
    lineHeight: 21,
  },
});
