import React from "react";
import { FlatList } from "react-native";

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
      contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={ListHeaderComponent}
    />
  );
}
