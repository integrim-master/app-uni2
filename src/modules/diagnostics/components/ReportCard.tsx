import ThemedText from "@/src/components/shared/themed-text";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { ReportCardProps } from "../types/diagnostics.types";

export default function ReportCard({ report, baseUrl }: ReportCardProps) {
  if (!report) {
    return (
      <View style={styles.container}>
        <ThemedText type="body" tone="secondary" align="center">
          No hay reportes disponibles
        </ThemedText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="titleSm">Reporte de Análisis</ThemedText>
        <ThemedText type="caption" tone="secondary">
          Fecha: {new Date(report.fecha).toLocaleDateString()}
        </ThemedText>
      </View>

      {report.imagen && (
        <Image
          source={{ uri: `${baseUrl}${report.imagen}` }}
          style={styles.image}
        />
      )}

      <View style={styles.resultSection}>
        <ThemedText type="semiBold">Resultado:</ThemedText>
        <ThemedText type="caption">{report.resultado}</ThemedText>
      </View>

      {report.recomendaciones && report.recomendaciones.length > 0 && (
        <View style={styles.recommendationsSection}>
          <ThemedText type="semiBold">Recomendaciones:</ThemedText>
          {report.recomendaciones.map((recomendacion, index) => (
            <View key={index} style={styles.recommendationRow}>
              <ThemedText type="caption">• {recomendacion}</ThemedText>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    gap: 8,
    marginBottom: 12,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
  },
  resultSection: {
    marginBottom: 12,
    gap: 4,
  },
  recommendationsSection: {
    marginTop: 8,
    gap: 4,
  },
  recommendationRow: {
    paddingLeft: 8,
  },
});
