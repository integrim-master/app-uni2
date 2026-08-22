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
import { ui } from "@/src/themes/ui";
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
    <Screen safeArea edges={["bottom"]}>
      <View style={styles.loadingWrap}>
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
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.sections}>
          <View style={styles.hero}>
            <View style={styles.heroTextBlock}>
              <View style={styles.heroTopRow}>
                <ThemedText type="label" tone="muted">
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
              <ThemedText type="title" color={colors.textStrong}>
                {dateDetails?.Procedimiento}
              </ThemedText>
            </View>

            <View
              style={[
                styles.heroDatePill,
                {
                  backgroundColor: colors.primaryLight + "22",
                  borderColor: colors.primaryLight + "55",
                },
              ]}
            >
              <View style={styles.heroDateItem}>
                <Ionicons
                  name="calendar-outline"
                  size={16}
                  color={colors.textAccent}
                />
                <ThemedText type="semiBold" color={colors.textAccent}>
                  {formatDateToText(dateDetails?.fecha_cita)}
                </ThemedText>
              </View>
              <View
                style={[
                  styles.heroDateDivider,
                  { backgroundColor: colors.border },
                ]}
              />
              <View style={styles.heroDateItem}>
                <Ionicons
                  name="time-outline"
                  size={16}
                  color={colors.textAccent}
                />
                <ThemedText type="semiBold" color={colors.textAccent}>
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
            <View style={styles.recoSection}>
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
      <ThemedText type="body" color={colors.textSecondary} style={styles.recoText}>
        {text}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingWrap: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 0,
  },
  sections: {
    gap: ui.spacing.xxl,
  },
  hero: {
    gap: ui.spacing.xl,
  },
  heroTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: ui.spacing.md,
  },
  heroTextBlock: {
    gap: ui.spacing.sm,
  },
  heroDatePill: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: ui.radii.lg,
    borderWidth: ui.borders.width,
    paddingHorizontal: ui.spacing.lg,
    minHeight: ui.tapTarget,
  },
  heroDateItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: ui.spacing.sm,
  },
  heroDateDivider: {
    width: ui.borders.hairline,
    height: ui.spacing.lg,
    marginHorizontal: ui.spacing.md,
  },
  card: {
    padding: ui.spacing.lg,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: ui.spacing.md,
    paddingVertical: ui.spacing.md,
  },
  infoIcon: {
    width: ui.tapTarget,
    height: ui.tapTarget,
    borderRadius: ui.radii.md,
    justifyContent: "center",
    alignItems: "center",
  },
  infoTextWrap: {
    flex: 1,
    gap: ui.spacing.xs,
  },
  capitalize: {
    textTransform: "capitalize",
  },
  rowDivider: {
    height: ui.borders.hairline,
  },
  recoSection: {
    gap: ui.spacing.lg,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: ui.spacing.sm,
  },
  recoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: ui.spacing.md,
    paddingVertical: ui.spacing.md,
  },
  recoDot: {
    width: 22,
    height: 22,
    borderRadius: ui.radii.pill,
    justifyContent: "center",
    alignItems: "center",
    marginTop: ui.spacing.xs,
  },
  recoText: {
    flex: 1,
  },
});
