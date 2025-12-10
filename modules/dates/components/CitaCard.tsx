import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card } from "../../../components/shared/card";
import { useTheme } from "../../../context/ThemeContext";

export type Cita = {
  id: number;
  procedimiento: string;
  fecha: string;
  hora: string;
  especialista: string;
  estado: string;
};

export default function CitaCard({ cita }: { cita: Cita }) {
  const { colors } = useTheme();

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "Confirmada": return colors.success;
      case "Pendiente": return colors.warning;
      case "Completada": return colors.textLight;
      default: return colors.backgroundDark;
    }
  };

  return (
    <Card style={[styles.citaCard, { borderColor: colors.border, backgroundColor: 'transparent', padding: 0 }] as any}> 
      <View style={styles.citaContent}> 
        <View style={styles.citaHeader}>
          <Text style={[styles.procedimientoText, { color: colors.text }]}>{cita.procedimiento}</Text>
          <View style={[styles.estadoBadge, { backgroundColor: getEstadoColor(cita.estado) }]}> 
            <Text style={styles.estadoText}>{cita.estado}</Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <Text style={[styles.especialistaText, { color: colors.textLight }]}>{cita.especialista}</Text>
          <View style={styles.fechaHoraContainer}>
            <Text style={[styles.fechaText, { color: colors.text }]}>{cita.fecha}</Text>
            <Text style={[styles.horaText, { color: colors.text }]}>{cita.hora}</Text>
          </View>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  citaCard: {
    marginBottom: 16,
    borderRadius: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
  },
  citaContent: {
    padding: 20,
    borderRadius: 16,
    flex: 1,
  },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 6,
    },
  citaHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  procedimientoText: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    letterSpacing: 0.2,
  },
  estadoBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginLeft: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  estadoText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  especialistaText: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 0,
    marginRight: 12,
  },
  fechaHoraContainer: {
    flexDirection: "row",
    alignItems: 'center',
    gap: 10,
  },
  fechaText: {
    fontSize: 14,
    fontWeight: "500",
    marginRight: 8,
  },
  horaText: {
    fontSize: 14,
    fontWeight: "600",
    color: '#B38E2C',
  },
});