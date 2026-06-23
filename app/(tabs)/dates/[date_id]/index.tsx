import Badge from "@/src/components/shared/Badge";
import { Card } from "@/src/components/shared/card";
import ThemedText from "@/src/components/shared/themed-text";
import { useUser } from "@/src/modules/banner/hooks/userHome";
import CitaDetailsSkeleton from "@/src/modules/dates/components/CitaDetailsSkeleton";
import { useDatesDetails } from "@/src/modules/dates/hooks/useDatesById";
import { formatDateToText } from "@/src/utils/stringUtils";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Screen } from "../../../../src/components/shared/Screen";
import { useTheme } from "../../../../src/context/ThemeContext";

export default function CitaDetailsScreen() {
  const { colors } = useTheme();
  const { date_id } = useLocalSearchParams();
  const { data: user } = useUser();
  const { data: dateDetails, isFetching } = useDatesDetails(date_id as string);

  if (isFetching) {
    return (
      <Screen>
        <View style={styles.content}>
          <CitaDetailsSkeleton />
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerBackVisible: true,
          headerTitle: "Detalles de la cita",
        }}
      />
      <View>
        <LinearGradient
          className="pb-4 pt-2 flex-row items-center gap-4"
          colors={colors.gradientBackground}
          start={[0, 0]}
          end={[1, 0]}
        >
          <View
            style={[
              styles.headerIconWrap,
              { backgroundColor: colors.gradientCardStart },
            ]}
          >
            <View
              style={[
                styles.iconCircle,
                { backgroundColor: colors.primaryLight },
              ]}
            >
              <Ionicons name="calendar-outline" color="#FFFFFF" size={28} />
            </View>
          </View>
          <View className="flex gap-1 justify-center">
            <ThemedText color={colors.textPrimary} type="semiBold">
              Cita agendada
            </ThemedText>
            <Badge
              showIcon={false}
              text={dateDetails?.categoria || "General"}
              variant="warning"
              size="small"
              layout="horizontal"
            />
          </View>
        </LinearGradient>
      </View>
      <View style={styles.content}>
        <Card pressable={false} style={styles.cardContainer}>
          <View style={styles.cardInner}>
            <ThemedText
              type="titleSm"
              style={[styles.procedureTitle, { color: colors.primaryLight }]}
            >
              {dateDetails?.Procedimiento}
            </ThemedText>

            <View style={styles.infoBlock}>
              <ThemedText color={colors.textSecondary} type="caption">
                {formatDateToText(dateDetails?.fecha_cita)}
              </ThemedText>

              <ThemedText type="semiBold" color={colors.textPrimary}>
                {dateDetails?.hora_cita}
              </ThemedText>

              <ThemedText
                color={colors.textSecondary}
                type="body"
                style={{ marginTop: 4 }}
              >
                Profesional:{" "}
                <ThemedText type="semiBold" color={colors.textPrimary}>
                  {dateDetails?.profesional}
                </ThemedText>
              </ThemedText>
            </View>

            <View
              style={[
                styles.divider,
                { backgroundColor: colors.border || "rgba(0,0,0,0.08)" },
              ]}
            />

            <View style={styles.sedeBlock}>
              <ThemedText color={colors.textPrimary} type="semiBold">
                Sede
              </ThemedText>
              <ThemedText
                className="capitalize"
                color={colors.textSecondary}
                type="body"
              >
                {dateDetails?.sede}
              </ThemedText>
            </View>
          </View>
        </Card>
        <Card pressable={false} style={styles.cardContainer}>
          <View style={styles.userRow}>
            <View
              style={[
                styles.userIconCircle,
                { backgroundColor: colors.primaryLight },
              ]}
            >
              <Ionicons name="person-outline" size={22} color="#FFFFFF" />
            </View>
            <View>
              <ThemedText color={colors.textSecondary} type="caption">
                Paciente
              </ThemedText>
              <ThemedText color={colors.textPrimary} type="semiBold">
                {user?.user_name}
              </ThemedText>
            </View>
          </View>
        </Card>
        <View style={styles.recommendations}>
          <ThemedText
            type="subtitle"
            style={{ marginBottom: 8 }}
            color={colors.primaryLight}
          >
            Recomendaciones:
          </ThemedText>
          <View style={{ gap: 4 }}>
            <ThemedText type="body" color={colors.textSecondary}>
              • Llegar 10 minutos antes de la cita.
            </ThemedText>
            <ThemedText type="body" color={colors.textSecondary}>
              • Si no puede asistir, cancelar con dos horas de anticipación.
            </ThemedText>
          </View>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 16,
  },
  headerIconWrap: {
    width: 90,
    height: 70,
    borderEndStartRadius: 50,
    borderEndEndRadius: 50,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 16,
  },
  iconCircle: {
    padding: 8,
    borderRadius: 100,
  },

  cardContainer: {
    marginBottom: 16,
    padding: 0,
  },
  cardInner: {
    padding: 20,
  },
  procedureTitle: {
    marginBottom: 16,
  },
  infoBlock: {
    gap: 2,
  },
  divider: {
    height: 1,
    alignSelf: "stretch",
    marginVertical: 16,
  },
  sedeBlock: {
    gap: 2,
  },

  userRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 12,
  },
  userIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  recommendations: {
    marginTop: 8,
    paddingHorizontal: 8,
  },
});
