"use client";

import { useTheme } from "@/src/context/ThemeContext";
import { MaterialIcons } from "@expo/vector-icons";
import { MotiView } from "moti";
import React, { ReactNode } from "react";
import { Modal, Platform, Pressable, StyleSheet, View } from "react-native";
import PrimaryButton from "./PrimaryButton";
import ThemedText from "./themed-text";

type Variant = "primary" | "danger" | "warning";

type Props = {
  visible: boolean;
  title?: string;
  description?: string | ReactNode;
  confirmText?: string;
  cancelText?: string;
  variant?: Variant;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmActionModal({
  visible,
  title = "¿Estás seguro?",
  description = "Esta acción no se puede deshacer.",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  variant = "primary",
  loading = false,
  onConfirm,
  onCancel,
}: Props) {
  const { colors } = useTheme();

  const variantConfig = {
    primary: {
      icon: "check-circle",
      iconColor: colors.success,
      titleColor: colors.primary,
    },
    danger: {
      icon: "warning",
      iconColor: colors.danger,
      titleColor: colors.danger,
    },
    warning: {
      icon: "error-outline",
      iconColor: colors.warning,
      titleColor: colors.warning,
    },
  }[variant];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      presentationStyle="overFullScreen"
    >
      <Pressable style={styles.backdrop} onPress={onCancel}>
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: "timing", duration: 200 }}
          style={styles.overlay}
        >
          <MotiView
            from={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "timing", duration: 220 }}
            style={[
              styles.card,
              {
                backgroundColor: colors.card,
                shadowColor: colors.shadow || "#000",
              },
            ]}
          >
            <View style={styles.iconWrap}>
              <MaterialIcons
                name={variantConfig.icon as any}
                size={50}
                color={variantConfig.iconColor}
              />
            </View>

            <ThemedText
              type="title"
              color={variantConfig.titleColor}
              style={styles.title}
            >
              {title}
            </ThemedText>

            {description ? (
              typeof description === "string" ? (
                <ThemedText type="body" color={colors.textSecondary}>
                  {description}
                </ThemedText>
              ) : (
                <View style={{ width: "100%", alignItems: "center" }}>
                  {description}
                </View>
              )
            ) : null}

            <View style={styles.actionsRow} className="mt-4">
              <PrimaryButton
                title={cancelText}
                onPress={onCancel}
                variant="secondary"
                size="md"
              />

              <PrimaryButton
                title={confirmText}
                onPress={onConfirm}
                loading={loading}
                variant={variant}
                size="md"
              />
            </View>
          </MotiView>
        </MotiView>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    padding: 24,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
  },

  card: {
    borderRadius: 28,
    paddingHorizontal: 24,
    paddingVertical: 28,
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.18,
        shadowRadius: 24,
      },
      android: {
        elevation: 10,
      },
    }),
  },

  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  title: {
    textAlign: "center",
    marginBottom: 6,
  },

  description: {
    textAlign: "center",
    marginBottom: 28,
  },

  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    width: "100%",
  },

  cancelBtn: {
    flex: 1,
  },

  confirmBtn: {
    flex: 1,
  },
});
