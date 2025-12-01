import { ActivityIndicator, ScrollView, TouchableOpacity, View, Text, Alert, RefreshControl } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext, useAuth } from "../context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";

export function   Screen({ children, className, withTopInset = true, ...props }) {
    const [refreshing, setRefreshing] = React.useState(false);
    const { membership } = useAuth();
    const { color3:colorFondo } = membership.colors;
  return (
    <SafeAreaView 
      edges={withTopInset ? ['top', 'left', 'right', 'bottom'] : ['left', 'right', 'bottom']}
      className={`flex-1 p-3 ${className}`} 
      style={{backgroundColor: colorFondo}} {...props}>
        {children}
    </SafeAreaView>
  );
}
