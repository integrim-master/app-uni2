import ConfirmActionModal from "@/src/components/shared/ConfirmActionModal";
import PrimaryButton from "@/src/components/shared/PrimaryButton";
import { Screen } from "@/src/components/shared/Screen";
import { SimpleMenuSection } from "@/src/components/shared/SimpleMenuSection";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ProfileHeader } from "../components/ProfileHeader";
import { useProfileScreen } from "../hooks/useProfileScreen";

/**
 * Android: sin SafeArea en Screen.
 * El color del header llega a la status bar vía paddingTop en ProfileHeader.
 */
export function ProfileScreen() {
  const insets = useSafeAreaInsets();
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
    <Screen fullWidth>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: insets.bottom + 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 justify-start ">
          <ProfileHeader userName={userName} onPress={goToProfileDetails} />
          <View>
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
        </View>
        <View className="px-4">
          <PrimaryButton
            title="Cerrar sesión"
            variant="primary"
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
