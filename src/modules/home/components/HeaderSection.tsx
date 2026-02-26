import Badge from "@/src/components/shared/Badge";
import ThemedText from "@/src/components/shared/themed-text";
import { Link } from "expo-router";
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
          {/* <ThemedText type="subtitle">Tus proximas citas:</ThemedText> */}

          <ThemedText color={colors.textSecondary}>
            Tu bienestar es nuestra prioridad
          </ThemedText>
          <Link href="/blog">
            <Badge
              variant="white"
              text="Blog"
              size="small"
              icon="book"
              style={{
                borderRadius: 900,
                paddingLeft: 10,
                paddingRight: 10,
              }}
            />
          </Link>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: 8,
    height: 130,

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
    gap: 4,
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
    gap: 10,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  suggestionsList: {},
  primaryText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default HeaderSection;
