import { BackButton } from "@/src/components/shared/BackButton";
import { Screen } from "@/src/components/shared/Screen";
import { useTheme } from "@/src/context/ThemeContext";
import TabBar from "@/src/modules/home/components/TabBar";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NotificationsList } from "../components/NotificationsList";
import { Notification } from "../types/notifications.types";

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Cita confirmada",
    message: "Tu cita para limpieza facial ha sido confirmada para el 15 de enero a las 10:00 AM",
    date: "Hace 2h",
    read: false,
    type: "appointment",
  },
  {
    id: "2",
    title: "Nueva promoción",
    message: "¡20% de descuento en todos los tratamientos faciales este mes!",
    date: "Hace 5h",
    read: false,
    type: "promotion",
  },
  {
    id: "3",
    title: "Recordatorio",
    message: "Tienes una cita mañana a las 3:00 PM. Te esperamos!",
    date: "Ayer",
    read: true,
    type: "info",
  },
 
];

const NotificationsScreen: React.FC = () => {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredNotifications =
    activeTab === "unread"
      ? mockNotifications.filter((n) => !n.read)
      : mockNotifications;

  const handleNotificationPress = (notification: Notification) => {
    console.log("Notification pressed:", notification);
   
  };

  return (
    <Screen>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <BackButton />
        </View>

        <View style={styles.tabContainer}>
          <TabBar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            options={[
              { key: "all", label: "Todas" },
              { key: "unread", label: "No leídas" },
            ]}
          />
        </View>

        <View style={styles.content}>
          <NotificationsList
            notifications={filteredNotifications}
            onNotificationPress={handleNotificationPress}
          />
        </View>
      </SafeAreaView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  tabContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  content: {
    flex: 1,
  },
});

export default NotificationsScreen;
