import { Screen } from "@/src/components/shared/Screen";
import { SimpleMenuSection } from "@/src/components/shared/SimpleMenuSection";
import { useTheme } from "@/src/context/ThemeContext";
import { useInfoProfile } from "@/src/modules/profile/hooks/useMeProfile";
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

  return (
    <Screen safeArea={true}>
      <ScrollView>
        <View>
          <SimpleMenuSection
            title="Nombre de usuario"
            subtitle={user?.nombre || "N/A"}
            rightIcon="chevron-forward"
            icon=""
            link={`/profile-details/edit/${user?.nombre || "vacio"}?name=nombre`}
          />
          <SimpleMenuSection
            title="Identificación"
            subtitle={user?.identificacion || "N/A"}
            rightIcon="chevron-forward"
            icon=""
            link={`/profile-details/edit/${user?.identificacion || "vacio"}?name=identificacion`}
          />
          <SimpleMenuSection
            title="Tipo de identificación"
            subtitle={user?.type_id?.toString() || "N/A"}
            rightIcon="chevron-forward"
            icon=""
            link={`/profile-details/edit/${user?.type_id || "vacio"}?name=type_id`}
          />
          <SimpleMenuSection
            title="Fecha de nacimiento"
            subtitle={user?.fnacimiento || "N/A"}
            rightIcon="chevron-forward"
            icon=""
            link={`/profile-details/edit/${user?.fnacimiento || "vacio"}?name=fnacimiento`}
          />

          <SimpleMenuSection
            title="País de origen"
            subtitle={user?.pais_origen || "N/A"}
            rightIcon="chevron-forward"
            icon=""
            link={`/profile-details/edit/${user?.pais_origen || "vacio"}?name=pais_origen`}
          />

          <SimpleMenuSection
            title="País de residencia"
            subtitle={user?.pais_residencia || "N/A"}
            rightIcon="chevron-forward"
            icon=""
            link={`/profile-details/edit/${user?.pais_residencia || "vacio"}?name=pais_residencia`}
          />

          <SimpleMenuSection
            title="Teléfono"
            subtitle={user?.telefono || "N/A"}
            rightIcon="chevron-forward"
            icon=""
            link={`/profile-details/edit/${user?.telefono || "vacio"}?name=telefono`}
          />

          <SimpleMenuSection
            title="Ciudad"
            subtitle={user?.ciudad || "N/A"}
            rightIcon="chevron-forward"
            icon=""
            link={`/profile-details/edit/${user?.ciudad || "vacio"}}?name=ciudad`}
          />

          <SimpleMenuSection
            title="Provincia"
            subtitle={user?.provincia || "N/A"}
            rightIcon="chevron-forward"
            icon=""
            link={`/profile-details/edit/${user?.provincia || "vacio"}?name=provincia`}
          />

          <SimpleMenuSection
            title="Código Postal"
            subtitle={user?.postal || "N/A"}
            rightIcon="chevron-forward"
            icon=""
            link={`/profile-details/edit/${user?.postal || "vacio"}?name=postal`}
          />
        </View>
      </ScrollView>
    </Screen>
  );
}
