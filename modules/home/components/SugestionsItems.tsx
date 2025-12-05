import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, StyleSheet, View } from "react-native";
import BodyText from "../../../components/shared/BodyText";

import { useTheme } from '../../../context/ThemeContext';

const SuggestionItem = ({ title }: { title: string }) => {
  const { colors, isDark } = useTheme();
  return (
    <Pressable style={[styles.suggestionItemContainer, { backgroundColor: colors.card, borderWidth: isDark ? 1 : 0, borderColor: colors.border }]}> 
      <View style={styles.contentContainer}>
        <Ionicons name="calendar" size={18} style={[styles.icon, { color:colors.primary  }]} />
        <BodyText style={[styles.itemText, { color: colors.primary }]}>{title}</BodyText>
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
    shadowColor: "white",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 8,
    shadowRadius: 1,
    elevation: 1,

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