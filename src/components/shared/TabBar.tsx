import { useTheme } from "@/src/context/ThemeContext";
import { ui } from "@/src/themes/ui";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import ThemedText from "./themed-text";

type TabOption = {
  key: string;
  label: string;
};

type TabBarProps = {
  options: TabOption[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

/** Segmented control genérico (no confundir con NativeTabs del router). */
const TabBar: React.FC<TabBarProps> = ({
  options,
  activeTab,
  setActiveTab,
}) => {
  const { colors } = useTheme();
  return (
    <View style={[styles.customTabBar, { backgroundColor: colors.card }]}>
      {options.map((option) => {
        const isActive = activeTab === option.key;
        return (
          <Pressable
            key={option.key}
            onPress={() => setActiveTab(option.key)}
            style={[
              styles.tabItem,
              {
                backgroundColor: isActive ? colors.primaryLight : colors.card,
              },
            ]}
          >
            <ThemedText
              type="semiBold"
              color={isActive ? "#fff" : colors.text}
              align="center"
            >
              {option.label}
            </ThemedText>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  customTabBar: {
    flexDirection: "row",
    borderRadius: ui.radii.pill,
    width: "100%",
    alignItems: "center",
  },
  tabItem: {
    flex: 1,
    paddingVertical: ui.spacing.sm,
    borderRadius: ui.radii.pill,
    alignItems: "center",
    justifyContent: "center",
    minHeight: ui.tapTarget,
  },
});

export default TabBar;
