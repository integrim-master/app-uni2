import PrimaryButton from "@/src/components/shared/PrimaryButton";
import { Screen } from "@/src/components/shared/Screen";
import { SimpleMenuSection } from "@/src/components/shared/SimpleMenuSection";
import ThemedText from "@/src/components/shared/themed-text";
import { useTheme } from "@/src/context/ThemeContext";
import { useUser } from "@/src/modules/user/hooks/useUser";

import { ProfileSkeleton } from "@/src/modules/profile/components/ProfileSkeleton";
import { useInfoProfile } from "@/src/modules/profile/hooks/useMeProfile";
import { router } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function ProfileDetailScreen() {
  const { colors } = useTheme();
  const { data: user, isPending: isInfoPending } = useInfoProfile();
  const { data: email } = useUser();

  return (
    <Screen fullWidth>
   
      <View
        style={[styles.overscrollFill, { backgroundColor: colors.primaryLight }]}
        pointerEvents="none"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scroll}
        contentContainerStyle={{ backgroundColor: colors.background }}
      >
        {isInfoPending ? (
          <ProfileSkeleton />
        ) : (
          <>
            {/* HEADER */}
            <View
              style={[
                styles.headerContainer,
                { backgroundColor: colors.primaryLight },
              ]}
            >
              <View
                style={[styles.avatarCircle, { backgroundColor: colors.primary }]}
              >
                <ThemedText
                  type="display"
                  color={colors.cardText}
                  weight="bold"
                >
                  {user?.nombre?.charAt(0).toUpperCase()}
                </ThemedText>
              </View>

              <View style={styles.nameBlock}>
                <ThemedText type="title" tone="inverse">
                  {user?.nombre}
                </ThemedText>
                <ThemedText type="caption" tone="inverse">
                  {email?.user_email || "Correo no disponible"}
                </ThemedText>
              </View>

              <PrimaryButton
                title="Editar perfil"
                onPress={() => router.push("/profile-details/edit")}
                style={styles.editBtn}
              />
            </View>

            {/* SECCIONES */}
            <View style={styles.sectionWrapper}>
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

  overscrollFill: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 500,
  },
  scroll: {
    backgroundColor: "transparent",
  },

  headerContainer: {
    alignItems: "center",
    paddingTop: 24,
    paddingBottom: 32,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  avatarCircle: {
    width: 104,
    height: 104,
    borderRadius: 52,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.25)",
  },
  nameBlock: {
    marginTop: 14,
    alignItems: "center",
    gap: 2,
  },
  editBtn: {
    marginTop: 18,
    alignSelf: "center",
  },

  sectionWrapper: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 20,
    gap: 20,
  },
});