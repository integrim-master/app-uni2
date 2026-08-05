import { TabBarContext } from "@/src/context/TabBarContext";
import Constants from "expo-constants";
import { useFocusEffect } from "expo-router";
import { use } from "react";
import { StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
export default function App() {
  const { setShowTabBar } = use(TabBarContext);
  useFocusEffect(() => {
    setShowTabBar(true);
    return () => {
      setShowTabBar(false);
    };
  });
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
