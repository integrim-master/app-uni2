import { Card } from "@/src/components/shared/card";
import PrimaryButton from "@/src/components/shared/PrimaryButton";
import { Screen } from "@/src/components/shared/Screen";
import ThemedText from "@/src/components/shared/themed-text";
import { useTheme } from "@/src/context/ThemeContext";
import { TratamientoCareme } from "@/src/types/shared/Benefits.type";
import { normalizeString } from "@/src/utils/stringUtils";
import { MaterialIcons } from "@expo/vector-icons";
import * as secureStore from "expo-secure-store";
import React, { useEffect, useMemo } from "react";
import {
  Image,
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
import { ResultViewProps } from "../types/diagnostics.types";
import TreatmentCard from "./TreatmentCard";

export default function ResultView({
  photoUri,
  diagnostic,
  onReset,
  onNewDiagnostic,
  onClose,
}: ResultViewProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const [treatments, setTreatments] = React.useState<any>(null);

  const tratamientos = async () => {
    let data = await secureStore.getItemAsync("auth_data");
    if (data) {
      const parsed = JSON.parse(data);

      const tratamientosCareme = Array.isArray(parsed.tratamientos_careme)
        ? parsed.tratamientos_careme.flatMap((item: TratamientoCareme) => item)
        : [];
      setTreatments(tratamientosCareme);
    }
  };

  useEffect(() => {
    tratamientos();
  }, []);

  const data = diagnostic;

  const imageUri =
    photoUri?.uri || diagnostic?.photoUri?.uri || diagnostic?.imagen;
  console.log(" extraídos:", imageUri);
  const diagnosticoArray = data?.diagnostico || [];
  const procedimientosString = data?.procedimientos || "";
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

        const treatment = treatments?.find((t: any) => {
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
          image: treatment ? treatment.imagen : undefined,
        };
      }),
    [procedimientosArray, treatments],
  );

  if (
    !data ||
    (!diagnosticoArray.length && !Object.keys(diagnosticoArray).length)
  ) {
    return (
      <Screen style={styles.center}>
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
      <SafeAreaView>
        {/* <Pressable
          style={[
            styles.closeBtn,
            { top: insets.top + 8, backgroundColor: colors.card },
          ]}
          onPress={onClose ?? onReset}
        >
          <MaterialIcons name="close" size={22} color={colors.primary} />
        </Pressable> */}

        <ScrollView
          contentContainerStyle={styles.container}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View
              style={[
                styles.headerIcon,
                { backgroundColor: colors.primary + "20" },
              ]}
            >
              <MaterialIcons
                name="auto-awesome"
                size={32}
                color={colors.primary}
              />
            </View>

            <ThemedText type="title">Diagnóstico Facial</ThemedText>
            <ThemedText type="caption" className="mt-1">
              Análisis clínico asistido por IA
            </ThemedText>
          </View>
          {imageUri && (
            <Card style={styles.imageCard}>
              <Image source={{ uri: imageUri }} style={styles.image} />
              <View style={styles.imageBadge}>
                <MaterialIcons name="check-circle" size={16} color="#22c55e" />
                <ThemedText type="caption" style={styles.imageBadgeText}>
                  Imagen analizada correctamente
                </ThemedText>
              </View>
            </Card>
          )}
          <View style={styles.sectionRow}>
            <ThemedText type="subtitle">Evaluación clínica</ThemedText>
            <View
              style={[
                styles.counterBadge,
                { backgroundColor: colors.primary + "15" },
              ]}
            >
              <ThemedText color={colors.primary} type="caption">
                {Array.isArray(diagnosticoArray)
                  ? diagnosticoArray.length
                  : Object.keys(diagnosticoArray).length}{" "}
                hallazgos
              </ThemedText>
            </View>
          </View>

          {Array.isArray(diagnosticoArray)
            ? diagnosticoArray.map((item: any, index: number) => (
                <Card key={index} style={styles.diagnosticCard}>
                  <View style={styles.cardHeader}>
                    <View
                      style={[
                        styles.iconBox,
                        { backgroundColor: colors.primary + "15" },
                      ]}
                    >
                      <MaterialIcons
                        name="medical-information"
                        size={18}
                        color={colors.primary}
                      />
                    </View>
                    <Text style={[styles.cardTitle, { color: colors.text }]}>
                      {item.nombre_diagnostico}
                    </Text>
                  </View>
                  <Text
                    style={[styles.cardText, { color: colors.textSecondary }]}
                  >
                    {item.descripcion_diagnostico}
                  </Text>
                </Card>
              ))
            : Object.entries(diagnosticoArray).map(
                ([key, value]: [string, any]) => (
                  <Card key={key} style={styles.diagnosticCard}>
                    <View style={styles.cardHeader}>
                      <View
                        style={[
                          styles.iconBox,
                          { backgroundColor: colors.primary + "15" },
                        ]}
                      >
                        <MaterialIcons
                          name="medical-information"
                          size={18}
                          color={colors.primary}
                        />
                      </View>
                      <Text style={[styles.cardTitle, { color: colors.text }]}>
                        {key}
                      </Text>
                    </View>
                    <Text
                      style={[styles.cardText, { color: colors.textSecondary }]}
                    >
                      {String(value)}
                    </Text>
                  </Card>
                ),
              )}

          {procChips.length > 0 && (
            <>
              <View style={styles.sectionRow}>
                <ThemedText type="subtitle">
                  Tratamientos recomendados
                </ThemedText>
              </View>

              <View style={styles.treatmentsGrid}>
                {procChips
                  .filter((c) => c.link !== undefined)
                  .map((c) => (
                    <TreatmentCard
                      key={`card-${c.key}`}
                      title={c.label}
                      image={c.image}
                      link={c.link}
                    />
                  ))}
              </View>
            </>
          )}

          <PrimaryButton
            title="Realizar nuevo diagnóstico"
            onPress={onNewDiagnostic}
          />
        </ScrollView>
      </SafeAreaView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 22,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    left: 16,
    zIndex: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
  },
  closeBtn: {
    position: "absolute",

    right: 16,
    zIndex: 20,
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
  },
  header: {
    alignItems: "center",
  },
  headerIcon: {
    width: 64,
    height: 64,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  imageCard: {
    height: 300,
    borderRadius: 24,
    overflow: "hidden",
    marginBottom: 28,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageBadge: {
    position: "absolute",
    bottom: 14,
    left: 14,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#00000088",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  imageBadgeText: {
    color: "#fff",
    fontSize: 12,
  },
  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },
  counterBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  counterText: {
    fontSize: 12,
    fontWeight: "700",
  },
  diagnosticCard: {
    flexDirection: "column",
    padding: 16,
    borderRadius: 18,
    marginBottom: 14,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    gap: 10,
    marginBottom: 6,
  },
  iconBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
  },
  cardText: {
    fontSize: 14,
    lineHeight: 20,
  },
  chipsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 24,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 22,
    borderWidth: 1,
    gap: 8,
  },
  chipText: {
    fontSize: 14,
  },
  treatmentsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    gap: 1,
    rowGap: 18,
    marginBottom: 32,
    paddingHorizontal: 2,
  },
  button: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 18,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
