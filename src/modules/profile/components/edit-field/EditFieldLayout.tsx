import { BackButton } from "@/src/components/shared/BackButton";
import PrimaryButton from "@/src/components/shared/PrimaryButton";
import { Screen } from "@/src/components/shared/Screen";
import ThemedText from "@/src/components/shared/themed-text";
import { ui } from "@/src/themes/ui";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from "react-native";

type Props = {
  title: string;
  error?: string | null;
  isPending: boolean;
  saveDisabled: boolean;
  onSave: () => void;
  children: React.ReactNode;
};

export function EditFieldLayout({
  title,
  error,
  isPending,
  saveDisabled,
  onSave,
  children,
}: Props) {
  return (
    <Screen safeArea leftButton={<BackButton />}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
        keyboardVerticalOffset={70}
      >
        <View style={styles.body}>
          <View style={styles.flex}>
            <ThemedText
              type="display"
              accessibilityRole="header"
              style={styles.headerTitle}
            >
              {title}
            </ThemedText>
            {children}
            {error ? (
              <ThemedText
                type="caption"
                tone="danger"
                style={styles.error}
                accessibilityLiveRegion="polite"
              >
                {error}
              </ThemedText>
            ) : null}
          </View>
          <View style={styles.saveWrap}>
            <PrimaryButton
              title="Guardar cambios"
              onPress={onSave}
              loading={isPending}
              disabled={saveDisabled}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  body: {
    flex: 1,
    paddingTop: ui.spacing.lg,
    paddingBottom: ui.spacing.lg,
  },
  headerTitle: {
    marginBottom: ui.spacing.xl,
  },
  error: {
    marginTop: ui.spacing.sm,
  },
  saveWrap: {
    marginBottom: Platform.OS === "ios" ? ui.spacing.xl : ui.spacing.lg,
  },
});
