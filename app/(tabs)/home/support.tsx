import EmptySvg from '@/assets/svg/Empty.svg';
import TitleText from '@/components/shared/TitleText';
import { useTheme } from "@/context/ThemeContext";
import TabBar from "@/modules/home/components/TabBar";
import { Colors } from '@/themes/colors';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";



type TabOption = {
  key: string;
  label: string;
};

const TAB_OPTIONS: TabOption[] = [
  { key: "solicitudes", label: "Solicitudes" },
  { key: "historial", label: "Historial" },
];

const Support: React.FC = () => {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState<string>(TAB_OPTIONS[0].key);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}> 
      <View style={[styles.header, { backgroundColor: colors.primaryLight }]}> 
        <Pressable style={[styles.newRequestButton, { backgroundColor: colors.blue, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}> 
          <Ionicons name="add" size={22} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.newRequestText}>Nueva solicitud</Text> 
        </Pressable> 
      </View> 
      <View style={styles.content}> 
        <TabBar 
          options={TAB_OPTIONS} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        /> 
        {activeTab === "solicitudes" && ( 
          <View style={styles.emptyContainer}> 
            <EmptySvg width={220} height={22000} />
            <TitleText style={styles.emptyText}>No tienes solicitudes</TitleText>
          </View> 
        )} 
        {activeTab === "historial" && ( 
          <View style={styles.emptyContainer}> 
            <EmptySvg width={220} height={220} />
            <Text style={styles.emptyText}>No hay historial</Text>
          </View> 
        )} 
      </View> 
    </View> 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    display: "flex",
    alignItems: "center",
    height: 80,
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  newRequestButton: {
    borderRadius: 999,
    padding: 10,
    alignItems: "center",
    width: '90%',
  
  },
  newRequestText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: Colors.secondaryDark,
    fontWeight: 700,
    textAlign: 'center',
  },
});

export default Support;