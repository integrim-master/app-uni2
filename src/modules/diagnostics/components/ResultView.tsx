import Badge from "@/src/components/shared/Badge";
import PrimaryButton from "@/src/components/shared/PrimaryButton";
import { Screen } from "@/src/components/shared/Screen";
import ThemedText from "@/src/components/shared/themed-text";
import { useTheme } from "@/src/context/ThemeContext";
import { normalizeString } from "@/src/utils/stringUtils";
import React, { useMemo } from "react";
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useTreatments } from "../../banner/hooks/userHome";
import { ResultViewProps } from "../types/diagnostics.types";
import DiagnosticCard from "./DiagnosticCard";
import ResultHeader from "./ResultHeader";
import TreatmentCard from "./TreatmentCard";

const { width } = Dimensions.get("window");

export default function ResultView({
  photoUri,
  diagnostic,
  onReset,
  onNewDiagnostic,
  onClose,
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
        <Text style={{ color: colors.textSecondary }}>
          No se recibió información del diagnóstico
        </Text>
        <Pressable
          style={[
            styles.button,
            { backgroundColor: colors.primary, marginTop: 20 },
          ]}
          onPress={onReset}
        >
          <Text style={styles.buttonText}>Realizar nuevo diagnóstico</Text>
        </Pressable>
      </Screen>
    );
  }

  return (
    <Screen>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.container,
            { paddingBottom: insets.bottom + 10 },
          ]}
        >
          <ResultHeader colors={colors} imageUri={imageUri} />

          <View style={styles.resultsSection}>
            <View style={styles.sectionRow}>
              <ThemedText type="subtitle" color={colors.primaryLight}>
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
              <ThemedText
                type="titleSm"
                color={colors.primaryLight}
                style={{
                  marginBottom: 10,
                }}
              >
                Tratamientos Recomendados
              </ThemedText>
              <View className="w-full flex-row flex-wrap justify-between p-2">
                {procChips
                  // .filter((c) => c.link)
                  .map((c) => (
                    <View
                      key={c.key}
                      style={{ width: "48%", marginBottom: 16 }}
                    >
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
  container: { paddingHorizontal: 15, paddingTop: 20 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  resultsSection: { marginBottom: 20 },
  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  counterBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  treatmentsSection: { marginTop: 10 },

  button: { paddingVertical: 18, paddingHorizontal: 24, borderRadius: 18 },
  buttonText: { color: "#fff", fontWeight: "700" },
});
