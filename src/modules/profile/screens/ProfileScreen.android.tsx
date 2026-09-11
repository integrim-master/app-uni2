/**
 * ProfileScreen (Android) — React Native (Expo UI Jetpack quedó descartado
 * por problemas de layout de texto en SDK actual).
 *
 * Resuelto automáticamente por Metro en Android (sufijo `.android.tsx`).
 * Incluye padding de safe area en el header de color.
 * Lógica compartida: `../hooks/useProfileScreen`.
 */
import ConfirmActionModal from "@/src/components/shared/ConfirmActionModal";
import PrimaryButton from "@/src/components/shared/PrimaryButton";
import { Screen } from "@/src/components/shared/Screen";
import { SimpleMenuSection } from "@/src/components/shared/SimpleMenuSection";
import ThemedText from "@/src/components/shared/themed-text";
import { useTheme } from "@/src/context/ThemeContext";
import { ui } from "@/src/themes/ui";
import { ScrollView, StyleSheet, View } from "react-native";
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
          paddingBottom: insets.bottom + ui.spacing.xl,
        }}
        showsVerticalScrollIndicator={false}
      >
        <ProfileHeader userName={userName} onPress={goToProfileDetails} />

        <View style={styles.body}>
          <ThemedText type="label" tone="muted" style={styles.sectionLabel}>
            General
          </ThemedText>

          <View
            style={[
              styles.group,
              { backgroundColor: colors.backgroundElevated },
            ]}
          >
            <SimpleMenuSection
              title="Contactar asesor"
              subtitle="Soporte y ayuda"
              icon="chatbubble-outline"
              rightIcon="chevron-forward"
              onPress={contactAdvisor}
            />
            <View
              style={[styles.divider, { backgroundColor: colors.border }]}
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

        <View style={styles.logoutWrap}>
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

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingHorizontal: ui.spacing.lg,
    paddingTop: ui.spacing.xl,
  },
  sectionLabel: {
    marginBottom: ui.spacing.sm,
  },
  group: {
    borderRadius: ui.radii.lg,
    overflow: "hidden",
    paddingHorizontal: ui.spacing.lg,
  },
  divider: {
    height: ui.borders.width,
    marginLeft: 48,
  },
  logoutWrap: {
    paddingHorizontal: ui.spacing.lg,
    paddingTop: ui.spacing.xl,
  },
});
