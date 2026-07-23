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
    marginTop: 10,

    justifyContent: "center",
  },
  profileSection: {
    height: "auto",
    display: "flex",
    flexDirection: "column",
    gap: 4,
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
