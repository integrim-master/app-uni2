import ConfirmActionModal from "@/src/components/shared/ConfirmActionModal";
import PrimaryButton from "@/src/components/shared/PrimaryButton";
import { Screen } from "@/src/components/shared/Screen";
import { SimpleMenuSection } from "@/src/components/shared/SimpleMenuSection";
import ThemedText from "@/src/components/shared/themed-text";
import { useTheme } from "@/src/context/ThemeContext";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ProfileHeader } from "../components/ProfileHeader";
import { useProfileScreen } from "../hooks/useProfileScreen";

export function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
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
          paddingBottom: insets.bottom + 24,
        }}
        showsVerticalScrollIndicator={false}
      >
        <ProfileHeader userName={userName} onPress={goToProfileDetails} />

        <View className="flex-1 px-4 pt-6">
          <ThemedText
            type="caption"
            color={colors.textMuted}
            style={{ marginLeft: 4, marginBottom: 8, letterSpacing: 0.4 }}
          >
            GENERAL
          </ThemedText>

          <View
            style={{
              backgroundColor: colors.backgroundElevated,
              borderRadius: 16,
              overflow: "hidden",
            }}
          >
            <SimpleMenuSection
              title="Contactar asesor"
              subtitle="Soporte y ayuda"
              icon="chatbubble-outline"
              rightIcon="chevron-forward"
              onPress={contactAdvisor}
            />
            <View
              style={{
                height: 1,
                backgroundColor: colors.border,
                marginLeft: 56,
              }}
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

        <View className="px-4 pt-8">
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
