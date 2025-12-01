import React, { useState, useEffect, useContext } from "react";
import { View, Text, Button, FlatList, TouchableOpacity } from "react-native";
import { useAuth } from "../context/AuthContext";
import AgendaCitas from "../components/screen/Agendar/AgendarCitas";

export default function agendar() {
  const {token, user} = useAuth()
  return (
  <AgendaCitas token={token} usuarioId={user.id}/>
  );
}
