import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Button, Alert, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';

// URL base de tu API
const API_URL = 'https://e27cf2ea2170.ngrok-free.app';

export default function AgendaCitas({ token, usuarioId }) {

  const [sedes, setSedes] = useState([]);
  const [procedimientos, setProcedimientos] = useState([]);
  const [especialistas, setEspecialistas] = useState([]);
  const [seleccion, setSeleccion] = useState({
    sede: null,
    procedimiento: null,
    especialista: null,
    fecha: null,
    hora: null,
    usuario: usuarioId
  });
  const [showPreview, setShowPreview] = useState(false);
  const [cita, setCita] = useState({
    sede: null,
    procedimiento: null,
    especialista: null,
    fecha: null,
    hora: null
  });
  const [disponibilidad, setDisponibilidad] = useState({});

  // Cargar datos iniciales
  useEffect(() => {
    fetch(`${API_URL}/wp-json/agenda/v1/sedes`).then(r=>r.json()).then(setSedes);
    fetch(`${API_URL}/wp-json/agenda/v1/procedimientos`).then(r=>r.json()).then(setProcedimientos);
    fetch(`${API_URL}/wp-json/agenda/v1/especialistas`).then(r=>r.json()).then(setEspecialistas);
  }, []);

  // Filtrar especialistas por sede y procedimiento
  const especialistasFiltrados = especialistas.filter(e => {
    return e.sedes?.includes(seleccion.sede) &&
           e.procedimientos?.includes(seleccion.procedimiento);
  });

  // Obtener disponibilidad cuando cambia especialista/sede/procedimiento
  useEffect(() => {
    const obtenerDisponibilidad = async () => {
      if(!seleccion.especialista || !seleccion.sede || !seleccion.procedimiento) return;

      try {
        const res = await fetch(`${API_URL}/wp-json/agenda/v1/disponibilidad?especialista=${seleccion.especialista}&sede=${seleccion.sede}&procedimiento=${seleccion.procedimiento}`,{
            headers: {
          'Authorization': `Bearer ${token}`
        }});
        const data = await res.json();
        setDisponibilidad(data);
        setSeleccion(prev => ({ ...prev, fecha: null, hora: null })); // reset fecha/hora
      } catch(e) {
        console.log(e);
      }
    }
    obtenerDisponibilidad();
  }, [seleccion.especialista, seleccion.sede, seleccion.procedimiento]);

  // Horas libres del día seleccionado
  const horasLibres = seleccion.fecha ? disponibilidad[seleccion.fecha] || [] : [];

  // Agendar cita
  const agendarCita = async () => {
    if(!seleccion.usuario || !seleccion.fecha || !seleccion.hora || !seleccion.especialista) {
      Alert.alert('Error', 'Completa todos los campos antes de agendar');
      return;
    }

    try {
      const res = await fetch(`${API_URL}/wp-json/agenda/v1/citas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(seleccion)
      });
      if(res.ok) {
        Alert.alert('Éxito', 'Cita agendada correctamente');
        setShowPreview(false);
        setCita({ sede:null, procedimiento:null, especialista:null, fecha:null, hora:null });
      } else {
        const err = await res.json();
        Alert.alert('Error', err.message || 'No se pudo agendar');
      }
    } catch(e) {
      console.log(e);
      Alert.alert('Error', 'No se pudo conectar con el servidor');
    }
  }
  return (
    <ScrollView style={{ padding: 20}}>

      {/* Selector de Sede */}
      <Text>Sede:</Text>
      <Picker selectedValue={seleccion.sede} onValueChange={(val)=>setSeleccion({...seleccion,sede:val})}>
        <Picker.Item label="— Seleccionar Sede —" value={null} />
        {sedes.map(s => <Picker.Item key={s.id} label={s.nombre} value={s.id} />)}
      </Picker>

      {/* Selector de Procedimiento */}
      <Text>Procedimiento:</Text>
      <Picker selectedValue={seleccion.procedimiento} onValueChange={(val)=>setSeleccion({...seleccion,procedimiento:val})}>
        <Picker.Item label="— Seleccionar Procedimiento —" value={null} />
        {procedimientos.map(p => <Picker.Item key={p.id} label={p.nombre} value={p.id} />)}
      </Picker>

      {/* Selector de Especialista */}
      <Text>Especialista:</Text>
      <Picker selectedValue={seleccion.especialista} onValueChange={(val)=>setSeleccion({...seleccion,especialista:val})}>
        <Picker.Item label="— Seleccionar Especialista —" value={null} />
        {especialistasFiltrados.map(e => <Picker.Item key={e.id} label={e.nombre} value={e.id} />)}
      </Picker>

      {/* Calendario de días disponibles */}
      <Text>Días disponibles:</Text>
      <ScrollView horizontal style={{marginVertical:10}}>
        {Object.keys(disponibilidad).map(dia => (
          <TouchableOpacity key={dia} onPress={()=>setSeleccion({...seleccion,fecha:dia})} style={{
            padding:10, marginRight:5,
            backgroundColor: seleccion.fecha===dia?'blue':'gray'
          }}>
            <Text style={{color:'white'}}>{dia}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Horas libres */}
      {seleccion.fecha && (
        <>
          <Text>Horas disponibles:</Text>
          <ScrollView horizontal style={{marginVertical:10}}>
            {horasLibres.map(h => (
              <TouchableOpacity key={h} onPress={()=>setSeleccion({...seleccion,hora:h})} style={{
                padding:10, marginRight:5,
                backgroundColor: seleccion.hora===h?'green':'lightgray'
              }}>
                <Text>{h}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      )}

      {/* Botón Agendar */}
      <Button title="Agendar Cita" onPress={() => setShowPreview(true)} />

    <Modal visible={showPreview} animationType="slide">
        <View style={{ padding: 20 }}>
          <Text>Confirmar Cita</Text>
          <Text>Sede: {cita.sede?.nombre}</Text>
          <Text>Procedimiento: {cita.procedimiento?.nombre}</Text>
          <Text>Especialista: {cita.especialista?.nombre}</Text>
          <Text>Fecha: {seleccion.fecha}</Text>
          <Text>Hora: {seleccion.hora}</Text>

          <Button title="Aceptar" onPress={agendarCita} />
          <Button title="Editar" onPress={() => setShowPreview(false)} />
        </View>
      </Modal>

    </ScrollView>
  )
}
