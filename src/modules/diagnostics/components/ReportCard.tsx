import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { ReportCardProps } from '../types/diagnostics.types';

export default function ReportCard({ report, baseUrl }: ReportCardProps) {
  if (!report) {
    return (
      <View style={styles.container}>
        <Text style={styles.noReportText}>
          No hay reportes disponibles
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reporte de Análisis</Text>
      <Text style={styles.date}>
        Fecha: {new Date(report.fecha).toLocaleDateString()}
      </Text>
      
      {report.imagen && (
        <Image 
          source={{ uri: `${baseUrl}${report.imagen}` }}
          style={styles.image}
        />
      )}
      
      <View style={styles.resultSection}>
        <Text style={styles.sectionTitle}>Resultado:</Text>
        <Text style={styles.content}>{report.resultado}</Text>
      </View>
      
      {report.recomendaciones && report.recomendaciones.length > 0 && (
        <View style={styles.recommendationsSection}>
          <Text style={styles.sectionTitle}>Recomendaciones:</Text>
          {report.recomendaciones.map((recomendacion, index) => (
            <Text key={index} style={styles.recommendation}>
              • {recomendacion}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  noReportText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1a1a1a'
  },
  date: {
    fontSize: 14,
    marginBottom: 12,
    color: '#666'
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 12
  },
  resultSection: {
    marginBottom: 12
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#1a1a1a'
  },
  content: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20
  },
  recommendationsSection: {
    marginTop: 8
  },
  recommendation: {
    fontSize: 14,
    marginBottom: 4,
    color: '#333',
    paddingLeft: 8
  }
});