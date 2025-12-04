import { Colors } from "@/themes/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, StyleSheet, View } from "react-native";
import BodyText from "../../../components/shared/BodyText";

const SuggestionItem = ({ title }: { title: string }) => (
  <Pressable style={styles.suggestionItemContainer}>
    <View style={styles.contentContainer}>
      <Ionicons name="calendar" size={18} style={styles.icon} />
      <BodyText style={styles.itemText}>{title}</BodyText>
    </View>
  </Pressable>
);

const styles = StyleSheet.create({
  suggestionItemContainer: {
    marginHorizontal: 6,
    height: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    backgroundColor: Colors.background,
    borderRadius: 20, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, 
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8, 
  },
  icon: {
    color: Colors.primaryDark,
    fontWeight: "bold",
  },
  itemText: {
    color: Colors.primaryDark,
    fontWeight: "800", 
    fontSize: 14, 
  },
});

export default SuggestionItem;