/**
 * Convención de modales:
 * - Confirmaciones / decisiones → ConfirmActionModal
 * - Promos full-screen → BannerModal
 * - Loading global → useLoading()
 * - Sheets de lista/filtros → @gorhom/bottom-sheet
 */
import { useTheme } from "@/src/context/ThemeContext";
import { ui } from "@/src/themes/ui";
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

          <ThemedText type="title" align="center" style={styles.title}>
            {title}
          </ThemedText>

          {description ? (
            typeof description === "string" ? (
              <ThemedText
                type="body"
                tone="secondary"
                align="center"
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
    paddingHorizontal: ui.spacing.xl,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  sheet: {
    borderRadius: ui.radii.xl,
    borderWidth: ui.borders.hairline,
    padding: ui.spacing.xl,
  },
  iconBadge: {
    width: ui.tapTarget,
    height: ui.tapTarget,
    borderRadius: ui.radii.md,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: ui.spacing.lg,
    alignSelf: "center",
  },
  title: {
    marginBottom: ui.spacing.sm,
  },
  description: {
    marginBottom: ui.spacing.sm,
  },
  descriptionSlot: {
    width: "100%",
    marginBottom: ui.spacing.sm,
    alignItems: "center",
  },
  actions: {
    marginTop: ui.spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    gap: ui.spacing.sm,
  },
  actionBtn: {
    flex: 1,
  },
  actionBtnFill: {
    width: "100%",
  },
});
