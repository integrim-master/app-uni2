import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { AuthContext, useAuth } from "../../context/AuthContext";
import { ItemsHistory } from "../../components/screen/History/ItemsHistory";
import { CitasContext } from "../../context/CitasContext";

export default function CitasScreen() {

  const { user, membership, token, loadAuth, setLoading } = useAuth();
  const { citas, getCitas, loadingCitas} = useContext(CitasContext)
  const colors = membership?.colors || {};
  const { color1: dark, color2: light, color3: colorFondo } = colors;
  const [selectedProcedimiento, setSelectedProcedimiento] = useState(null);
  const [selectedEstado, setSelectedEstado] = useState(null);
  const [procedimientos, setProcedimientos] = useState([])
  const [estados, setEstados] = useState([])
  const [filteredCitas, setFilteredCitas] = useState([])

  useEffect(()=>{
    if(token) {
      getCitas();
      const mapProcedimientos = [...new Set(citas.map(cita => cita.procedimiento))];
      setProcedimientos(mapProcedimientos)
      const mapEstados = [...new Set(citas.map(cita => cita.estado))];
      setEstados(mapEstados)
        // 🔎 Filtro dinámico
      const auxFiltered = citas.filter((cita) => {
        return (
          (!selectedProcedimiento || cita.procedimiento === selectedProcedimiento) &&
          (!selectedEstado || cita.estado === selectedEstado)
        );
      });
      setFilteredCitas(auxFiltered)
    }
  },[token])

  if (loadingCitas) {
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <Text>Cargando citas...</Text>
      </View>
    );
  }

return (
  <View style={{ flex: 1, padding: 16 }}>
    {estados.length === 0 ? (
      <Text style={{ textAlign: "center", marginTop: 20 }}>
        No tienes citas
      </Text>
    ) : (
      <>
        {/* Filtros de procedimiento */}
        <View>
          <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 8 }}>
            Filtrar por procedimiento
          </Text>
          <FlatList
            horizontal
            data={procedimientos}
            keyExtractor={(item, index) => `${procedimientos}-${index}`}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  setSelectedProcedimiento(
                    selectedProcedimiento === item ? null : item
                  )
                }
                style={{
                  padding: 8,
                  marginRight: 8,
                  borderRadius: 8,
                  backgroundColor:
                    selectedProcedimiento === item ? "#3b82f6" : "#e5e7eb",
                }}
              >
                <Text
                  style={{
                    color: selectedProcedimiento === item ? "#fff" : "#000",
                  }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Filtros de estado */}
        <View>
          <Text style={{ fontSize: 16, fontWeight: "bold", marginVertical: 8 }}>
            Filtrar por estado
          </Text>
          <FlatList
            horizontal
            data={estados}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  setSelectedEstado(selectedEstado === item ? null : item)
                }
                style={{
                  padding: 8,
                  marginRight: 8,
                  borderRadius: 8,
                  backgroundColor:
                    selectedEstado === item ? "#10b981" : "#e5e7eb",
                }}
              >
                <Text
                  style={{
                    color: selectedEstado === item ? "#fff" : "#000",
                  }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <FlatList
          data={filteredCitas}
          keyExtractor={(item) => item.id.toString()}
          style={{ marginTop: 16, flex: 1 }}
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          renderItem={({ item }) => (
            <ItemsHistory
              dark={dark}
              procedimiento={item.procedimiento}
              fecha={item.fecha}
              hora={item.hora}
              medico={item.especialista}
              estado={item.estado}
              buttons={"Activo"}
            />
          )}
        />
      </>
    )}
  </View>
);

}
