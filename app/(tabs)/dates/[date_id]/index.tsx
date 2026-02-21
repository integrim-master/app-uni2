import Badge from "@/src/components/shared/Badge";
import { Card } from "@/src/components/shared/card";
import ThemedText from "@/src/components/shared/themed-text";
import { useAuth } from "@/src/context/AuthContext";
import CitaDetailsSkeleton from "@/src/modules/dates/components/CitaDetailsSkeleton";
import { useDatesDetails } from "@/src/modules/dates/hooks/useDatesById";
import { formatDateToText } from "@/src/utils/stringUtils";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Screen } from "../../../../src/components/shared/Screen";
import { useTheme } from "../../../../src/context/ThemeContext";

export default function Index() {
  const { colors } = useTheme();
  const { date_id } = useLocalSearchParams();
  const { user } = useAuth();
  const { data: dateDetails, isFetching } = useDatesDetails(date_id as string);

  if (isFetching) {
    return (
      <Screen>
        <View className="p-4 flex gap-2 h-full">
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
        }}
      />
      <View>
        <LinearGradient
          className="pb-2 flex-row items-center gap-4 "
          colors={colors.gradientBackground}
          start={[0, 0]}
          end={[1, 0]}
        >
          <View
            className="flex justify-center items-end pr-4 "
            style={{
              backgroundColor: colors.gradientCardStart,
              width: 90,
              height: 70,
              borderEndStartRadius: 50,
              borderEndEndRadius: 50,
            }}
          >
            <View
              className="p-2 rounded-full"
              style={{ backgroundColor: colors.primaryLight }}
            >
              <Ionicons name="calendar-outline" color={"white"} size={30} />
            </View>
          </View>
          <View className="flex gap-2">
            <ThemedText>Cita agenda</ThemedText>
            <Badge
              showIcon={false}
              text={dateDetails?.categoria || "General"}
              variant="warning"
              size="small"
            />
          </View>
        </LinearGradient>
      </View>

      <View className="p-4 flex gap-2 h-full">
        <Card
          pressable={false}
          className=""
          style={{
            height: 200,
            marginBottom: 20,
          }}
        >
          <View className="flex-1 p-4 w-full h-full justify-around  items-start">
            <ThemedText
              type="subtitle"
              style={{
                color: colors.primaryLight,
                textAlign: "center",
                fontWeight: 800,
              }}
            >
              {dateDetails?.Procedimiento}
            </ThemedText>
            <View className="mt-4">
              <ThemedText
                color={colors.textPrimary}
                // style={{ fontWeight: 800 }}
                type="caption"
              >
                {formatDateToText(dateDetails?.fecha_cita)}
              </ThemedText>
              <ThemedText
                style={{ fontWeight: 700 }}
                type="body"
                color={colors.textPrimary}
              >
                {dateDetails?.hora_cita}
              </ThemedText>
              <ThemedText color={colors.textSecondary}>
                Profesional {dateDetails?.profesional}
              </ThemedText>
            </View>
            <View></View>
            <View
              style={{
                height: 1,
                backgroundColor: colors.border || "#e0e0e0",
                alignSelf: "stretch",
                marginVertical: 8,
              }}
            />
            <View>
              <ThemedText color={colors.textPrimary}>Sede</ThemedText>
              <ThemedText className="capitalize" color={colors.textSecondary}>
                {dateDetails?.sede}
              </ThemedText>
            </View>
          </View>
        </Card>

        <Card
          pressable={false}
          style={{
            height: 80,
            width: "100%",
            justifyContent: "flex-start",
            padding: 20,
          }}
          className="flex items-start justify-start w-full"
        >
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: colors.primaryLight,
              justifyContent: "center",
              alignItems: "center",
              marginRight: 12,
            }}
          >
            <Ionicons name="person-outline" size={28} color="white" />
          </View>
          <View>
            <ThemedText color={colors.textPrimary}>Usuario</ThemedText>
            <ThemedText color={colors.textSecondary}>
              {user?.user_name}
            </ThemedText>
          </View>
        </Card>

        <View className="mt-4">
          <ThemedText
            type="subtitle"
            style={{
              fontWeight: "800",
              marginBottom: 10,
            }}
            color={colors.primaryLight}
          >
            Recomendaciones:
          </ThemedText>
          <View className="mt-2">
            <ThemedText type="body" color={colors.textSecondary}>
              • Llegar 10 minutos antes de la cita {"\n"}• Si no puede asistir
              cancelar con dos horas de {"\n"} anticipacion
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
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  headerCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    marginBottom: 12,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  procedimiento: {
    marginBottom: 12,
  },
  metaInfo: {
    flexDirection: "row",
    gap: 16,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  cardLabel: {
    marginBottom: 10,
  },
  simpleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.05)",
  },
  // Estilos comentados (no usados)
  changeButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  // Estilos del Bottom Sheet - Minimalista (Comentados)
  // bottomSheetContent: {
  //   padding: 24,
  //   paddingBottom: 40,
  // },
  // sheetHeader: {
  //   marginBottom: 24,
  // },
  // optionsContainer: {
  //   gap: 12,
  //   marginBottom: 20,
  // },
  // statusOptionCard: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "space-between",
  //   padding: 16,
  //   borderRadius: 12,
  //   borderWidth: 1.5,
  // },
  // optionLeft: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   gap: 14,
  //   flex: 1,
  // },
  // iconCircle: {
  //   width: 44,
  //   height: 44,
  //   borderRadius: 22,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // motivoContainer: {
  //   marginBottom: 20,
  // },
  // motivoInput: {
  //   borderWidth: 1,
  //   borderRadius: 10,
  //   padding: 14,
  //   fontSize: 15,
  //   minHeight: 90,
  //   fontFamily: "Roboto-Regular",
  // },
  // actionsContainer: {
  //   flexDirection: "row",
  //   gap: 12,
  // },
  // cancelButton: {
  //   flex: 1,
  //   paddingVertical: 14,
  //   borderRadius: 10,
  //   alignItems: "center",
  //   borderWidth: 1,
  // },
  // confirmButton: {
  //   flex: 2,
  //   paddingVertical: 14,
  //   borderRadius: 10,
  //   alignItems: "center",
  // },
});
