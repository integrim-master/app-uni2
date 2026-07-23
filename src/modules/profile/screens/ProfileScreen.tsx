import ConfirmActionModal from "@/src/components/shared/ConfirmActionModal";
import PrimaryButton from "@/src/components/shared/PrimaryButton";
import { Screen } from "@/src/components/shared/Screen";
import { SimpleMenuSection } from "@/src/components/shared/SimpleMenuSection";
import { ScrollView, View } from "react-native";
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
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 justify-between py-4">
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
            sss
          </View>

          <PrimaryButton
            title="Cerrar sesión"
            variant="warning"
            onPress={() => setShowLogoutConfirm(true)}
          />
        </View>
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
