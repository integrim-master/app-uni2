/**
 * Convención de modales:
 * - Confirmaciones / decisiones → ConfirmActionModal
 * - Promos full-screen → BannerModal
 * - Loading global → useLoading()
 * - Sheets de lista/filtros → @gorhom/bottom-sheet
 */
import { useTheme } from "@/src/context/ThemeContext";
import { MaterialIcons } from "@expo/vector-icons";
import { MotiView } from "moti";
import React, { ReactNode } from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";
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

  const accent =
    variant === "danger"
      ? colors.danger
      : variant === "warning"
        ? colors.warning
        : colors.primary;

  const iconName =
    variant === "danger"
      ? "logout"
      : variant === "warning"
        ? "error-outline"
        : "info-outline";

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={onCancel}
    >
      <View style={styles.root}>
        <Pressable style={styles.backdrop} onPress={onCancel} />

        <MotiView
          from={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "timing", duration: 200 }}
          style={[
            styles.sheet,
            {
              backgroundColor: colors.backgroundElevated,
              borderColor: colors.borderLight,
            },
          ]}
        >
          <View style={[styles.iconBadge, { backgroundColor: `${accent}18` }]}>
            <MaterialIcons name={iconName as any} size={22} color={accent} />
          </View>

          <ThemedText type="title" color={colors.text} style={styles.title}>
            {title}
          </ThemedText>

          {description ? (
            typeof description === "string" ? (
              <ThemedText
                type="body"
                color={colors.textSecondary}
                style={styles.description}
              >
                {description}
              </ThemedText>
            ) : (
              <View style={styles.descriptionSlot}>{description}</View>
            )
          ) : null}

          <View style={styles.actions}>
            <View style={styles.actionBtn}>
              <PrimaryButton
                title={cancelText}
                onPress={onCancel}
                variant="secondary"
                size="sm"
                disabled={loading}
                style={styles.actionBtnFill}
              />
            </View>
            <View style={styles.actionBtn}>
              <PrimaryButton
                title={confirmText}
                onPress={onConfirm}
                variant={variant}
                size="sm"
                loading={loading}
                style={styles.actionBtnFill}
              />
            </View>
          </View>
        </MotiView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 28,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  card: {
  sheet: {
    borderRadius: 28,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 22,
    paddingTop: 22,
    paddingBottom: 18,
  },
  iconBadge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
    alignSelf: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
    letterSpacing: -0.3,
    textAlign: "center",
  },
  description: {
    lineHeight: 22,
    marginBottom: 8,
    textAlign: "center",
  },
  descriptionSlot: {
    width: "100%",
    marginBottom: 8,
    alignItems: "center",
  },
  actions: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  actionBtn: {
    flex: 1,
  },
  actionBtnFill: {
    width: "100%",
  },
});
