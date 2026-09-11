import Badge from "@/src/components/shared/Badge";
import PrimaryButton from "@/src/components/shared/PrimaryButton";
import { Screen } from "@/src/components/shared/Screen";
import ThemedText from "@/src/components/shared/themed-text";
import { useTheme } from "@/src/context/ThemeContext";
import { useTreatments } from "@/src/modules/user/hooks/useTreatments";
import { ui } from "@/src/themes/ui";
import { normalizeString } from "@/src/utils/stringUtils";
import React, { useMemo } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { ResultViewProps } from "../types/diagnostics.types";
import DiagnosticCard from "./DiagnosticCard";
import ResultHeader from "./ResultHeader";
import TreatmentCard from "./TreatmentCard";

export default function ResultView({
  photoUri,
  diagnostic,
  onReset,
  onNewDiagnostic,
}: ResultViewProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { data: treatmentsData } = useTreatments();

  const imageUri =
    photoUri?.uri || diagnostic?.photoUri?.uri || diagnostic?.imagen;
  const diagnosticoArray = diagnostic?.diagnostico || [];
  const procedimientosString = diagnostic?.procedimientos || "";

  const procedimientosArray =
    typeof procedimientosString === "string"
      ? procedimientosString.split("\n").filter(Boolean)
      : Array.isArray(procedimientosString)
        ? procedimientosString
        : [];

  const procChips = useMemo(
    () =>
      procedimientosArray.map((p: string) => {
        const pNormalized = normalizeString(p);
        const treatment = treatmentsData?.find((t: any) => {
          const titleNormalized = normalizeString(t.title);

          return (
            titleNormalized.includes(pNormalized) ||
            pNormalized.includes(titleNormalized)
          );
        });

        return {
          key: p,
          label: treatment ? treatment.title : p,
          link: treatment ? treatment.link : undefined,
          image: treatment ? treatment.image || treatment.imagen : undefined,
        };
      }),
    [procedimientosArray, treatmentsData],
  );
  if (
    !diagnostic ||
    (!diagnosticoArray.length && !Object.keys(diagnosticoArray).length)
  ) {
    return (
      <Screen>
        <ThemedText type="body" tone="secondary">
          No se recibió información del diagnóstico
        </ThemedText>
        <Pressable
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={onReset}
        >
          <ThemedText type="semiBold" tone="inverse">
            Realizar nuevo diagnóstico
          </ThemedText>
        </Pressable>
      </Screen>
    );
  }

  return (
    <Screen fullWidth>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.container,
            { paddingBottom: insets.bottom + ui.spacing.md },
          ]}
        >
          <ResultHeader colors={colors} imageUri={imageUri} />

          <View style={styles.resultsSection}>
            <View style={styles.sectionRow}>
              <ThemedText type="subtitle" tone="primary">
                Evaluación Clínica
              </ThemedText>

              <Badge
                text={
                  diagnosticoArray.length ||
                  Object.keys(diagnosticoArray).length
                }
                style={styles.counterBadge}
              />
            </View>

            {Array.isArray(diagnosticoArray)
              ? diagnosticoArray.map((item: any, index: number) => (
                  <DiagnosticCard
                    key={index}
                    title={item.nombre_diagnostico}
                    description={item.descripcion_diagnostico}
                    index={index}
                    colors={colors}
                  />
                ))
              : Object.entries(diagnosticoArray).map(
                  ([key, value]: [string, any], index: number) => (
                    <DiagnosticCard
                      key={key}
                      title={key}
                      description={String(value)}
                      index={index}
                      colors={colors}
                    />
                  ),
                )}
          </View>

          {procChips.some((c) => c.link) && (
            <View style={styles.treatmentsSection}>
              <ThemedText type="titleSm" tone="primary" style={styles.sectionTitle}>
                Tratamientos Recomendados
              </ThemedText>
              <View style={styles.chipsWrap}>
                {procChips
                  .map((c) => (
                    <View key={c.key} style={styles.chipCell}>
                      <TreatmentCard
                        title={c.label}
                        image={c.image}
                        link={c.link}
                      />
                    </View>
                  ))}
              </View>
            </View>
          )}

          <View>
            <PrimaryButton title="Nuevo Escaneo" onPress={onNewDiagnostic} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: ui.spacing.lg,
    paddingTop: ui.spacing.xl,
  },
  resultsSection: { marginBottom: ui.spacing.xl },
  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: ui.spacing.xl,
  },
  counterBadge: {
    paddingHorizontal: ui.spacing.md,
    paddingVertical: ui.spacing.xs,
    borderRadius: ui.radii.md,
  },
  treatmentsSection: { marginTop: ui.spacing.md },
  sectionTitle: { marginBottom: ui.spacing.md },
  chipsWrap: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: ui.spacing.sm,
  },
  chipCell: {
    width: "48%",
    marginBottom: ui.spacing.lg,
  },
  button: {
    marginTop: ui.spacing.xl,
    paddingVertical: ui.spacing.lg,
    paddingHorizontal: ui.spacing.xl,
    borderRadius: ui.radii.lg,
    minHeight: ui.tapTarget,
    alignItems: "center",
    justifyContent: "center",
  },
});
