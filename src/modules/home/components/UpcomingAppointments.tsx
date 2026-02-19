import Badge from "@/src/components/shared/Badge";
import { Card } from "@/src/components/shared/card";
import ThemedText from "@/src/components/shared/themed-text";
import { formatDateToText } from "@/src/utils/stringUtils";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import UpcomingAppointmentsSkeleton from "./UpcomingAppointmentsSkeleton";

type Props = {
  dates?: any[];
  isLoading?: boolean;
};

export default function UpcomingAppointments({ dates, isLoading }: Props) {
  const router = useRouter();

  if (isLoading) return <UpcomingAppointmentsSkeleton />;
  if (!Array.isArray(dates) || dates.length === 0) return null;

  return (
    <View style={{ marginTop: 10 }}>
      <MotiView
        from={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 350 }}
        style={{ marginTop: 10 }}
      >
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Tus proximas citas:
        </ThemedText>

        <FlatList
          data={Array.isArray(dates) ? dates.slice(0, 2) : []}
          horizontal
          showsHorizontalScrollIndicator={false}
          // ListFooterComponent={
          //   <View style={{ width: 120, marginLeft: 6 }}>
          //     <Pressable
          //       onPress={() => router.push("/dates")}
          //       style={{ width: 120 }}
          //     >
          //       <Card
          //         pressable={false}
          //         style={{
          //           height: 130,
          //           width: 120,
          //           padding: 12,
          //           justifyContent: "center",
          //         }}
          //       >
          //         <View style={{ alignItems: "center" }}>
          //           <ThemedText type="subtitle" style={{ textAlign: "center" }}>
          //             Ver todas
          //           </ThemedText>
          //         </View>
          //       </Card>
          //     </Pressable>
          //   </View>
          // }
          renderItem={({ item, index }) => (
            <MotiView
              from={{ opacity: 0, translateY: 12 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: "timing", duration: 320, delay: index * 80 }}
            >
              <Card
                pressable={false}
                style={{
                  height: 130,
                  width: 260,
                  padding: 10,
                }}
              >
                <View className="w-full flex  flex-row justify-between items-center h-full p-2 ">
                  <View className="flex gap-2">
                    <Badge
                      text={item.categoria}
                      style={{ marginBottom: 8 }}
                      variant="warning"
                      size="small"
                      icon="health-and-safety"
                    />
                    <View className="flex gap-1">
                      <ThemedText type="caption">
                        {item.Procedimiento}
                      </ThemedText>

                      <ThemedText type="caption">
                        {formatDateToText(item.fecha_cita)}
                      </ThemedText>
                    </View>
                  </View>
                  {/* <View>
                    <Pressable
                      onPress={() => router.push(`/dates/${item.id}`)}
                      style={{ backgroundColor: Colors.primaryLight }}
                      className="rounded-full p-2 "
                    >
                      <Ionicons
                        name="chevron-forward"
                        size={24}
                        color={Colors.cardTextDark}
                      />
                    </Pressable>
                  </View> */}
                </View>
              </Card>
            </MotiView>
          )}
          keyExtractor={(item, index) =>
            `${item?.fecha_cita ?? ""}-${item?.hora_cita ?? ""}-${item?.profesional ?? index}`
          }
          ItemSeparatorComponent={() => <View style={{ width: 7 }} />}
        />
      </MotiView>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: { marginTop: 10, marginBottom: 20, fontWeight: "600" },
});
