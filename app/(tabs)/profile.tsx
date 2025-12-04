import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../context/ThemeContext";

export default function Profile() {
  const { colors, toggleTheme, isDark } = useTheme();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      showsVerticalScrollIndicator={false}
    >
      <SafeAreaView style={{ paddingTop: 20, paddingHorizontal: 16, gap: 24 }}>
        {/* Profile Card */}
        <View
          style={{
            backgroundColor: colors.card,
            padding: 20,
            borderRadius: 12,
            gap: 12,
            shadowColor: colors.shadow,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 5,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "600", color: colors.text }}>
              Mi Perfil
            </Text>
            <Pressable>
              <Text style={{ color: colors.primary, fontWeight: "500" }}>EDITAR</Text>
            </Pressable>
          </View>
          <View style={{ padding: 8, gap: 12 }}>
            <Text style={{ fontSize: 16, color: colors.text }}>Nombre: Juan Pérez</Text>
            <Text style={{ fontSize: 16, color: colors.text }}>Email: juan.perez@email.com</Text>
          </View>
        </View>

        {/* Options Section */}
        <View style={{ gap: 16 }}>
      
          <Pressable
            onPress={toggleTheme}
            style={{
              backgroundColor: colors.primary,
              padding: 16,
              borderRadius: 12,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              shadowColor: colors.shadow,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <Text style={{ fontSize: 16, color: '#fff', fontWeight: '600' }}>
              {isDark ? 'Cambiar a Modo Claro' : ' Cambiar a Modo Oscuro'}
            </Text>
          </Pressable>

          <Pressable
            style={{
              backgroundColor: colors.card,
              padding: 16,
              borderRadius: 12,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              shadowColor: colors.shadow,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 5,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <Text style={{ fontSize: 16, color: colors.text }}>Configuración</Text>
          </Pressable>

          <Pressable
            style={{
              backgroundColor: colors.card,
              padding: 16,
              borderRadius: 12,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              shadowColor: colors.shadow,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 5,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <Text style={{ fontSize: 16, color: colors.danger }}>Cerrar Sesión</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}