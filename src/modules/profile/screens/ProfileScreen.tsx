/**
 * ProfileScreen — fallback (web / plataformas sin árbol nativo Expo UI).
 *
 * Metro resuelve por plataforma:
 * - ProfileScreen.ios.tsx → SwiftUI (@expo/ui)
 * - ProfileScreen.android.tsx → RN + header con safe area
 * - ProfileScreen.tsx → este archivo (default)
 *
 * NO borrar este archivo ni los .ios/.android: Metro elige uno automáticamente.
 * La lógica compartida vive en `../hooks/useProfileScreen`.
 */
import ConfirmActionModal from "@/src/components/shared/ConfirmActionModal";
import PrimaryButton from "@/src/components/shared/PrimaryButton";
import { Screen } from "@/src/components/shared/Screen";
import { SimpleMenuSection } from "@/src/components/shared/SimpleMenuSection";
import { ui } from "@/src/themes/ui";
import { ScrollView, StyleSheet, View } from "react-native";
import { ProfileHeader } from "../components/ProfileHeader";
import { useProfileScreen } from "../hooks/useProfileScreen";

/** Fallback web / plataformas sin árbol nativo de Expo UI. */
export function ProfileScreen() {
  const {
    userName,
    showLogoutConfirm,
    setShowLogoutConfirm,
    handleLogout,
    goToProfileDetails,
    goToPrivacy,
    contactAdvisor,
  } = useProfileScreen();

  return (
    <Screen>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <ProfileHeader userName={userName} onPress={goToProfileDetails} />
          <SimpleMenuSection
            title="Contactar asesor"
            subtitle="Soporte y ayuda"
            icon="chatbubble-outline"
            rightIcon="chevron-forward"
            onPress={contactAdvisor}
          />
          <SimpleMenuSection
            title="Tratamiento de datos"
            subtitle="Ver política de datos"
            icon="document-text-outline"
            rightIcon="chevron-forward"
            onPress={goToPrivacy}
          />
        </View>

        <PrimaryButton
          title="Cerrar sesión"
          variant="warning"
          onPress={() => setShowLogoutConfirm(true)}
        />
      </ScrollView>

      <ConfirmActionModal
        visible={showLogoutConfirm}
        title="Cerrar sesión"
        description="¿Estás seguro que deseas cerrar sesión?"
        confirmText="Cerrar sesión"
        cancelText="Cancelar"
        variant="warning"
        onCancel={() => setShowLogoutConfirm(false)}
        onConfirm={handleLogout}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingVertical: ui.spacing.lg,
  },
});
