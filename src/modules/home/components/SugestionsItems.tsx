import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, StyleSheet, View } from "react-native";

import ThemedText from "@/src/components/shared/themed-text";
import { Colors } from "@/themes/colors";
import { Link } from "expo-router";
import { useTheme } from '../../../context/ThemeContext';

const SuggestionItem = ({ title }: { title: string }) => {
  const { colors, isDark } = useTheme();
  return (
<Link href={'home/suggest'} style={[styles.suggestionItemContainer, { backgroundColor: colors.card, borderWidth: isDark ? 1 : 0, borderColor: colors.border }]} asChild>
  <Pressable >
    <View style={styles.contentContainer}>
      <Ionicons name="calendar" size={18} style={[styles.icon, { color: colors.primaryLight }]} />
      <ThemedText style={[styles.itemText, { color: colors.text }]}>{title}</ThemedText>
    </View>
  </Pressable>
</Link>
  );
};

const styles = StyleSheet.create({
  suggestionItemContainer: {
    marginHorizontal: 6,
    height: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    marginBottom: 2,
    borderRadius: 20, 
    shadowColor: "white",
    borderColor: Colors.primaryLight,
    borderWidth: 1,

  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8, 
  },
  icon: {
    fontWeight: "bold",
  },
  itemText: {
    fontWeight: "500", 
    fontSize: 14, 
  },
});

export default SuggestionItem;