import { useAuth } from "@/src/context/AuthContext";
import { useTheme } from "@/src/context/ThemeContext";
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";


export default function Index() {
  const { loading, token } = useAuth();
  const { colors } = useTheme();
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!token) {
    return <Redirect href="/login" />;
  }

  return <Redirect href="/home" />;
}
