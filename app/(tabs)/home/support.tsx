import EmptySvg from '@/assets/svg/Empty.svg';
import BodyText from '@/components/shared/BodyText';
import SubtitleText from '@/components/shared/SubtitleText';
import TitleText from '@/components/shared/TitleText';
import { useTheme } from "@/context/ThemeContext";
import TabBar from "@/modules/home/components/TabBar";
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
        <Pressable style={[styles.newRequestButton, { backgroundColor: colors.backgroundSecondary, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}> 
          <Ionicons name="add" size={22} color={colors.primaryDark} style={{ marginRight: 8 }} />
          <Text style={[
            styles.newRequestText ,
            { color: colors.text }
          ]}>Nueva solicitud</Text> 
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
            <EmptySvg width={280} height={280} style={styles.emptyImage} />
            <TitleText style={[styles.emptyTitle, { color: colors.primaryDark }]}>
              ¡Sin solicitudes!
            </TitleText>
            <SubtitleText style={[styles.emptySubtitle, { color: colors.textLight }]}>
              Aquí aparecerán tus solicitudes de soporte
            </SubtitleText>
           
          </View>
        )}
        {activeTab === "historial" && (
          <View style={styles.emptyContainer}>
            <EmptySvg width={280} height={280} style={styles.emptyImage} />
            <TitleText style={[styles.emptyTitle, { color: colors.primaryDark }]}>No hay historial</TitleText>
            <SubtitleText style={[styles.emptySubtitle, { color: colors.text }]}>Tu historial de soporte aparecerá aquí</SubtitleText>
            <BodyText style={[styles.emptyBody, { color: colors.textSecondary }]}>Cuando tengas solicitudes resueltas, podrás consultarlas en este espacio.</BodyText>
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 40,
  
  },
  emptyImage: {

  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 2,
  },
  emptyBody: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 2,
    marginBottom: 2,
    paddingHorizontal: 16,
  },
});

export default Support;