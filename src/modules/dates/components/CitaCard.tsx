import Badge from "@/src/components/shared/Badge";
import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Card } from "../../../components/shared/card";
import { useTheme } from "../../../context/ThemeContext";
import { Cita } from "../types/date.api.types";

export default function CitaCard({
  cita,
  onPress,
}: {
  cita: Cita;
  onPress?: () => void;
}) {
  const { colors } = useTheme();
  return (
    <Card
      onPress={onPress}
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
      <View style={styles.content}>
        <Badge
          text={cita.categoria}
          variant="info"
          size="small"
          style={{ marginBottom: 6 }}
        />
        <Text
          style={[styles.procedimiento, { color: colors.text }]}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {cita.Procedimiento}
        </Text>

        <Text
          style={[styles.especialista, { color: colors.textLight }]}
          numberOfLines={1}
        >
          {cita.profesional}
        </Text>

        <View style={styles.row}>
          <Text style={[styles.fecha, { color: colors.text }]}>
            {cita.fecha_cita}
          </Text>
          <Text style={[styles.hora, { color: colors.primary }]}>
            {cita.hora_cita}
          </Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 110,
    borderRadius: 16,
    flexDirection: "column",
    borderWidth: 1,
    padding: 0,
    marginVertical: 8,
    marginHorizontal: 12,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  // topArea: {
  //   paddingHorizontal: 12,
  //   paddingTop: 10,
  //   paddingBottom: 6,
  //   display: "flex",
  //   flexDirection: "row",
  //   width: "100%",
  //   justifyContent: "flex-start",
  //   alignItems: "center",
  // },
  // icon: {
  //   marginLeft: 8,
  //   opacity: 0.95,
  // },
  content: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    flex: 1,
    display: "flex",
    width:'100%',
    flexDirection: "column",
  },
  procedimiento: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 6,
    lineHeight: 20,
  },
  // badge: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   paddingHorizontal: 10,
  //   paddingVertical: 6,
  //   borderRadius: 12,
  //   borderWidth: 1,
  //   alignSelf: "flex-start",
  //   gap: 6,
  //   marginBottom: 6,
  //   ...Platform.select({
  //     ios: {
  //       shadowOffset: { width: 0, height: 6 },
  //       shadowOpacity: 0.12,
  //       shadowRadius: 10,
  //     },
  //     android: {
  //       elevation: 2,
  //     },
  //   }),
  // },
  // badgeText: {
  //   fontSize: 11,
  //   fontWeight: "800",
  //   marginLeft: 6,
  //   textTransform: "uppercase",
  //   letterSpacing: 0.6,
  // },
  especialista: {
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 8,
  },
  row: {
  marginTop: 8,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
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
