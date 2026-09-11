import ThemedText from "@/src/components/shared/themed-text";
import { ui } from "@/src/themes/ui";
import * as Sentry from "@sentry/react-native";
import React, { Component, ErrorInfo, ReactNode } from "react";
import { Pressable, StyleSheet, View } from "react-native";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
    Sentry.captureException(error, {
      contexts: {
        react: {
          componentStack: errorInfo.componentStack,
        },
      },
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <View style={styles.container}>
          <ThemedText type="display" tone="inverse" align="center">
            Algo salió mal
          </ThemedText>
          <ThemedText
            type="body"
            tone="muted"
            align="center"
            style={styles.message}
          >
            Ha ocurrido un error inesperado. Por favor, intenta de nuevo.
          </ThemedText>
          <Pressable style={styles.button} onPress={this.handleReset}>
            <ThemedText type="semiBold" color="#1F1F1F">
              Reintentar
            </ThemedText>
          </Pressable>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#302D34",
    padding: ui.spacing.xl,
    gap: ui.spacing.md,
  },
  message: {
    marginBottom: ui.spacing.xl,
  },
  button: {
    backgroundColor: "#E2B155",
    paddingHorizontal: ui.spacing.xxl,
    paddingVertical: ui.spacing.md,
    borderRadius: ui.radii.md,
    minHeight: ui.tapTarget,
    justifyContent: "center",
  },
});
