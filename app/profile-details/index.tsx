import { BackButton } from "@/src/components/shared/BackButton";
import PrimaryButton from "@/src/components/shared/PrimaryButton";
import { Screen } from "@/src/components/shared/Screen";
import { SimpleMenuSection } from "@/src/components/shared/SimpleMenuSection";
import { useTheme } from "@/src/context/ThemeContext";
import { userUser } from "@/src/modules/banner/hooks/userHome";
import { ProfileSkeleton } from "@/src/modules/profile/components/ProfileSkeleton";
import { useInfoProfile } from "@/src/modules/profile/hooks/useMeProfile";
import { ui } from "@/src/themes/ui";
import { router } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function ProfileDetailScreen() {
  const { colors } = useTheme();
  const { data: user, isPending: isInfoPending } = useInfoProfile();
  const { data: email } = userUser();
  return (
    <Screen
      safeArea={true}
      leftButton={<BackButton iconName="close-outline" />}
    >
      <ScrollView>
        {isInfoPending ? (
          <ProfileSkeleton />
        ) : (
          <>
            <View style={[styles.headerContainer]}>
              <View
                style={[
                  styles.avatarCircle,
                  {
                    backgroundColor: colors.primaryLight,
                  },
                ]}
              >
                <Text
                  style={[styles.avatarInitial, { color: colors.cardTextDark }]}
                >
                  {user?.nombre?.charAt(0).toUpperCase()}
                </Text>
              </View>

              <Text style={[styles.name, { color: "#fff" }]}>
                {user?.nombre}
              </Text>
              <Text style={[styles.email, { color: "rgba(255,255,255,0.8)" }]}>
                {email?.user_email || "Correo no disponible"}
              </Text>

              <PrimaryButton
                title="Editar perfil"
                onPress={() => router.push("/profile-details/edit")}
                style={{ marginTop: 14, alignSelf: "center" }}
              />
            </View>

            <View style={styles.sectionWrapper} className="flex gap-2">
              <SimpleMenuSection
                sectionTitle="Datos de contacto"
                items={[
                  {
                    title: "Correo",
                    subtitle: email?.user_email || "N/A",
                    icon: "mail-outline",
                  },
                  {
                    title: "Teléfono",
                    subtitle: user?.telefono || "N/A",
                    icon: "call-outline",
                  },
                ]}
              />

              <SimpleMenuSection
                sectionTitle="Datos personales"
                items={[
                  {
                    title: "Nombre",
                    subtitle: user?.nombre || "N/A",
                    icon: "person-outline",
                  },
                  {
                    title: "Identificación",
                    subtitle: user?.type_id?.toString() || "N/A",
                    icon: "card-outline",
                  },
                  {
                    title: "Tipo de identificación",
                    subtitle: user?.identificacion || "N/A",
                    icon: "id-card-outline",
                  },
                  {
                    title: "Financiamiento",
                    subtitle: user?.fnacimiento || "N/A",
                    icon: "calendar-outline",
                  },
                ]}
              />

              <SimpleMenuSection
                sectionTitle="Datos de residencia"
                items={[
                  {
                    title: "País origen",
                    subtitle: user?.pais_origen || "N/A",
                    icon: "flag-outline",
                  },
                  {
                    title: "País residencia",
                    subtitle: user?.pais_residencia || "N/A",
                    icon: "home-outline",
                  },
                  {
                    title: "Provincia",
                    subtitle: user?.provincia || "N/A",
                    icon: "map-outline",
                  },
                  {
                    title: "Ciudad",
                    subtitle: user?.pais_residencia || "N/A",
                    icon: "business-outline",
                  },
                  {
                    title: "Postal",
                    subtitle: user?.postal || "N/A",
                    icon: "mail-open-outline",
                  },
                ]}
              />
            </View>
          </>
        )}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingBottom: 40,
    alignItems: "center",
    borderBottomRightRadius: ui.radii.xl,
  },

  avatarCircle: {
    width: 120,
    height: 120,
    borderRadius: ui.radii.pill,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },

  avatarInitial: {
    fontSize: 48,
    fontWeight: "700",
  },

  name: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 10,
  },

  email: {
    fontSize: 14,
    marginTop: 2,
  },

  editButton: {
    marginTop: 14,
    flexDirection: "row",
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: ui.radii.md,
    alignItems: "center",
  },

  editText: {
    color: "#fff",
    marginLeft: 6,
    fontSize: 15,
    fontWeight: "600",
  },

  sectionWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  luxuryContainer: {
    flex: 1,
    borderTopLeftRadius: ui.radii.xl,
    borderTopRightRadius: ui.radii.xl,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 18,
    shadowOffset: { height: -6, width: 0 },
  },

  blurLayer: {
    ...StyleSheet.absoluteFillObject,
  },

  headerSection: {
    marginBottom: 20,
  },

  iconContainer: {
    marginBottom: 12,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 8,
  },

  subtitle: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 14,
    lineHeight: 20,
  },

  fieldWrapper: {
    marginBottom: 20,
  },

  fieldLabel: {
    color: "rgba(255,255,255,0.9)",
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "600",
  },

  fieldBox: {
    backgroundColor: "rgba(255,255,255,0.08)",
    padding: 14,
    borderRadius: ui.radii.md,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },

  fieldBoxDisabled: {
    backgroundColor: "rgba(255,255,255,0.04)",
    borderColor: "rgba(255,255,255,0.06)",
  },

  fieldText: {
    color: "#fff",
    fontSize: 15,
  },

  helperText: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 12,
    marginTop: 6,
    fontStyle: "italic",
  },

  saveButton: {
    marginTop: 28,
    borderRadius: ui.radii.md,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { height: 4, width: 0 },
    elevation: 5,
  },

  saveButtonDisabled: {
    opacity: 0.7,
  },

  saveButtonGradient: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  saveButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
});
