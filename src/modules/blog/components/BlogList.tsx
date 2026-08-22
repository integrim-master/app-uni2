import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { ui } from "@/src/themes/ui";

export default function BlogModuleList({
  data,
  renderItem,
  ListHeaderComponent,
}: any) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item: any) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={ListHeaderComponent}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: ui.spacing.xl,
    paddingBottom: 100,
  },
});
