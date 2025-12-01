import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Pressable } from "react-native";
import { useAuth } from "../context/AuthContext";
import { Screen } from "../components/Screen";
import { useRouter } from "expo-router";
import { TextContent, TextSubTitles } from "../components/TextCustom";

export default function NotificationsScreen({ userId }) {
    const { user, membership, token, loadAuth, setLoading } = useAuth();
  const [notifications, setNotifications] = useState([]);
    const router = useRouter();
  const fetchNotifications = async () => {
    const res = await fetch(`https://98062db687db.ngrok-free.app/wp-json/careme/v1/notificaciones?user_id=${user.id}`);
    const data = await res.json();
    setNotifications(data);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAsRead = async (id) => {
    await fetch(`https://98062db687db.ngrok-free.app/wp-json/careme/v1/notificaciones/read`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchNotifications();
  };

  return (
    <Screen>
      <Text className="text-xl font-bold mb-3">Notificaciones</Text>
      <View style={{ flex: 1, padding: 20 }}>
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => markAsRead(item.id)}>
              <View
                style={{
                  backgroundColor: item.is_read ? "#eee" : "#cde4ff",
                  padding: 15,
                  borderRadius: 10,
                  marginBottom: 10,
                }}
              >
                <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
                <Text>{item.body}</Text>
                <Text style={{ fontSize: 12, color: "#555" }}>{item.date}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
        <View className={'items-center'}>
          <Pressable
            onPress={()=>router.back()}
            className={'bg-blue-400 py-5 px-16 rounded-full'}
          >
            <TextSubTitles>Salir</TextSubTitles>
          </Pressable>
        </View>
      </View>
    </Screen>
  );
}