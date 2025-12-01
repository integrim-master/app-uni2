import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";

export async function registerForPushNotificationsAsync(userId) {
  let token;

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("No se concedieron permisos para notificaciones push");
      return;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("📲 Token de notificación:", token);

    // Envía el token a WordPress
    await fetch("https://c0cbc39c36a4.ngrok-free.app/wp-json/careme/v1/register-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userId,
        token: token,
      }),
    });
  } else {
    alert("Debe usar un dispositivo físico para recibir notificaciones push");
  }

  return token;
}
