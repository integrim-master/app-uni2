import { Screen } from "@/components/shared/Screen";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../../context/ThemeContext";
import CitaCard, { Cita } from "../components/CitaCard";
import FiltersBottomSheet from "../components/FiltersBottomSheet";

const mockCitas = [
  {
    id: 1,
    procedimiento: "Limpieza Facial",
    fecha: "2024-12-15",
    hora: "10:00",
    especialista: "Dr. García",
    estado: "Confirmada",
  },
  {
    id: 2,
    procedimiento: "Masaje Relajante",
    fecha: "2024-12-20",
    hora: "14:30",
    especialista: "Terapeuta López",
    estado: "Pendiente",
  },
  {
    id: 3,
    procedimiento: "Tratamiento Capilar",
    fecha: "2024-12-25",
    hora: "16:00",
    especialista: "Especialista Rodríguez",
    estado: "Completada",
  },
];

export default function DatesScreen() {
  const [selectedProcedimiento, setSelectedProcedimiento] = useState<string | null>(null);
  const [selectedEstado, setSelectedEstado] = useState<string | null>(null);

  const { colors } = useTheme();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['45%', '75%'], []);

  const procedimientos = [...new Set(mockCitas.map((cita) => cita.procedimiento))];
  const estados = [...new Set(mockCitas.map((cita) => cita.estado))];

  const filteredCitas = useMemo(() => {
    return mockCitas.filter((cita) => {
      return (
        (!selectedProcedimiento || cita.procedimiento === selectedProcedimiento) &&
        (!selectedEstado || cita.estado === selectedEstado)
      );
    });
  }, [selectedProcedimiento, selectedEstado]);

  const openFilters = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(0);
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
        pressBehavior="close"
      />
    ),
    []
  );

  return (
    <Screen>
      <View style={styles.container}> 
      <View style={[styles.header, { backgroundColor: colors.card + '20' }]}> 
        <View style={styles.headerContent}>
          <Ionicons name="calendar" size={32} color={colors.primary} style={{ marginRight: 10 }} />
          <View>
            <Text style={[styles.headerTitle, { color: colors.text }]}>Mis citas</Text>
            <Text style={[styles.headerSubtitle, { color: colors.textLight }]}>Gestiona y revisa tus próximas citas</Text>
          </View>
        </View>
        <Pressable
          style={[styles.filterButton, { backgroundColor: colors.primary }]}
          onPress={openFilters}
        >
          <Ionicons name="filter" size={22} color="#fff" />
        </Pressable>
      </View>

      <Text style={[styles.citasCount, { color: colors.text }]}>Total: {filteredCitas.length} {filteredCitas.length === 1 ? 'cita' : 'citas'}</Text>

      {filteredCitas.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="sad-outline" size={48} color={colors.textLight} style={{ marginBottom: 8 }} />
          <Text style={[styles.noCitasText, { color: colors.textLight }]}>No tienes citas programadas</Text>
        </View>
      ) : (
        <View style={styles.citasListContainer}>
          {filteredCitas.map((cita: Cita) => (
            <CitaCard key={cita.id} cita={cita} />
          ))}
        </View>
      )}

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: colors.card }}
        handleIndicatorStyle={{ backgroundColor: colors.textLight }}
      >
        <BottomSheetView style={{ padding: 20, backgroundColor: colors.card }}>
          <FiltersBottomSheet
            procedimientos={procedimientos}
            estados={estados}
            selectedProcedimiento={selectedProcedimiento}
            selectedEstado={selectedEstado}
            setSelectedProcedimiento={setSelectedProcedimiento}
            setSelectedEstado={setSelectedEstado}
            colors={colors}
          />
        </BottomSheetView>
      </BottomSheet>
    </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
    paddingTop: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    marginBottom: 8,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 13,
    fontWeight: '500',
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    elevation: 2,
  },
  citasCount: {
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 16,
    marginBottom: 8,
  },
  citasListContainer: {
    flex: 1,
    gap: 12,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  noCitasText: {
    textAlign: 'center',
    fontSize: 16,
  },
});
