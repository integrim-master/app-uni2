import Constants from "expo-constants";
import { StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

export default function App() {
  return (
    <WebView
      style={styles.container}
      source={{ uri: "https://careme360.com/privacy-policy/" }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});
