import { BackButton } from "@/src/components/shared/BackButton";
import { Screen } from "@/src/components/shared/Screen";
import { SimpleMenuSection } from "@/src/components/shared/SimpleMenuSection";
import { useTheme } from "@/src/context/ThemeContext";
import { useInfoProfile } from "@/src/modules/profile/hooks/useMeProfile";
import { formatProfilePlaceLabel } from "@/src/modules/profile/utils/getProfileFieldInitial";
import { getEditFieldHref } from "@/src/modules/profile/utils/validateProfileField";
import React from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";

export default function EditProfileScreen() {
  const { colors } = useTheme();

  const { data: user, isLoading } = useInfoProfile();

  if (isLoading) {
    return (
      <Screen safeArea>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </Screen>
    );
  }

  const locationLabel = [
    formatProfilePlaceLabel(user?.ciudad),
    formatProfilePlaceLabel(user?.provincia),
    formatProfilePlaceLabel(user?.pais_residencia),
  ]
    .filter((part) => part !== "N/A")
    .join(", ");

  return (
    <Screen safeArea={true} leftButton={<BackButton />}>
      <ScrollView>
        <View>
          <SimpleMenuSection
            title="Nombre de usuario"
            subtitle={user?.nombre || "N/A"}
            rightIcon="chevron-forward"
            icon=""
            link={getEditFieldHref("nombre")}
          />
          <SimpleMenuSection
            title="Identificación"
            subtitle={user?.identificacion || "N/A"}
            rightIcon="chevron-forward"
            icon=""
            link={getEditFieldHref("identificacion")}
          />
          <SimpleMenuSection
            title="Tipo de identificación"
            subtitle={user?.type_id || "N/A"}
            rightIcon="chevron-forward"
            icon=""
            link={getEditFieldHref("type_id")}
          />
          <SimpleMenuSection
            title="Fecha de nacimiento"
            subtitle={user?.fnacimiento || "N/A"}
            rightIcon="chevron-forward"
            icon=""
            link={getEditFieldHref("fnacimiento")}
          />

          <SimpleMenuSection
            title="País de origen"
            subtitle={formatProfilePlaceLabel(user?.pais_origen)}
            rightIcon="chevron-forward"
            icon=""
            link={getEditFieldHref("pais_origen")}
          />

          <SimpleMenuSection
            title="Teléfono"
            subtitle={user?.telefono || "N/A"}
            rightIcon="chevron-forward"
            icon=""
            link={getEditFieldHref("telefono")}
          />

          <SimpleMenuSection
            title="Localizacion"
            subtitle={locationLabel || "N/A"}
            rightIcon="chevron-forward"
            icon=""
            link={getEditFieldHref("localizacion")}
          />

          <SimpleMenuSection
            title="Código Postal"
            subtitle={user?.postal || "N/A"}
            rightIcon="chevron-forward"
            icon=""
            link={getEditFieldHref("postal")}
          />
        </View>
      </ScrollView>
    </Screen>
  );
}
