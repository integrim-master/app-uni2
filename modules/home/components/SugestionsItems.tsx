import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, StyleSheet, View } from "react-native";
import BodyText from "../../../components/shared/BodyText";

import { useTheme } from '../../../context/ThemeContext';

const SuggestionItem = ({ title }: { title: string }) => {
  const { colors } = useTheme();
  return (
    <Pressable style={[styles.suggestionItemContainer, { backgroundColor: colors.primary }]}> 
      <View style={styles.contentContainer}>
        <Ionicons name="calendar" size={18} style={[styles.icon, { color: 'white' }]} />
        <BodyText style={[styles.itemText, { color: 'white' }]}>{title}</BodyText>
      </View>
    </Pressable>
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
    borderRadius: 20, 

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
    fontWeight: "800", 
    fontSize: 14, 
  },
});

export default SuggestionItem;