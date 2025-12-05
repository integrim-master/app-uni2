import React, { useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../../context/ThemeContext";


const mockCitas = [
  {
    id: 1,
    procedimiento: "Limpieza Facial",
    fecha: "2024-12-15",
    hora: "10:00",
    especialista: "Dr. García",
    estado: "Confirmada"
  },
  {
    id: 2,
    procedimiento: "Masaje Relajante",
    fecha: "2024-12-20",
    hora: "14:30",
    especialista: "Terapeuta López",
    estado: "Pendiente"
  },
  {
    id: 3,
    procedimiento: "Tratamiento Capilar",
    fecha: "2024-12-25",
    hora: "16:00",
    especialista: "Especialista Rodríguez",
    estado: "Completada"
  }
];

export default function DatesScreen() {
  const [selectedProcedimiento, setSelectedProcedimiento] = useState<string | null>(null);
  const [selectedEstado, setSelectedEstado] = useState<string | null>(null);
  const { colors } = useTheme();

  const procedimientos = [...new Set(mockCitas.map(cita => cita.procedimiento))];
  const estados = [...new Set(mockCitas.map(cita => cita.estado))];

  const filteredCitas = useMemo(() => {
    return mockCitas.filter((cita) => {
      return (
        (!selectedProcedimiento || cita.procedimiento === selectedProcedimiento) &&
        (!selectedEstado || cita.estado === selectedEstado)
      );
    });
  }, [selectedProcedimiento, selectedEstado]);

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "Confirmada": return colors.success;
      case "Pendiente": return colors.warning;
      case "Completada": return colors.textLight;
      default: return colors.backgroundDark;
    }
  };

  const renderCitaItem = ({ item }: any) => (
    <View style={[styles.citaCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={styles.citaHeader}>
        <Text style={[styles.procedimientoText, { color: colors.text }]}>{item.procedimiento}</Text>
        <View style={[styles.estadoBadge, { backgroundColor: getEstadoColor(item.estado) }]}>
          <Text style={styles.estadoText}>{item.estado}</Text>
        </View>
      </View>
      <Text style={[styles.especialistaText, { color: colors.textLight }]}>{item.especialista}</Text>
      <View style={styles.fechaHoraContainer}>
        <Text style={[styles.fechaText, { color: colors.text }]}>{item.fecha}</Text>
        <Text style={[styles.horaText, { color: colors.text }]}>{item.hora}</Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {mockCitas.length === 0 ? (
        <Text style={[styles.noCitasText, { color: colors.textLight }]}>
          No tienes citas
        </Text>
      ) : (
        <>
          <View style={styles.filtersContainer}>
            <View style={styles.filterSection}>
              <Text style={[styles.filterTitle, { color: colors.text }]}>
                Filtrar por procedimiento
              </Text>
              <FlatList
                horizontal
                data={procedimientos}
                keyExtractor={(item, index) => `procedimiento-${index}`}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => setSelectedProcedimiento(
                      selectedProcedimiento === item ? null : item
                    )}
                    style={[
                      styles.filterButton,
                      { backgroundColor: colors.backgroundSecondary },
                      selectedProcedimiento === item && { backgroundColor: colors.primary }
                    ]}
                  >
                    <Text
                      style={[
                        styles.filterButtonText,
                        { color: colors.text },
                        selectedProcedimiento === item && { color: '#fff', fontWeight: '600' }
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>

            <View style={styles.filterSection}>
              <Text style={[styles.filterTitle, { color: colors.text }]}>
                Filtrar por estado
              </Text>
              <FlatList
                horizontal
                data={estados}
                keyExtractor={(item, index) => `estado-${index}`}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => setSelectedEstado(
                      selectedEstado === item ? null : item 
                    )}
                    style={[
                      styles.filterButton,
                      { backgroundColor: colors.backgroundSecondary },
                      selectedEstado === item && { backgroundColor: colors.success }
                    ]}
                  >
                    <Text
                      style={[
                        styles.filterButtonText,
                        { color: colors.text },
                        selectedEstado === item && { color: '#fff', fontWeight: '600' }
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
          <View style={styles.citasContainer}>
            <Text style={[styles.citasTitle, { color: colors.text }]}>
              Tus citas ({filteredCitas.length})
            </Text>
            <FlatList
              data={filteredCitas}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderCitaItem}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.citasList}
            />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  noCitasText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  filtersContainer: {
    marginBottom: 20,
  },
  filterSection: {
    marginBottom: 16,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  filterButton: {
    padding: 12,
    marginRight: 8,
    borderRadius: 8,
    minWidth: 80,
    alignItems: "center",
  },
  filterButtonText: {
    fontWeight: "500",
  },
  citasContainer: {
    flex: 1,
  },
  citasTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  citasList: {
    paddingBottom: 20,
  },
  citaCard: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    borderWidth: 1,
  },
  citaHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  procedimientoText: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  estadoBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 8,
  },
  estadoText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: "600",
  },
  especialistaText: {
    fontSize: 14,
    marginBottom: 8,
  },
  fechaHoraContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  fechaText: {
    fontSize: 14,
    fontWeight: "500",
  },
  horaText: {
    fontSize: 14,
    fontWeight: "600",
  },
});