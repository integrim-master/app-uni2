"use client";

import { useTheme } from "@/src/context/ThemeContext";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import React from "react";
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Variant = "primary" | "danger" | "warning";

type Props = {
  visible: boolean;
  title?: string;
  description?: string;
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
      gradient: [colors.primaryLight, colors.primaryDark],
    },
    danger: {
      icon: "warning",
      gradient: [colors.dangerLight ?? "#FFCDD2", colors.danger],
    },
    warning: {
      icon: "error-outline",
      gradient: [colors.warningLight ?? "#FFF3CD", colors.warning],
    },
  }[variant];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
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
            from={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 2 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{
              type: "spring",
              damping: 14,
              stiffness: 140,
            }}
            style={[
              styles.card,
              {
                backgroundColor: colors.card,
                shadowColor: colors.shadow || "#000",
              },
            ]}
          >
            <LinearGradient
              colors={variantConfig.gradient as any}
              style={styles.iconWrap}
            >
              <MaterialIcons
                name={variantConfig.icon as any}
                size={26}
                color={colors.primaryLight}
              />
            </LinearGradient>

            <Text style={[styles.title, { color: colors.text }]}>
              {title}
            </Text>

            {description ? (
              <Text
                style={[
                  styles.description,
                  { color: colors.textSecondary },
                ]}
              >
                {description}
              </Text>
            ) : null}
            <View style={styles.actionsRow}>
              <TouchableOpacity
                style={[
                  styles.cancelBtn,
                  { backgroundColor: colors.backgroundLight },
                ]}
                onPress={onCancel}
                disabled={loading}
              >
                <Text
                  style={[
                    styles.cancelText,
                    { color: colors.textSecondary },
                  ]}
                >
                  {cancelText}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.85}
                onPress={onConfirm}
                disabled={loading}
                style={styles.confirmWrap}
              >
                <LinearGradient
                  colors={variantConfig.gradient as any}
                  style={styles.confirmBtn}
                >
                  <Text style={styles.confirmText}>
                    {loading ? "Procesando..." : confirmText}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
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
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    padding: 24,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
  },
  card: {
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 20,
      },
      android: {
        elevation: 8,
      },
    }),
  },

  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    marginBottom: 24,
  },

  actionsRow: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  cancelText: {
    fontSize: 14,
    fontWeight: "700",
  },

  confirmWrap: {
    flex: 1,
    borderRadius: 14,
    overflow: "hidden",
  },
  confirmBtn: {
    paddingVertical: 14,
    alignItems: "center",
  },
  confirmText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#fff",
  },
});
