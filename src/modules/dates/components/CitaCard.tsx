import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Card } from "../../../components/shared/card";
import { useTheme } from "../../../context/ThemeContext";

export type Cita = {
  id: number;
  procedimiento: string;
  fecha: string;
  hora: string;
  especialista: string;
  estado: string;
};

export default function CitaCard({
  cita,
  onPress,
}: {
  cita: Cita;
  onPress?: () => void;
}) {
  const { colors } = useTheme();

  const getEstadoConfig = (estado: string) => {
    switch (estado) {
      case "Confirmada":
        return {
          color: colors.successDark ?? colors.success,
          icon: "check-circle",
          gradient: [colors.success + "22", colors.success + "10"],
          textColor: colors.textDark ?? colors.text,
        };
      case "Pendiente":
        return {
          color: colors.warningDark ?? colors.warning,
          icon: "schedule",
          gradient: [colors.warning + "22", colors.warning + "10"],
          textColor: colors.textDark ?? colors.text,
        };
      case "Completada":
        return {
          color: "#A1A1A1",
          icon: "check",
          gradient: ["#F3F4F6", "#ECECEC"],
          textColor: colors.textSecondary,
        };
      default:
        return {
          color: colors.primary,
          icon: "help-outline",
          gradient: [colors.primary + "22", colors.primary + "10"],
          textColor: colors.textDark ?? colors.text,
        };
    }
  };

  const estadoCfg = getEstadoConfig(cita.estado);

  return (
    <Card
      onPress={() => router.push(`dates/${43}`)}
      pressedOpacity={0.96}
      className=""
      style={
        [
          styles.card,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
        ] as any
      }
    >
      <View style={styles.topArea}>
        <LinearGradient
          colors={estadoCfg.gradient as any}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[
            styles.badge,
            {
              borderColor: colors.gradientCardStart ?? colors.border,
              shadowColor: colors.shadow ?? "#000",
              backgroundColor: "transparent",
            },
          ]}
        >
          <MaterialIcons
            name={estadoCfg.icon as any}
            size={12}
            color={estadoCfg.color}
          />
          <Text style={[styles.badgeText, { color: estadoCfg.color }]}>
            {cita.estado}
          </Text>
        </LinearGradient>

        {/* <Ionicons
          name="chevron-up-circle"
          size={22}
          color={colors.textLight}
          style={styles.icon}
        /> */}
      </View>

      <View style={styles.content}>
        <Text
          style={[styles.procedimiento, { color: colors.text }]}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {cita.procedimiento}
        </Text>

        <Text
          style={[styles.especialista, { color: colors.textLight }]}
          numberOfLines={1}
        >
          {cita.especialista}
        </Text>

        <View style={styles.row}>
          <Text style={[styles.fecha, { color: colors.text }]}>
            {cita.fecha}
          </Text>
          <Text style={[styles.hora, { color: colors.primary }]}>
            {cita.hora}
          </Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 180,
    height: 170,
    borderRadius: 16,
    flexDirection: "column",
    borderWidth: 1,
    padding: 0,
    marginBottom: 16,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 16,
      },
      android: {
        elevation: 0,
      },
    }),
  },
  topArea: {
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 6,
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  icon: {
    marginLeft: 8,
    opacity: 0.95,
  },
  content: {
    paddingHorizontal: 14,
    paddingBottom: 12,
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  procedimiento: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 6,
    lineHeight: 20,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    alignSelf: "flex-start",
    gap: 6,
    marginBottom: 6,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "800",
    marginLeft: 6,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  especialista: {
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 8,
  },
  row: {
    marginTop: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  fecha: {
    fontSize: 12,
    fontWeight: "500",
  },
  hora: {
    fontSize: 13,
    fontWeight: "700",
  },
});
