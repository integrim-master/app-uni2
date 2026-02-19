import ConfirmActionModal from "@/src/components/shared/Modal";
import PrimaryButton from "@/src/components/shared/PrimaryButton";
import { SimpleMenuSection } from "@/src/components/shared/SimpleMenuSection";
import ThemedText from "@/src/components/shared/themed-text";
import { useAuth } from "@/src/context/AuthContext";
import { router } from "expo-router";
import { useState } from "react";
import { Linking, ScrollView, StyleSheet, Text, View } from "react-native";
import { Screen } from "../../../components/shared/Screen";
import { useTheme } from "../../../context/ThemeContext";
import { ProfileHeader } from "../components/ProfileHeader";

export function ProfileScreen() {
  const { colors } = useTheme();
  const { user, logout } = useAuth();

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showDataModal, setShowDataModal] = useState(false);

  const userName = user?.user_name || "Usuario";

  const generalItems = [
    {
      icon: "home-outline",
      label: "Inicio",
      onPress: () => router.push("/home"),
    },
    // {
    //   icon: "star-outline",
    //   label: "Favoritos",
    //   onPress: () => router.push("profile/favorites"),
    // },
  ];

  const supportItems = [
    // {
    //   icon: "help-circle-outline",
    //   label: "Obtener ayuda",
    //   onPress: () => router.push("profile/support"),
    // },
    {
      icon: "chatbubble-outline",
      label: "Contactar asesor",
      onPress: () => console.log("Contactar asesor"),
    },
    {
      icon: "document-text-outline",
      label: "Tratamiento de datos",
      onPress: () => router.push("profile/privacy"),
    },
  ];

  return (
    <Screen safeArea={true}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.safeArea}>
          <ProfileHeader
            userName={userName}
            onPress={() => router.push("/profile-details")}
          />
          <View className="h-ful mb-10 ">
            <SimpleMenuSection
              title="General"
              subtitle="Lorem ipsum dolor sit"
              icon="person-circle-outline"
              rightIcon="person-circle-outline"
            />
            {supportItems.map((item, idx) => (
              <SimpleMenuSection
                key={idx}
                title={item.label}
                subtitle={
                  item.label === "Tratamiento de datos"
                    ? "Ver política de datos"
                    : "Soporte y ayuda"
                }
                icon={item.icon}
                rightIcon="chevron-forward"
                onPress={item.onPress}
              />
            ))}
            <SimpleMenuSection
              title="General"
              subtitle="Lorem ipsum dolor sit"
              icon="person-circle-outline"
              rightIcon="person-circle-outline"
            />
          </View>

          <PrimaryButton
            title="Cerrar sesión"
            variant="secondary"
            onPress={() => setShowLogoutConfirm(true)}
            size="lg"
          />
        </View>
      </ScrollView>

      <ConfirmActionModal
        visible={showLogoutConfirm}
        title="Cerrar sesión"
        description="¿Estás seguro que deseas cerrar sesión?"
        confirmText="Sí, cerrar sesión"
        cancelText="Cancelar"
        variant="danger"
        onCancel={() => setShowLogoutConfirm(false)}
        onConfirm={async () => {
          setShowLogoutConfirm(false);
          await logout();
          router.replace("/login");
        }}
      />

      <ConfirmActionModal
        visible={showDataModal}
        title="Tratamiento de datos"
        variant="primary"
        confirmText="Aceptar"
        cancelText="Cancelar"
        onCancel={() => setShowDataModal(false)}
        onConfirm={() => setShowDataModal(false)}
        description={
          <>
            <ThemedText
              type="body"
              color={colors.textSecondary}
              style={{ textAlign: "center", marginBottom: 10 }}
            >
              Al proporcionar tus datos personales, aceptas que sean tratados de
            </ThemedText>

            <Text
              style={{
                textAlign: "center",
                color: colors.primary,
                fontWeight: "600",
                textDecorationLine: "underline",
                marginBottom: 20,
                fontSize: 14,
              }}
              onPress={() =>
                Linking.openURL(
                  "https://careme360.com/wp-content/uploads/2026/01/POLITICA-DE-TRATAMIENTO-DE-DATOS-CARE-ME-1.pdf",
                )
              }
            >
              Ver política de tratamiento de datos (PDF)
            </Text>

            <ThemedText
              type="caption"
              style={{ textAlign: "center", marginBottom: 10 }}
            >
              Al aceptar, confirmas que has leído y aceptas la política de
            </ThemedText>
          </>
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
  },
  safeArea: {
    paddingHorizontal: 20,
  },
  logoutButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 14,
    marginBottom: 100,
  },
});
