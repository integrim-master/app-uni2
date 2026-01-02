import { Card } from "@/src/components/shared/card";
import { Screen } from "@/src/components/shared/Screen";
import { useTheme } from "@/src/context/ThemeContext";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useMemo } from "react";
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

interface DiagnosticResponse {
  diagnostico: Record<string, string>;
  procedimientos: string[];
}

type ResultViewProps = {
  photoUri?: {
    uri: string;
    type?: string;
    fileName?: string;
  };
  diagnostic: DiagnosticResponse[];
  onReset: () => void;
  onClose?: () => void;
};

export default function ResultView({
  photoUri,
  diagnostic,
  onReset,
  onClose,
}: ResultViewProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const data = diagnostic?.[0];

  const procChips = useMemo(
    () => data?.procedimientos.map((p) => ({ key: p, label: p })) ?? [],
    [data]
  );

  if (!data) {
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
    <Screen style={{ flex: 1 }}>
      <SafeAreaView>
        <Pressable
          onPress={() => router.back()}
          style={[
            styles.backButton,
            { top: insets.top + 8, backgroundColor: colors.card },
          ]}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          android_ripple={{ color: "rgba(255,255,255,0.12)" }}
          accessibilityLabel="Volver"
          accessibilityRole="button"
        >
          <Ionicons name="chevron-back" size={24} color={colors.primary} />
        </Pressable>
        <Pressable
          style={[
            styles.closeBtn,
            { top: insets.top + 8, backgroundColor: colors.card },
          ]}
          onPress={onClose ?? onReset}
        >
          <MaterialIcons name="close" size={22} color={colors.primary} />
        </Pressable>

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

            <Text style={[styles.title, { color: colors.text }]}>
              Diagnóstico Facial
            </Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Análisis clínico asistido por IA
            </Text>
          </View>
          {photoUri && (
            <Card style={styles.imageCard}>
              <Image source={{ uri: photoUri as any }} style={styles.image} />
              <View style={styles.imageBadge}>
                <MaterialIcons name="check-circle" size={16} color="#22c55e" />
                <Text style={styles.imageBadgeText}>
                  Imagen analizada correctamente
                </Text>
              </View>
            </Card>
          )}
          <View style={styles.sectionRow}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Evaluación clínica
            </Text>
            <View
              style={[
                styles.counterBadge,
                { backgroundColor: colors.primary + "15" },
              ]}
            >
              <Text style={[styles.counterText, { color: colors.primary }]}>
                {Object.keys(data.diagnostico).length} hallazgos
              </Text>
            </View>
          </View>

          {Object.entries(data.diagnostico).map(([key, value]) => (
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
              <Text style={[styles.cardText, { color: colors.textSecondary }]}>
                {value}
              </Text>
            </Card>
          ))}

          {procChips.length > 0 && (
            <>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Recomendaciones personalizadas
              </Text>

              <View style={styles.chipsWrap}>
                {procChips.map((c) => (
                  <View
                    key={c.key}
                    style={[
                      styles.chip,
                      {
                        backgroundColor: colors.card,
                        borderColor: colors.primary + "30",
                      },
                    ]}
                  >
                    <MaterialIcons
                      name="spa"
                      size={16}
                      color={colors.primary}
                    />
                    <Text
                      style={[styles.chipText, { color: colors.textSecondary }]}
                    >
                      {c.label}
                    </Text>
                  </View>
                ))}
              </View>
            </>
          )}

          <Pressable
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={onReset}
          >
            <Text style={styles.buttonText}>Realizar nuevo diagnóstico</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 22,
    paddingBottom: 48,
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
    marginBottom: 28,
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
