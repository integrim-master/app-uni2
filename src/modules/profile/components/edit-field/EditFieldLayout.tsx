import { BackButton } from "@/src/components/shared/BackButton";
import PrimaryButton from "@/src/components/shared/PrimaryButton";
import { Screen } from "@/src/components/shared/Screen";
import ThemedText from "@/src/components/shared/themed-text";
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
        <View className="flex-1 mt-4 p-6">
          <View className="flex-1">
            <View style={styles.headerTitleWrap}>
              <ThemedText type="display" accessibilityRole="header">
                {title}
              </ThemedText>
            </View>
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
  headerTitleWrap: { marginBottom: 32 },
  error: { marginTop: 8 },
  saveWrap: { marginBottom: Platform.OS === "ios" ? 40 : 20 },
});
