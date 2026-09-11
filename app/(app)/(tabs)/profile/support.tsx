import { Screen } from '@/src/components/shared/Screen';
import TabBar from "@/src/components/shared/TabBar";
import SupportHistory from "@/src/modules/profile/screens/SupportHistory";
import SupportRequests from "@/src/modules/profile/screens/SupportRequests";
import { ui } from "@/src/themes/ui";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

type TabOption = {
  key: string;
  label: string;
};

const TAB_OPTIONS: TabOption[] = [
  { key: "solicitudes", label: "Solicitudes" },
  { key: "historial", label: "Historial" },
];

const Support: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(TAB_OPTIONS[0].key);

  return (
    <Screen style={styles.container}> 
      <View style={styles.content}> 
        <TabBar 
          options={TAB_OPTIONS} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        /> 
        {activeTab === "solicitudes" && <SupportRequests />}
        {activeTab === "historial" && <SupportHistory />}
      </View> 
    </Screen> 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingVertical: ui.spacing.lg,
  },
});

export default Support;