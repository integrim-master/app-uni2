import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { BaseToastProps, ToastConfig } from "react-native-toast-message";

const SuccessIcon = () => (
  <View
    style={[iconStyles.circle, { backgroundColor: "rgba(16,185,129,0.12)" }]}
  >
    <Text style={[iconStyles.emoji, { color: "#10B981" }]}>✓</Text>
  </View>
);

const ErrorIcon = () => (
  <View
    style={[iconStyles.circle, { backgroundColor: "rgba(220,38,38,0.12)" }]}
  >
    <Text style={[iconStyles.emoji, { color: "#EF4444" }]}>✕</Text>
  </View>
);

const InfoIcon = () => (
  <View
    style={[iconStyles.circle, { backgroundColor: "rgba(226,177,85,0.12)" }]}
  >
    <Text style={[iconStyles.emoji, { color: "#E2B155" }]}>i</Text>
  </View>
);

const iconStyles = StyleSheet.create({
  circle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  emoji: {
    fontSize: 18,
    fontWeight: "800",
  },
});

type ToastVariant = "success" | "error" | "info";

const ACCENT: Record<ToastVariant, string> = {
  success: "#10B981",
  error: "#EF4444",
  info: "#E2B155",
};

const ICONS: Record<ToastVariant, React.ReactNode> = {
  success: <SuccessIcon />,
  error: <ErrorIcon />,
  info: <InfoIcon />,
};

function CustomToast({
  variant,
  text1,
  text2,
}: BaseToastProps & { variant: ToastVariant }) {
  return (
    <View style={[styles.container, { borderLeftColor: ACCENT[variant] }]}>
      {ICONS[variant]}
      <View style={styles.textContainer}>
        {text1 ? (
          <Text style={styles.title} numberOfLines={1}>
            {text1}
          </Text>
        ) : null}
        {text2 ? (
          <Text style={styles.subtitle} numberOfLines={2}>
            {text2}
          </Text>
        ) : null}
      </View>
      <View style={[styles.accentDot, { backgroundColor: ACCENT[variant] }]} />
    </View>
  );
}

export const toastConfig: ToastConfig = {
  success: (props) => <CustomToast {...props} variant="success" />,
  error: (props) => <CustomToast {...props} variant="error" />,
  info: (props) => <CustomToast {...props} variant="info" />,
};

const styles = StyleSheet.create({
  container: {
    width: "92%",
    minHeight: 60,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A1A1A",
    borderRadius: 16,
    borderLeftWidth: 4,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
  textContainer: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: "#F9FAFB",
    letterSpacing: 0.2,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: "400",
    color: "#9CA3AF",
    lineHeight: 18,
  },
  accentDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    opacity: 0.6,
  },
});
