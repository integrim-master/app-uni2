import ThemedText from "@/src/components/shared/themed-text";
import { ui } from "@/src/themes/ui";
import React from "react";
import { StyleSheet, View } from "react-native";
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
  const renderContent = () => {
    switch (activeTab) {
      case "first":
        return (
          <View style={styles.accessContainer}>
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
          <View style={styles.listContainer}>
            {dataButtons.slice(0, 3).map((item, index) => (
              <Card
                key={index}
                style={styles.listCard}
                href={item.routPage ? `/(tabs)/${item.routPage}` : undefined}
              >
                <View style={styles.listCardInner}>
                  <ThemedText type="titleSm" weight="semibold">
                    {item.item}
                  </ThemedText>
                </View>
              </Card>
            ))}
          </View>
        );
      default:
        return null;
    }
  };

  return <View style={styles.contentView}>{renderContent()}</View>;
};

const styles = StyleSheet.create({
  contentView: {
    flex: 1,
    marginBottom: ui.spacing.sm,
  },
  accessContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
    gap: ui.spacing.sm,
    marginTop: ui.spacing.sm,
    padding: ui.spacing.sm,
    borderRadius: ui.radii.lg,
  },
  listContainer: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
    borderRadius: ui.radii.lg,
    gap: ui.spacing.md,
  },
  listCard: {
    width: "80%",
  },
  listCardInner: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: ui.spacing.lg,
  },
});
