import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AccesoDirecto } from "./Acess";
import { Card } from "./card";


interface TabContentProps {
  activeTab: string;
  dataButtons: any[];
}

export const TabContent: React.FC<TabContentProps> = ({
  activeTab,
  dataButtons,
}) => {
  const { colors } = useTheme();

  const renderContent = () => {
    switch (activeTab) {
      case "first":
        return (
          <View className="" style={styles.accessContainer}>
            {dataButtons.map((item, index) => (
              <AccesoDirecto
                key={index}
                item={item.item}
                icon={item.icon}
                routPage={item.routPage}
                dark={item.dark}
                light={item.light}
                colorFondo={item.colorFondo}
              />
            ))}
          </View>
        );
      case "second":
        return (
          <View style={styles.emptyContainerTwo}>
            {dataButtons.slice(0, 3).map((item, index) => (
              <Card
                key={index}
                style={{ width: '80%', marginBottom: 12 }}
          
                href={item.routPage ? `/(tabs)/${item.routPage}` : undefined}
              >
                <View className="flex-row items-start justify-start p-4">
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 18, color: colors.text, fontWeight: '600', }}>{item.item}</Text>
                  </View>
                </View>
              </Card>
            ))}
          </View>
        );
    //   case "third":
    //     return (
    //       <View style={styles.emptyContainer}>
    //         <Text style={{ color: colors.text }}>
    //          opciones
    //         </Text>
    //       </View>
    //     );
      default:
        return null;
    }
  };

  return <View style={styles.contentView}>{renderContent()}</View>;
};

const styles = StyleSheet.create({
  contentView: {
    flex: 1,
    marginBottom:10,
  },
  accessContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 10,
    padding: 10,
    borderRadius: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },
  emptyContainerTwo: {
    flex: 1,
    justifyContent: "center",  
    width: "100%", 
    alignItems: "center",
    borderRadius: 16,
  },
});
