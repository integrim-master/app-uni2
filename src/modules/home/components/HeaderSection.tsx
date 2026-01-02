import ThemedText from "@/src/components/shared/themed-text";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../../../context/ThemeContext";

type HeaderSectionProps = {
  fullName: string;
};

const HeaderSection: React.FC<HeaderSectionProps> = ({ fullName }) => {
  const { colors, isDark } = useTheme();

  return (
    <View style={[styles.headerContainer]}>
      <View style={styles.profileSection}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <ThemedText type="title">
            Hola,{" "}
            <ThemedText type="title" color={colors.primaryLight}>
              {fullName}
            </ThemedText>
          </ThemedText>
        </View>
        <View style={styles.suggestionsContainer}>
          {/* <BodyText style={{ fontWeight: 500, color: "white" }}>
            Tratamientos recomendados:
          </BodyText> */}
          {/* <FlatList
            data={[
              { id: "1", title: "Sugerencia 1" , link: "/suggest"},
              { id: "2", title: "Sugerencia 2" },
              { id: "3", title: "Sugerencia 3" },
              { id: "4", title: "Sugerencia 3" },
              { id: "5", title: "Sugerencia 3" },
              { id: "8", title: "Sugerencia 3" },
            ]}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <SuggestionItem title={item.title} />}
            keyExtractor={(item) => item.id}
            style={styles.suggestionsList}
          /> */}

          <ThemedText color={colors.textSecondary}>
            Tu bienestar es nuestra prioridad
          </ThemedText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: 20,
    height: 100,

    paddingHorizontal: 15,
    justifyContent: "center",
    overflow: "hidden",
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
  },
  profileSection: {
    height: "auto",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  logoImageDark: {
    width: 140,
    height: 40,
    borderRadius: 24,
  },
  logoNotifContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  logoContainer: {
    padding: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  logoImage: {
    width: 120,
    height: 28,
    borderRadius: 24,
  },
  notifIconContainer: {
    borderRadius: 99,
    padding: 6,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 1,
    elevation: 1,
  },
  suggestionsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: 10,
    paddingBottom: 20,
  },
  suggestionsList: {},
  primaryText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default HeaderSection;
